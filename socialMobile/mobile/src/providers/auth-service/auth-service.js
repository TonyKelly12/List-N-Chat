var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { HttpClient, } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import { ProfileData } from '../profile-data/profile-data';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
// These have to be outside the class to become globals. and hence persisted beyond the life of the AuthServiceProvider.
// Without these here, then the information would be lost  shortly after we make it past the login screen.
var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(http, pltform, afAuth, afstore, profileData, localStorage, gplus) {
        var _this = this;
        this.http = http;
        this.pltform = pltform;
        this.afAuth = afAuth;
        this.afstore = afstore;
        this.profileData = profileData;
        this.localStorage = localStorage;
        this.gplus = gplus;
        this.userKeyURL = 'https://us-central1-socialdemo-b8fe1.cloudfunctions.net/getUserKey';
        console.error('1');
        //Keeps track of the users auth status with firebase.
        //can be called from other pages by auth.user
        this.user = this.afAuth.authState
            .switchMap(function (user) {
            console.log(user);
            if (user) {
                //this.userID = user.uid
                return _this.afstore.doc('people/${user.uid}').valueChanges();
            }
            else {
                return Observable.of(null);
            }
        });
        this.userID = this.afAuth.authState.switchMap(function (user) {
            if (user) {
                return user.uid;
            }
        });
        //used for online status
        // this.afAuth.authState.do(user =>{
        // 	if(user){
        // 		this.upDateConnectionStatus();
        // 	}
        // }).subscribe();
        console.error('2');
        //used for the page router gaurds. sets auth status if user is logged in
        this.afAuth.authState.subscribe(function (user) {
            if (user && user.email && user.uid) {
                console.log('Logged in successfully');
                return _this.isAuthenticated = true;
            }
            else {
                return _this.isAuthenticated = false;
            }
        });
    }
    ;
    //helper to perform the update in firebase
    AuthServiceProvider.prototype.updateStatus = function (status) {
        if (!this.userID)
            return;
        this.afstore.collection('people').doc(this.userID).update({ status: status });
    };
    //makes a random key
    AuthServiceProvider.makeKey = function () {
        var key = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 16; i++)
            key += possible.charAt(Math.floor(Math.random() * possible.length));
        return key;
    };
    /**
     * Returns users seceret key to dycrypt userToken in local storage
     */
    AuthServiceProvider.prototype.getUserKey = function () {
        //FIXME: Get key from firebase
        // let propHeader = new HttpHeaders();
        // propHeader.append("Content-Type", "application/json");	
        // const url = 'https://us-central1-socialdemo-b8fe1.cloudfunctions.net/getUserKey'
        // await this.http.get(url,{headers:propHeader}).map(this.extractData)
        return 'Uua9HhsHDrJTAu3SlLcX';
    };
    //returns http data as a object 
    AuthServiceProvider.prototype.extractData = function (data) {
        //console.log(data);
        return data || {};
    };
    /**
     * returns current user as snapshot changes.
     * Can be subscribed to get doc key when not saved as uid.
    */
    AuthServiceProvider.prototype.getUserData = function () {
        //TODO: LESSON** THis is how to convert Promise<string> to a string
        var currentUserIDRef$ = this.getUserID();
        var currentUserID = currentUserIDRef$.toString();
        return this.afstore.collection('people').doc(currentUserID).snapshotChanges();
    };
    /**
     * dycrypts userToken from local storage and returns as string.
     * Because one local storage returns string and on returns Promise<string>
        function must return any
    **/
    AuthServiceProvider.prototype.getUserID = function () {
        //FIXME: Crypoto May not work in native debug or delete later
        //gets userID from storage based on platform
        //const secret = this.getUserKey()
        //this.crypto = new SimpleCrypto(secret);
        var plt = this.getPlatform();
        if (plt === 'web') {
            var userToken = this.getUserIDBrowser();
            return userToken;
            //	const currentUserID = this.crypto.decrypt(userToken);
            //	console.log('id Dycrypted',currentUserID);
            //	return currentUserID;	
        }
        else {
            this.getUserIDNative().then(function (userID) {
                console.log('get userId', userID);
                return userID;
            });
            //const currentUserID = this.crypto.decrypt(userToken);
            //console.log('id Dycrypted',currentUserID);
        }
        ;
    };
    ;
    /**Returns auth status as true or false for page auth guards
     */
    AuthServiceProvider.prototype.getAuthStatus = function () {
        console.log(this.isAuthenticated);
        return this.isAuthenticated;
    };
    /**checks platform and returns as string
     * example: 'ios'
    */
    AuthServiceProvider.prototype.getPlatform = function () {
        if (this.pltform.is('ios')) {
            return 'ios';
        }
        else if (this.pltform.is('android')) {
            return 'android';
        }
        else if (this.pltform.is('cordova')) {
            return 'cordova';
        }
        else {
            return 'web';
        }
    };
    /**Gets user token saved to browser local storage */
    AuthServiceProvider.prototype.getUserIDBrowser = function () {
        this.deviceType = this.getPlatform();
        if (this.deviceType === 'web') {
            var userToken = window.localStorage.getItem('userToken');
            return userToken;
        }
        else {
            return;
        }
    };
    /** gets user token from native device storage */
    AuthServiceProvider.prototype.getUserIDNative = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uid, uidRef$;
            return __generator(this, function (_a) {
                uid = this.afAuth.authState.switchMap(function (user) {
                    if (user) {
                        return user.uid;
                    }
                });
                uidRef$ = uid.toPromise();
                return [2 /*return*/, uidRef$.then(function (user) {
                        var userID = user;
                        return userID;
                    })];
            });
        });
    };
    /**updates user Document in firestore */
    AuthServiceProvider.prototype.updateUser = function (user, data) {
        console.log(user);
        console.log(this.userID);
        return this.afstore.doc('people/' + user.uid).update(data);
    };
    /**Registers user for app */
    AuthServiceProvider.prototype.doRegister = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(function (res) {
                var uidRes = res.uid;
                //FIXME: Crypoto May not work for native debug or delete later
                _this.deviceType = _this.getPlatform();
                console.error('platform', _this.deviceType);
                //encrypts uid before storing in local storage.
                //const secret = this.getUserKey();
                //this.crypto = new SimpleCrypto(secret);
                //const userToken = this.crypto.encrypt(uidRes);
                //stores token in local storage based off platform
                //console.log(userToken)
                if (_this.deviceType === 'web') {
                    window.localStorage.setItem('userToken', uidRes);
                }
                else {
                    _this.localStorage.setItem('USER', { userToken: uidRes });
                    _this.isAuthenticated = true;
                    resolve(res);
                }
            }, function (err) { return reject(err); }).then(function (res) {
                var thhat = res;
            });
        });
    };
    /**
     * logs user in using firestore auth
     */
    AuthServiceProvider.prototype.doLogin = function (value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(function () {
                console.log('Logging in');
                firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                    .then(function (res) {
                    var uidRes = res.uid;
                    console.error(res.uid);
                    _this.userID = res.uid;
                    //this.isAuthenticated = true;
                    //const secret = this.getUserKey();
                    //this.crypto = new SimpleCrypto(secret);
                    //encrypts uid before storing in local storage.
                    //const userToken = this.crypto.encrypt(uidRes);
                    _this.deviceType = _this.getPlatform();
                    console.error('platform', _this.deviceType);
                    //stores token in local storage based off platform
                    //console.log(userToken)
                    // if (this.deviceType === 'web') {
                    //  	 window.localStorage.setItem('userToken', uidRes)
                    //  } 
                    //  this.localStorage.setItem('USER', {userToken: '1234'}).then(()=>{
                    // 	console.log('user saved to local!')
                    // })
                    // 	.catch(err => console.log(err));
                }, function (err) { return reject(err); });
            });
        });
    };
    AuthServiceProvider.prototype.nativeGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var googleUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.gplus.login({
                                //FIXME: REMOVE KEY BEFORE SUBMITTING TO PUBLIC REPO!!
                                'webClientId': '557118430343-0vfmf920aell6rk0pscfpcoco6vk2nie.apps.googleusercontent.com',
                                'offline': true,
                                'scopes': 'profile email'
                            })];
                    case 1:
                        googleUser = _a.sent();
                        return [4 /*yield*/, this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleUser.idToken))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        console.error('Native Login Error', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthServiceProvider.prototype.webGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, credential, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        provider = new firebase.auth.GoogleAuthProvider();
                        return [4 /*yield*/, this.afAuth.auth.signInWithPopup(provider)];
                    case 1:
                        credential = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error('web login error', err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * logs user out
     */
    AuthServiceProvider.prototype.doLogout = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deviceType = _this.getPlatform();
            if (firebase.auth().currentUser) {
                _this.afAuth.auth.signOut();
                _this.isAuthenticated = false;
                if (_this.deviceType === 'cordova') {
                    _this.gplus.logout();
                }
                if (_this.deviceType === 'web') {
                    window.localStorage.clear();
                }
                else {
                    _this.localStorage.remove('USER');
                }
                resolve();
            }
            else {
                reject();
            }
        });
    };
    /**
     * gets userProfile Data for profile page
     * @param user
     */
    AuthServiceProvider.prototype.getJimbotProfileData = function (user) {
        return this.profileData.getProfileData(user).map(function (profile) {
            return profile;
        });
    };
    // Abilities and Roles // 
    AuthServiceProvider.prototype.canRead = function (user) {
        var allowed = ['user', 'pro', 'staff', 'admin'];
        return this.checkRoleAuth(user, allowed);
    };
    AuthServiceProvider.prototype.canEdit = function (user) {
        var allowed = ['pro', 'staff', 'admin'];
        return this.checkRoleAuth(user, allowed);
    };
    AuthServiceProvider.prototype.canDelete = function (user) {
        var allowed = ['staff', 'admin'];
        return this.checkRoleAuth(user, allowed);
    };
    /**
     * Checks to see if the user has matching role
     * @param user
     * @param allowedRoles
     */
    AuthServiceProvider.prototype.checkRoleAuth = function (user, allowedRoles) {
        if (!user || !user.roles)
            return false;
        for (var _i = 0, allowedRoles_1 = allowedRoles; _i < allowedRoles_1.length; _i++) {
            var role = allowedRoles_1[_i];
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    };
    AuthServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            Platform,
            AngularFireAuth,
            AngularFirestore,
            ProfileData,
            NativeStorage,
            GooglePlus])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map