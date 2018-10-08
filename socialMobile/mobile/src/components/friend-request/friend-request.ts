import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, ToastOptions} from "ionic-angular";
import {AngularFirestore} from "angularfire2/firestore";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'friend-request',
  templateUrl: 'friend-request.html'
})
export class FriendRequestComponent {
    pendingRequest;
    friendRequest;

    currentUserID;
    toastOptions: ToastOptions;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afStore : AngularFirestore,
        private auth: AuthServiceProvider,
        private toast: ToastController,
        private afAuth: AngularFireAuth
    ) {

        this.afAuth.authState.subscribe(user =>{
            this.currentUserID = user.uid
            this.pendingRequest = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('pendingFriendRequest');
        this.friendRequest = this
            .pendingRequest
            .valueChanges();
        console.log(this.currentUserID);

        })
    }
    

    approve(firendRequestkey, sender):void{
        console.log('approved');
        console.log(firendRequestkey);
        console.log(sender);
        let approvedRequest ={
            key: firendRequestkey,
            senderID: sender.uid,
            approverID: this.currentUserID

        };
        this.toastOptions = {
            message:'You and ' + sender.first_name + ' ' + sender.last_name + " are now friends!",
            duration: 4000,
            position: 'center'
        };

        this.afStore.collection('people').doc(this.currentUserID).collection('approvedFriendRequestReceived').add(approvedRequest).catch(err => console.error('add error', err));
        this.afStore.collection('people').doc(sender.uid).collection('approvedFriendRequestSent').add(approvedRequest).catch(err => console.error('add error', err));

        this.afStore.collection('people').doc(this.currentUserID).collection('friendsList').doc(sender.uid).set(sender).catch(err => console.error('set error', err));
        this.showToast(this.toastOptions);
        this.deleteRequest(firendRequestkey)
    }

    deny(requestKey, sender):void{
        console.log('denied');
        this.toastOptions = {
            message:'You Denied ' + sender.first_name + ' ' + sender.last_name + " friend request",
            duration: 4000,
            position: 'center'
        };
        this.deleteRequest(requestKey);
        this.showToast(this.toastOptions);
    }

    deleteRequest(requestKey):void{
        this.afStore.collection('people').doc(this.currentUserID).collection('pendingFriendRequest').doc(requestKey).delete().catch(err => console.error('delete error', err))

    }

    showToast(toastOptions):void{
        this.toast.create(toastOptions).present().catch(err => console.error('toast error', err));
    }
}
