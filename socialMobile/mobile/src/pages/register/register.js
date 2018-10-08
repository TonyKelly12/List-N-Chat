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
import { DataModelServiceService } from '../../providers/data-objects/data-objects';
import { SetError } from '../../providers/set-errors/set-errors';
import { Platform } from 'ionic-angular';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, authService, fb, ds, Error, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authService = authService;
        this.fb = fb;
        this.ds = ds;
        this.Error = Error;
        this.platform = platform;
        this.errorMessage = '';
        this.successMessage = '';
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                    Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                    Validators.minLength(6),
                    Validators.maxLength(25),
                    Validators.required
                ]],
        });
    };
    Object.defineProperty(RegisterPage.prototype, "email", {
        get: function () { return this.registerForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(RegisterPage.prototype, "password", {
        get: function () { return this.registerForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    ;
    //  tryFacebookLogin(){
    //    this.authService.doFacebookLogin()
    //    .then(res =>{
    //      this.navCtrl.setRoot('LoginPage');
    //    }, err => console.log(err)
    //    )
    //  }
    //  tryTwitterLogin(){
    //    this.authService.doTwitterLogin()
    //    .then(res =>{
    //     this.navCtrl.setRoot('LoginPage');
    //    }, err => console.log(err)
    //    )
    //  }
    RegisterPage.prototype.tryGoogleLogin = function () {
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
    RegisterPage.prototype.tryRegister = function () {
        var _this = this;
        var newUser = this.ds.newUser();
        newUser.email = this.email.value;
        newUser.password = this.password.value;
        this.authService.doRegister(newUser)
            .then(function (res) {
            console.log(res);
            _this.errorMessage = "";
            _this.successMessage = "Your account has been created";
        }, function (err) {
            console.log(err);
            _this.errorMessage = err.message;
            _this.successMessage = "";
        });
    };
    RegisterPage.prototype.loginPage = function () {
        this.navCtrl.setRoot('LoginPage');
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
            providers: [AuthServiceProvider, DataModelServiceService, SetError]
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            AuthServiceProvider,
            FormBuilder,
            DataModelServiceService,
            SetError,
            Platform])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map