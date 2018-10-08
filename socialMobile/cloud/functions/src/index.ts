import * as functions from 'firebase-functions';
import * as dataService from './dataService';
import * as int from './interfaces';

//**NEEDED TO INIT FIREBASE */
require('cors')({
    origin: true
});        // CORS
const admin = require('firebase-admin');  // FIRESTORE
admin.initializeApp();

// ADD LEADERBOARD FUNCTIONS
export * from './leaderboard/functions';

//COLLECTIONS REFS//

const People = admin.firestore().collection('people');
const Init = admin.firestore().collection('init');
const Chats = admin.firestore().collection('chats');

////******** ALL POST REQUEST *//////////

//**Called when new user is created from app */
export const initPerson = functions.auth.user().onCreate((user) => {

    const userData: int.NewUser = dataService.newUser();
    userData.uid = user.uid;
    userData.email = user.email;

    if (user.displayName !== null || user.displayName !== undefined) {
        userData.username = user.displayName
    }
    if (user.photoURL !== null || user.displayName !== undefined) {
        userData.photoURL = user.photoURL;
    }
    if (user.photoURL === null || user.photoURL === undefined || user.photoURL === '') {
        userData.photoURL = 'https://firebasestorage.googleapis.com/v0/b/jimbotfire.appspot.com/o/avatars%2FjimbotLogoOfficial.png?alt=media&token=e359b556-a248-49fe-9f4a-40d970ac82ec'
    }
    initFeed(user.uid);
    // sets user in firestore
    return People.doc(user.uid).set(userData)
        .catch(err => {
            console.log('error setting person db', err)
        }).then(() => {
            initChat(user.uid);
            initFriend(user.uid);
        }).catch(err => console.log('error init chat', err))
});

//** Called after init person,gym, or arena to init and assign a feed */
function initFeed(userID) {
    const feedKey = dataService.makeKey();
    const feedData: int.NewFeed = {
        key: feedKey,
        userRef: userID,
        name: 'personal feed',
        type: 'user feed',
        description: "users feed created during registration"
    };
    return admin.firestore().collection('feeds').add(feedData)
}

function initChat(userID) {
    Init.doc('jimbotwelcomemessage').get()
        .then(doc => {
            const welcomeChat = doc.data();
            welcomeChat.members.push(userID);
            return People.doc(userID).collection('chats').add(welcomeChat)
                .then((res) => {
                    const chatID = res.id;
                    const myWelcomeChat = res.data();
                    myWelcomeChat.chatID = chatID;
                    const welcomeMessage = {
                        message: "Welcome to JimBot. I'm Jim! I am currently receiving updates at this time and am not active. Soon I will be here to guide you through your JimBot experience.",
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/jimbotfire.appspot.com/o/avatars%2FjimbotLogoOfficial.png?alt=media&token=e359b556-a248-49fe-9f4a-40d970ac82ec",
                        time: "No better time to start than now!"
                    };
                    People.doc(userID).collection('chats').doc(res.id).set(welcomeChat);
                    People.doc(userID).collection('chats').doc(res.id).collection('messages').add(welcomeMessage);
                });
        })
}

function initFriend(userID) {
    Init.doc('jimthebot').get()
        .then(doc => {
            const jimBot = doc.data();
            return People.doc(userID).collection('friendsList').add(jimBot);
        });
}

export const onFeedCreate = functions.firestore.document('feeds/{key}').onCreate((snap) => {
    const feed = snap.data();

    People.doc(feed.userRef).get()
        .then((snapshot) => {
            snapshot.forEach(person => {
                person.feedRef = feed.key;
            });
        })
        .catch(err => {
            console.log('error setting feedRef key', err)
        })


});

export const onDeviceCreate = functions.firestore.document('devices/{token}').onCreate((snap) => {
    const device = snap.data();
    console.log(device);
    return People.doc(device.userID).collection('devices').doc(device.token).set(device);
});

export const onFriendRequestApproved = functions.firestore.document('people/{uid}/approvedFriendRequestSent/{key}').onCreate(async event => {

    const data = event.data();
    const db = admin.firestore();
    console.log('data: ', data);

    db.collection('people').doc(data.approverID).get()
        .then(doc => {
            if (!doc) {
                console.log('no such document in request received')
            } else {
                const receiver = doc.data();

                db.collection('people').doc(data.senderID).collection('friendsList').doc(data.approverID).set(receiver);
                sendFriendToast(receiver, data).then((value) => {
                    console.log('Toast sent successfully: ' + value);
                }).catch((error) => {
                    console.error(error);
                });
            }
        }).catch((error) => {
        console.error(error);
    });

});

