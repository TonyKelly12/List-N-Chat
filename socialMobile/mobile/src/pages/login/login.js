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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase/app';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, authService, storage, fb, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.storage = storage;
        this.fb = fb;
        this.platform = platform;
        this.errorMessage = '';
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.createForm();
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('logged in', user);
                _this.navCtrl.setRoot('Dashboard');
            }
        });
    };
    LoginPage.prototype.createForm = function () {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    // tryFacebookLogin(){
    //   this.authService.doFacebookLogin()
    //   .then(res => {
    //     console.log(res);
    //     const JimbotUser = res;
    //     
    //     this.storage.setItem('JIMBOT_USER', {auth: JimbotUser});
    //     this.navCtrl.setRoot('Dashboard');
    //   })
    // }
    // tryTwitterLogin(){
    //   this.authService.doTwitterLogin()
    //   .then(res => {
    //     console.log(res);
    //     const JimbotUser = res;
    //     
    //     //this.storage.set('JIMBOT_USER', JimbotUser);
    //     this.navCtrl.setRoot('Dashboard');
    //   })
    // }
    LoginPage.prototype.tryGoogleLogin = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.authService.nativeGoogleLogin()
                .then(function (res) {
                console.log(res);
                //this.storage.set('JIMBOT_USER', JimbotUser);
                _this.navCtrl.setRoot('Dashboard');
            });
        }
        else {
            this.authService.webGoogleLogin();
        }
    };
    LoginPage.prototype.tryLogin = function (value) {
        var _this = this;
        this.authService.doLogin(value)
            .then(function (res) {
            console.log(res);
            var JimbotUser = res;
            _this.navCtrl.setRoot('Dashboard');
        }, function (err) {
            _this.setError(err.message);
        });
    };
    LoginPage.prototype.registerPage = function () {
        this.navCtrl.setRoot('RegisterPage');
    };
    LoginPage.prototype.setError = function (message) {
        var _this = this;
        this.errorMessage = message;
        this.errorMessageTO = setTimeout(function () {
            _this.errorMessage = '';
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            providers: [AuthServiceProvider]
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            AuthServiceProvider,
            NativeStorage,
            FormBuilder,
            Platform])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map