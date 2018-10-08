import {Component} from '@angular/core';
import {IChat} from "../../interfaces";

import {ActionSheetController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {DataModelServiceService} from '../../providers/data-objects/data-objects';

import {AngularFireAuth} from 'angularfire2/auth';

@Component({
    selector: 'friend-list',
    templateUrl: 'friend-list.html'
})
export class FriendListComponent {
    private friendsArray: any;
    friends: any;
    currentUserID;
    currentUser;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afStore: AngularFirestore,
        private auth: AuthServiceProvider,
        private ds: DataModelServiceService,
        public actionSheetCtrl: ActionSheetController,
        public popoverCtrl: PopoverController,
        private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUserID = user.uid
            }
            this.friendsArray = this
                .afStore
                .collection('people')
                .doc(this.currentUserID)
                .collection('friendsList');
            this.friends = this
                .friendsArray
                .valueChanges()
        });
    }

    openMessage(friend): void {
        //GO through the users chats and get all that have the friend in it
        let userMessages = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('chats',).ref;
        userMessages.get()
            .then(chatArrRef$ => {
            console.log('chat Ref', chatArrRef$);
                // If the user has no chats in list create a new chat.
                console.log('only group chats', this.onlyGroupChats(chatArrRef$));
            if (!chatArrRef$ || chatArrRef$ == undefined || chatArrRef$ == null || chatArrRef$.empty) {
                console.log('chat snap is null');
                return this.createChat(friend);
            } else if (this.onlyGroupChats(chatArrRef$) === true) {
                console.log('only group chats ran');
                return this.createChat(friend);
            } else {
                //go through each chatID in the user's chat list and find each one with the friend in it
                chatArrRef$.forEach(chatIDRef$ => {
                    const chatID = chatIDRef$.id;
                    console.log('chat ID', chatID);
                    const chatQuery = this.afStore.collection('chats').doc(chatID).ref;
                    chatQuery.get()
                        .then(chatRef$ => {
                            const chatData = chatRef$.data() as IChat;
                            const sortedChatMembers = this.sortChatMembers(chatData, friend);
                            console.log('sorted chat members', sortedChatMembers);
                            if (sortedChatMembers === true) {
                                this.navCtrl.setRoot('ChatsPage', chatData).catch(err => console.error('nav err', err))
                            }
                        })
                });


            }
            });
    }

    onlyGroupChats(chatArrRef$): boolean {
        let countArray = [];
        chatArrRef$.forEach(chatIDRef$ => {
            const chatID = chatIDRef$.id;
            console.log('chat ID', chatID);
            const chatQuery = this.afStore.collection('chats').doc(chatID).ref;
            chatQuery.get()
                .then(chatRef$ => {
                    const chatData = chatRef$.data() as IChat;
                    countArray.push(chatData.members.length);
                });
        });
        console.log('count', countArray);

        return countArray.every(FriendListComponent.overTwoMembers);

    }

    static overTwoMembers(currentValue) {
        return currentValue > 2
    }

    sortChatMembers(chat, friend): boolean {
        let isChat = false;
        console.log('chat data', chat);
        // an array of member id's
        let membersArray = chat.members;
        //if there are more than 3 ids its a group chat just return it
        if (membersArray.length > 2) {
            isChat = false
        }
        //if there are only two id's its a single chat
        if (membersArray.length === 2) {
            //expect only two entries
            let memberMatchers = [];
            //loop through each member involved in the chat
            membersArray.forEach(member => {
                memberMatchers.push(member.memberID);
                console.log('memberArray', member);
            });

            if (memberMatchers.includes(friend.uid) && memberMatchers.includes(this.currentUserID) && !memberMatchers.includes('theBot')) {
                isChat = true;

            }
            if (memberMatchers.includes('theBot') && friend.uid === 'theBot' && memberMatchers.includes(this.currentUserID)) {
                //TODO: Open Bot Chat
                isChat = false;
            }
        }
        console.log('is chat', isChat);
        return isChat
    }
    createChat(friend): void {

        const currentUserRef$ = this.afStore.collection('people').doc(this.currentUserID).ref;
        currentUserRef$.get().then(userRef$ => {
            this.currentUser = userRef$.data();
            console.log('current user', this.currentUser);
            const newChat = this.ds.newChat();
            newChat.members = [
                {
                    memberID: this.currentUserID,
                    active: true,
                    online: true,
                    admin: true,
                    photo: this.currentUser.photoURL
                },
                {
                    memberID: friend.uid,
                    active: true,
                    online: false,
                    admin: false,
                    photo: friend.photoURL
                }];
            newChat.photoURL = {
                [this.currentUserID]: this.currentUser.photoURL,
                [friend.uid]: friend.photoURL
            };
            newChat.createdBy = this.currentUserID;

            // Save the new chat in the database
            this.afStore.collection('chats').add(newChat)
            // use the response to update the chatID to match key produced by firebase
                .then((res) => {
                    console.log('function response', res.id);
                    const chatID = res.id;
                    newChat.chatID = res.id;
                    // TODO: For Tutorial Talk About Chaining these vs not Chaining
                    //Update Chat ID field
                    this.afStore.collection('chats').doc(chatID).update({chatID: chatID}).catch(err => console.log('update chat err', err))
                    // Save chat ID in users chat list
                        .then(() => this.afStore.collection('people').doc(this.currentUserID).collection('chats').doc(chatID).set({chatID: chatID})
                            .catch(err => console.error('db add err', err)))
                        // Save Chat ID in friends chat list.
                        .then(() => this.afStore.collection('people').doc(friend.uid).collection('chats').doc(chatID).set({chatID: chatID})
                            .catch(err => console.error('db add err', err)))
                        // Nav to new chat page
                        .then(() => {
                            console.log('newChat', newChat);
                            this.navCtrl.push('ChatsPage', newChat).catch(err => console.error('nav error', err))
                        })
                        .catch(err => console.error('nav err', err));
                })
                .catch(err => console.log(err));
        });
    }


    presentPopover(ev, friend) {

        let popover = this.popoverCtrl.create('DeletePopoverPage', {});

        popover.present({
            ev: ev
        }).catch(err => console.error('popover error', err));

        popover.onDidDismiss(res => this.deleteFriend(res, friend))
    }

    presentBlockedPopover(ev) {

        let popover = this.popoverCtrl.create('DeletePopoverPage', {});

        popover.present({
            ev: ev
        }).catch(err => console.error('blockpop error', err));

        popover.onDidDismiss(res => this.blockUser(res))
    }

    deleteFriend(res, friend) {
        if (res === true) {
            this.afStore.collection('people').doc(this.currentUserID).collection('friendsList').doc(friend.uid).delete().catch(err => console.error('delete error', err));
            this.afStore.collection('people').doc(friend.uid).collection('friendsList').doc(this.currentUserID).delete().catch(err => console.error('delete error', err));
        } else {
            return
        }
    }

    blockUser(res) {
        if (res === true) {
            console.log('Working on blocking method');
        } else {
            return
        }
    }

    presentActionSheet(friend) {
        console.log('action friend', friend);
        let actionSheet = this.actionSheetCtrl.create({
            title: friend.username,

            buttons: [
                {
                    text: 'View Profile',

                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Delete Friend',
                    role: 'destructive',
                    handler: () => {
                        console.log('Delete clicked');
                        this.presentPopover(event, friend)
                    }
                },
                {
                    text: 'Block User',
                    role: 'destructive',
                    handler: () => {
                        console.log('Block clicked');
                        this.presentBlockedPopover(event)
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present().catch(err => console.error('action sheet error', err));
    }
}