async function sendFriendToast(receiver, data) {
    const db = admin.firestore();
    const userID = data.senderID;
    //get user token and send notification
    const deviceRef = db.collection('devices').where('userID', '==', userID);
    const devices = await deviceRef.get();
    devices.forEach(result => {
        let token;
        const deviceRefs = result.data();
        console.log('deviceRef: ', deviceRefs);
        token = deviceRefs.token;
        const message = {
            notification: {
                title: "New Friend",
                body: "You & " + receiver.first_name + " " + receiver._lastname + " are now friends!"
            },
            token: token,
            android: {
                ttl: 4000,
                notification: {
                    icon: 'socialMobile/cloud/functions/src/icons/icon.png',
                    color: '#f45342',
                },
            },
            apns: {
                payload: {
                    aps: {
                        badge: 42,
                    },
                },
            }
        };
        console.log('message', message);
        //send notifications
        return admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('run successful:', response);
            })
            .catch((error) => {
                console.log('Error during  run:', error);
            });
    });
}

export const onFriendRequest = functions.firestore.document('people/{uid}/pendingFriendRequest/{key}').onCreate(async event => {
    const data = event.data();
    console.log('data: ', data);
    const userID = data.sentTo;
    const name = data.sender.first_name + ' ' + data.sender.last_name;

    const db = admin.firestore();
    const deviceRef = db.collection('devices').where('userID', '==', userID);

    //get user token and send notification
    const devices = await deviceRef.get();

    devices.forEach(result => {
        let token;
        const deviceRefs = result.data();
        console.log('deviceRef: ', deviceRefs);
        token = deviceRefs.token;
        console.log(token, 'token');

        const message = {
            notification: {
                title: "New Friend",
                body: "You have a friend Request from " + name,

            },
            token: token,
            android: {
                ttl: 4000,
                notification: {
                    icon: data.sender.photoURL
                }
            },
            apns: {
                payload: {
                    aps: {
                        badge: 0,
                    },
                },
            }
        };
        console.log('message', message);
        //send notifications
        return admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('run successful:', response);
            })
            .catch((error) => {
                console.log('Error during  run:', error);
            });
    });
});
// ALL Delete Methods

export const deleteUser = functions.firestore
    .document('people/{userID}')
    .onDelete((snap) => {
        // Get an object representing the document prior to deletion
        // e.g. {'name': 'Marie', 'age': 66}
        const deletedValue = snap.data();
        console.log(deletedValue);
        // perform desired operations ...
    });

export const deleteApprovedFriendRequest = functions.firestore
    .document('people/{userID}/pendingFriendRequest/{key}')
    .onDelete((snap) => {
        // Get an object representing the document prior to deletion
        // e.g. {'name': 'Marie', 'age': 66}
        const deletedValue = snap.data();
        console.log(deletedValue);
        // perform desired operations ...
        People.doc(deletedValue.sender.uid).collection('friendRequestSent').doc(deletedValue.key).delete();
        const personRef = People.doc(deletedValue.sentTo);
        personRef.get()
            .then(person => {
                if (!person.exists) {
                    console.log('cant find doc');
                } else {
                    const friend = person.data();
                    return People.doc(deletedValue.sender.uid).collection('friendsList').doc(friend.uid).set(friend);
                }
            }).catch(err => {
            console.log('Error getting document', err);
        });
    });

//All Update Methods
export const updateUser = functions.firestore
    .document('people/{userId}')
    .onUpdate((change, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        const previousValue = change.before.data();

        // access a particular field as you would any JS property
        const name = newValue.name;
        console.log(name);
        // perform desired operations ...
        return name
    });

//**CHAT Functions */
export const newChatSession = functions.firestore.document('people/{uid}/chats/{chatID}').onCreate(async event => {
    //This trigger adds the chatID to the chat once saved in Database for Query
    const eventID = event.id;
    const chatSession = event.data();
    console.log('event', event);

    chatSession.chatID = eventID;
    console.log('chatSession', chatSession);
    return People.doc(chatSession.createdBy).collection('chats').doc(chatSession.chatID).update({chatID: chatSession.chatID});
});

