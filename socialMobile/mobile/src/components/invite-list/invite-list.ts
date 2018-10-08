import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {AngularFirestore} from 'angularfire2/firestore';

import {firestore} from '../../../node_modules/firebase';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
    selector: 'invite-list',
    templateUrl: 'invite-list.html'
})
export class InviteListComponent {
    currentUser: firestore.DocumentData;
    currentUserID;

    inviteArray;
    invitesList = [];
    sender;
    friendsArray;
    displayInvites = [];
    requestArray;

    toastOptions: ToastOptions;
    sentArray;
    text: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loading: LoadingController,
                public auth: AuthServiceProvider,
                private afStore: AngularFirestore,
                private toast: ToastController,
                private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            this.currentUserID = user.uid;
            this.currentUser = this.afStore.collection('people').doc(this.currentUserID).valueChanges();

            let friendMatchers = [];
            let requestMatchers = [];
            let friendFiltered = [];
            let userFiltered = [];
            let requestFiltered = [];
            let sentRequestMatchers = [];

            //Retrieves friend request the user has been sent
            try {
                this.sentArray = this
                    .afStore
                    .collection('people')
                    .doc(this.currentUserID)
                    .collection('pendingFriendRequest').snapshotChanges().subscribe(async requestRef => {
                        await requestRef.forEach(req => {
                            let friendRequest = req.payload.doc.data();
                            sentRequestMatchers.push(friendRequest);
                        })
                    });
            } catch (error) {
                console.log(error);
                this.sentArray = [];
            }

            //Retrieves friends list
            try {
                this.friendsArray = this
                    .afStore
                    .collection('people')
                    .doc(this.currentUserID)
                    .collection('friendsList').snapshotChanges().subscribe(async friendRef => {
                        //for each object get its data
                        await friendRef.forEach(fl => {
                            let friend = fl.payload.doc.data();
                            friendMatchers.push(friend);
                        });
                    });
            } catch (error) {
                console.log(error)
            }

            //Finds people user has sent friend request to.
            try {
                this.requestArray = this
                    .afStore
                    .collection('people')
                    .doc(this.currentUserID)
                    .collection('friendRequestSent').snapshotChanges().subscribe(async reqRef => {
                        //for each object get its data
                        await reqRef.forEach(rq => {
                            let request = rq.payload.doc.data();
                            requestMatchers.push(request);
                        });
                    });
            } catch (error) {
                console.log(error);

            }

            //Gets everyone in the database.
            try {
                this.inviteArray = this.afStore.collection('people').snapshotChanges().subscribe(async inviteRef => {
                    await inviteRef.forEach(invRef => {
                        let invite = invRef.payload.doc.data();
                        this.invitesList.push(invite);
                    });
                    //since function is called from filter it looses scope of this.currentUserID
                    // so need to pass this.currentUserID into filterby user to test.
                    //Removes current user from list
                    userFiltered = await this.invitesList.filter(invite => filterByUser(invite, this.currentUserID));
                    //Removes everyone from friends list
                    friendFiltered = await userFiltered.filter(filterByFriend);
                    //Removes everyone user sent a friend request to
                    requestFiltered = await friendFiltered.filter(filterByRequest);
                    //Removes everyone who has sent you a friend request.
                    this.displayInvites = requestFiltered.filter(filterBySentRequest);
                });
            } catch (error) {
                console.log(error)
            }

            //This function should return false if the user matches the invite
            function filterByUser(invite, tester): boolean {
                return invite.uid !== tester;
            }

            //This function should return false if invite matches member of friends List
            function filterByFriend(invite): boolean {
                function matchFriend(invite, test) {
                    console.log(invite, test);
                    if (invite === test) {
                        console.log('match true');
                        return false
                    } else {
                        console.log('match false');
                        return true
                    }
                }

                const resultArray = friendMatchers.map(test => {
                    let result = matchFriend(invite.uid, test.uid);
                    console.log(result);
                    return result
                });

                console.log(resultArray);
                return !resultArray.includes(false);
            }

            // Filters out users you already sent a friend request to if match return false
            function filterByRequest(invite): boolean {
                function matchFriend(request, test) {
                    console.log(request, test);
                    if (request === test) {
                        console.log('match true');
                        return false
                    } else {
                        console.log('match false');
                        return true
                    }
                }

                const resultArray = requestMatchers.map(test => {
                    let result = matchFriend(invite.uid, test.sentTo);
                    console.log(result);
                    return result
                });

                console.log(resultArray);
                return !resultArray.includes(false);
            }

            // Filter by friend request sent to user if match return false
            function filterBySentRequest(invite): boolean {
                const testMatchers = [];
                console.log('sent request', sentRequestMatchers);
                if (!sentRequestMatchers || sentRequestMatchers == undefined || sentRequestMatchers == null || sentRequestMatchers.length === 0) {
                    return true;
                }

                sentRequestMatchers.forEach(request => {
                    console.log('request id', request.sender.uid);
                    testMatchers.push(request.sender.uid)

                });
                if (testMatchers.includes(invite.uid)) {
                    console.log('match true');
                    return false;
                } else {
                    console.log('match false');
                    return true;
                }
            }
        });

    }

    inviteUser(user): void {
        let sentBy;
        const friendRequestKey = AuthServiceProvider.makeKey();
        const senderRef = this.afStore.collection('people').doc(this.currentUserID);
        this.sender = senderRef.valueChanges().subscribe(sender => {
            console.log(sender);
            sentBy = sender;
            let friendRequest = {
                message: "you have a friend Request From: " + sentBy.first_name + " " + sentBy.last_name,
                sender: sentBy,
                key: friendRequestKey,
                sentTo: user.uid
            };
            this.toastOptions = {
                message: 'Friend Request to ' + user.first_name + ' ' + user.last_name + " has been sent!",
                duration: 4000,
                position: 'center'
            };
            this.afStore.collection('people').doc(user.uid).collection('pendingFriendRequest').doc(friendRequest.key).set(friendRequest).catch(err => console.error('set err', err));
            this.afStore.collection('people').doc(this.currentUserID).collection('friendRequestSent').doc(friendRequest.key).set(friendRequest).catch(err => console.error('set err', err));
            this.showToast(this.toastOptions);
            this.navCtrl.setRoot('FriendsListPage').catch(err => console.error('nav err', err));
        })
    }

    showToast(toastOptions): void {
        this.toast.create(toastOptions).present().catch(err => console.error('toast err', err));
    }

}
