var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var FriendPendingPage = /** @class */ (function () {
    function FriendPendingPage(navCtrl, navParams, afStore, auth, toast, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afStore = afStore;
        this.auth = auth;
        this.toast = toast;
        this.afAuth = afAuth;
        var testRef = this.afAuth.authState.subscribe(function (user) {
            _this.currentUserID = user.uid;
        });
    }
    FriendPendingPage.prototype.ionViewCanEnter = function () {
        var authStatus = this
            .auth
            .getAuthStatus();
        if (authStatus === true) {
            return this
                .auth
                .getAuthStatus();
        }
        else {
            this
                .navCtrl
                .setRoot('LoginPage');
        }
    };
    FriendPendingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FriendsListPage');
        this.pendingRequest = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('pendingFriendRequest');
        this.friendRequest = this
            .pendingRequest
            .valueChanges();
        console.log(this.currentUserID);
    };
    FriendPendingPage.prototype.approve = function (firendRequestkey, sender) {
        console.log('approved');
        console.log(firendRequestkey);
        console.log(sender);
        var approvedRequest = {
            key: firendRequestkey,
            senderID: sender.uid,
            approverID: this.currentUserID
        };
        this.toastOptions = {
            message: 'You and ' + sender.first_name + ' ' + sender.last_name + " are now friends!",
            duration: 4000,
            position: 'center'
        };
        this.afStore.collection('people').doc(this.currentUserID).collection('approvedFriendRequestReceived').add(approvedRequest);
        this.afStore.collection('people').doc(sender.uid).collection('approvedFriendRequestSent').add(approvedRequest);
        this.afStore.collection('people').doc(this.currentUserID).collection('friendsList').doc(sender.uid).set(sender);
        this.showToast(this.toastOptions);
        this.deleteRequest(firendRequestkey);
    };
    FriendPendingPage.prototype.deny = function (requestKey, sender) {
        console.log('denied');
        this.toastOptions = {
            message: 'You Denied ' + sender.first_name + ' ' + sender.last_name + " friend request",
            duration: 4000,
            position: 'center'
        };
        this.deleteRequest(requestKey);
        this.showToast(this.toastOptions);
    };
    FriendPendingPage.prototype.deleteRequest = function (requestKey) {
        this.afStore.collection('people').doc(this.currentUserID).collection('pendingFriendRequest').doc(requestKey).delete();
    };
    FriendPendingPage.prototype.showToast = function (toastOptions) {
        this.toast.create(toastOptions).present();
    };
    FriendPendingPage.prototype.friendsListPage = function () {
        this.navCtrl.setRoot('FriendsListPage');
    };
    FriendPendingPage.prototype.invitePage = function () {
        this.navCtrl.setRoot("FriendInvitePage");
    };
    FriendPendingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-friend-pending',
            templateUrl: 'friend-pending.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFirestore,
            AuthServiceProvider,
            ToastController,
            AngularFireAuth])
    ], FriendPendingPage);
    return FriendPendingPage;
}());
export { FriendPendingPage };
//# sourceMappingURL=friend-pending.js.map