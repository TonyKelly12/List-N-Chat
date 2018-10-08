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
import { NavController, Platform, IonicPage } from 'ionic-angular';
import { PersonsApiProvider } from '../../providers/persons-api/persons-api';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { FcmProvider } from '../../providers/fcm/fcm';
import { NativeStorage } from '@ionic-native/native-storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
var Dashboard = /** @class */ (function () {
    function Dashboard(platform, navCtrl, personsApi, auth, fcm, toastCtrl, alertCtrl, afStore, localStorage, afAuth) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.personsApi = personsApi;
        this.auth = auth;
        this.fcm = fcm;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.afStore = afStore;
        this.localStorage = localStorage;
        this.afAuth = afAuth;
        var uid = this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.currentUserID = user.uid;
                _this.currentUser = _this.afStore.collection('people').doc(_this.currentUserID).valueChanges();
            }
        });
        // this.currentUserID = this.auth.getUserID()
        // console.error('userID', this.currentUserID)
        // this.currentUser = this.afStore.collection('people').doc(this.currentUserID).valueChanges()
    }
    /**
     * Fired before entering into a view, allows you to control whether the view can be accessed
     *  or not (returning true or false).
     * @return True if we are authorized to enter this view.
     */
    Dashboard.prototype.ionViewCanEnter = function () {
        var authStatus = this.auth.getAuthStatus();
        if (authStatus === true) {
        }
        else {
            this.navCtrl.setRoot('LoginPage');
        }
        return authStatus;
    };
    /**
     * This method is part of the ionic life cycle events. Fired only when a view is stored in memory.
     *  This event is NOT fired on entering a view that is already cached. It’s a nice place for init
     *  related tasks.
     *  @see https://blog.ionicframework.com/navigating-lifecycle-events/
     */
    Dashboard.prototype.ionViewDidLoad = function () {
        //if user data is needed it must be done witin the subscription//
        var _this = this;
        console.log('switch', this.currentUserID);
        //***BELOW GETS LOGED IN USER CREDENTIALS */
        //this.fcm.getToken();
        //**Code for push notifications */
        if (this.platform.is('ios')) {
            console.error('ios');
            this.fcm.getTokenIOS(this.currentUserID);
        }
        if (this.platform.is('android')) {
            console.error('android');
            this.fcm.getTokenAndroid(this.currentUserID);
        }
        if (this.platform.is('cordova')) {
            console.log('cordova');
            this.fcm.getTokenCordova();
        }
        this.fcm.listenToNotifications().pipe(tap(function (msg) {
            var toast = _this.toastCtrl.create({
                message: msg.body,
                duration: 4000
            });
            toast.present();
        })).subscribe();
    };
    Dashboard = __decorate([
        IonicPage(),
        Component({
            templateUrl: 'dashboard.html',
            providers: [PersonsApiProvider, AuthServiceProvider]
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            PersonsApiProvider,
            AuthServiceProvider,
            FcmProvider,
            ToastController,
            AlertController,
            AngularFirestore,
            NativeStorage,
            AngularFireAuth])
    ], Dashboard);
    return Dashboard;
}());
export { Dashboard };
//# sourceMappingURL=dashboard.js.map