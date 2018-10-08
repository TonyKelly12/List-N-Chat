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
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var ChatListPage = /** @class */ (function () {
    function ChatListPage(navCtrl, navParams, afStore, auth, popoverCtrl, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afStore = afStore;
        this.auth = auth;
        this.popoverCtrl = popoverCtrl;
        this.afAuth = afAuth;
        var testRef = this.afAuth.authState.subscribe(function (user) {
            _this.currentUserID = user.uid;
            _this.currentUser = _this.afStore.collection('people').doc(_this.currentUserID).valueChanges();
        });
    }
    ChatListPage.prototype.ionViewCanEnter = function () {
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
    ChatListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatListPage');
        this.chatArray = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('chats');
        this.chats = this
            .chatArray
            .valueChanges();
        console.log(this.currentUserID);
        this.messageArray = this
            .afStore
            .collection('people')
            .doc(this.currentUserID)
            .collection('chats');
    };
    ChatListPage.prototype.chatPage = function (chat) {
        console.log(chat);
        this.navCtrl.push('ChatsPage', chat);
    };
    ChatListPage.prototype.presentPopover = function (ev, chat) {
        var _this = this;
        var popover = this.popoverCtrl.create('DeletePopoverPage', {});
        popover.present({
            ev: ev
        });
        popover.onDidDismiss(function (res) { return _this.deleteChat(res, chat); });
    };
    ChatListPage.prototype.deleteChat = function (res, chat) {
        if (res === true) {
            this.afStore.collection('people').doc(this.currentUserID).collection('chats').doc(chat.chatID).delete();
        }
        else {
            return;
        }
    };
    ChatListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chat-list',
            templateUrl: 'chat-list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AngularFirestore,
            AuthServiceProvider,
            PopoverController,
            AngularFireAuth])
    ], ChatListPage);
    return ChatListPage;
}());
export { ChatListPage };
//# sourceMappingURL=chat-list.js.map