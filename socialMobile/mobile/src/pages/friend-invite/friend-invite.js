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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
var FriendInvitePage = /** @class */ (function () {
    function FriendInvitePage(navCtrl, navParams, loading, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.auth = auth;
    }
    FriendInvitePage.prototype.ngOnInit = function () {
        this.presentLoading();
    };
    FriendInvitePage.prototype.presentLoading = function () {
        var loader = this.loading.create({
            content: "Please wait...",
            duration: 500,
            spinner: 'bubbles'
        });
        loader.present();
    };
    FriendInvitePage.prototype.ionViewCanEnter = function () {
        var authStatus = this.auth.getAuthStatus();
        if (authStatus === true) {
            return this.auth.getAuthStatus();
        }
        else {
            this.navCtrl.setRoot('LoginPage');
        }
    };
    FriendInvitePage.prototype.toFriendsList = function () {
        this
            .navCtrl
            .setRoot("FriendsListPage");
    };
    FriendInvitePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-friend-invite',
            templateUrl: 'friend-invite.html',
            providers: [AuthServiceProvider]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            AuthServiceProvider])
    ], FriendInvitePage);
    return FriendInvitePage;
}());
export { FriendInvitePage };
//# sourceMappingURL=friend-invite.js.map