export const newMessage = functions.firestore.document('chats/{chatID}/messages/{messageID}').onCreate(async event => {
    const db = admin.firestore();
    const data = event.data();
    console.log('data: ', data);
    const text = data.message;
    const senderName = data.username;
    const senderID = data.fromUID;
    const messageID = Object.keys(data);
    const lastMessage = {
        message: text,
        photoURL: data.photoURL,
        relTime: data.relTime,
        username: data.username,
        messageID: messageID,
        chatID: data.chatID
    };

    if (data.time === 'No better time to start than now!') {
        return
    }
    //Get the Chat session associated with message
    const chatSession = Chats.doc(data.chatID);
    // Update the lastMessage section of the Chat Doc
    chatSession.update({
        lastMessage: lastMessage
    }).then( (res)  =>{
        chatSession.get()
            .then((doc) => {
                if (doc.exists) {
                    const chat = doc.data();
                    //loop thorough each member in the chat
                    chat.members.forEach(async member => {
                        try {
                            People.doc(Object.keys(member)).collection('chats').doc(data.chatID).collection('messages').add(data);

                            console.log('member', member);
                            //get every device associated with the member in chat
                            const deviceRef = db.collection('devices').where('userID', '==', member);
                            const devices = await deviceRef.get();

                            // loop through each device and send message to user.
                            devices.forEach(result => {
                                let token;
                                const deviceRefs = result.data();
                                console.log('deviceRef: ', deviceRefs);
                                //set the users msg auth token
                                if (deviceRefs.token) {
                                    token = deviceRefs.token;
                                    console.log(token, 'token');
                                    //set the toast message to send to
                                    const message = {
                                        notification: {
                                            title: "New Message",
                                            body: 'Message from ' + senderName + ':' + text,
                                        },
                                        token: token,
                                        android: {
                                            ttl: 4000,
                                            notification: {
                                                icon: data.photoURL
                                            }
                                        },
                                        apns: {
                                            payload: {
                                                aps: {
                                                    badge: 0,
                                                },
                                            },
                                        }
                                    };
                                    console.log('message', message);
                                    //send notifications
                                    admin.messaging().send(message)
                                        .then((response) => {
                                            // return the response to end function.
                                            console.log('run successful:', response);
                                            return;
                                        })
                                        .catch((error) => {
                                            console.log('Error during  run:', error);
                                        });
                                }

                            });
                        }
                        catch (e) {
                            console.error('newMessage Error', e);

                            const memberID = Object.keys(member);

                            const errorUserRef$ = People.doc(senderID);
                            errorUserRef$.get()
                                .then(async (user) => {
                                    if (user.exists()) {
                                        const deviceRef = db.collection('devices').where('userID', '==', memberID);
                                        const devices = await deviceRef.get();

                                        // loop through each device and send message to user.
                                        devices.forEach(result => {
                                            let token;
                                            const deviceRefs = result.data();
                                            console.log('deviceRef: ', deviceRefs);
                                            //set the users msg auth token
                                            if (deviceRefs.token) {
                                                token = deviceRefs.token;
                                                console.log(token, 'token');
                                                //set the toast message to send to
                                                const message = {
                                                    notification: {
                                                        title: "ERROR",
                                                        body: 'There was a error sending your message to ' + user.username,
                                                    },
                                                    token: token,
                                                    android: {
                                                        ttl: 4000,
                                                        notification: {
                                                            icon: data.photoURL
                                                        }
                                                    },
                                                    apns: {
                                                        payload: {
                                                            aps: {
                                                                badge: 0,
                                                            },
                                                        },
                                                    }
                                                };
                                                console.log('message', message);
                                                //send notifications
                                                admin.messaging().send(message)
                                                    .then((response) => {
                                                        // return the response to end function.
                                                        console.log('run successful:', response);
                                                        return;
                                                    })
                                                    .catch((error) => {
                                                        console.log('Error during  run:', error);
                                                    });
                                            }

                                        });

                                    }
                                }).catch(error => console.error('newMessage error2',error))
                        }
                    });
                }
            })
    }).catch(err => console.log('newMessage error 3',err));

});

export const syncChat = functions.firestore.document('chats/{chatID}').onWrite(event => {
    const data = event.after.data();
    const membersArray = data.members;

    membersArray.forEach(member => {
        People.doc(member).collection('chats').doc(data.chatID).set(data);
    });
    console.log(data);
    return data;

});


