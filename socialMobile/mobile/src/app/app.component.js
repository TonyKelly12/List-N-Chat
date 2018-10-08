var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PopoverController } from 'ionic-angular';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, auth, alertCtrl, popoverCtrl) {
        // platform.ready().then(() => {
        // 	// Okay, so the platform is ready and our plugins are available.
        // 	// Here you can do any higher level native things you might need.
        // 	if (platform.is('cordova')) {
        // 		statusBar.styleDefault();
        // 		splashScreen.hide();
        // 	}
        this.menuCtrl = menuCtrl;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.rootPage = 'LoginPage';
        // 	// // Initialize background location tracker
        // 	// if (platform.is('ios') || platform.is('android')) {
        // 	// 	locationTracker.initialize();
        // 	// }
        // });
        // db.firestore.settings({ timestampsInSnapshots: true });
    }
    MyApp.prototype.friendsList = function () {
        this.nav.setRoot('FriendsListPage');
        this.menuCtrl.close();
    };
    MyApp.prototype.dashboard = function () {
        this.nav.setRoot('Dashboard');
        this.menuCtrl.close();
    };
    MyApp.prototype.challenge = function () {
        this.nav.setRoot('CompetitionListPage');
        // this.nav.setRoot('TeamsPage');
        this.menuCtrl.close();
    };
    MyApp.prototype.rankings = function () {
        this.nav.setRoot('RankingPage');
        this.menuCtrl.close();
    };
    MyApp.prototype.showLogout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Logout',
                    handler: function () {
                        console.log('Logout clicked');
                        _this.logout();
                    }
                }
            ]
        });
        confirm.present();
    };
    MyApp.prototype.logout = function () {
        this.auth.doLogout();
        this.nav.setRoot('LoginPage');
        this.menuCtrl.close();
    };
    MyApp.prototype.friendsPending = function () {
        this.nav.setRoot('FriendPendingPage');
        this.menuCtrl.close();
    };
    MyApp.prototype.chatList = function () {
        this.nav.push('ChatListPage');
        this.menuCtrl.close();
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen,
            MenuController, AuthServiceProvider, AlertController, PopoverController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map