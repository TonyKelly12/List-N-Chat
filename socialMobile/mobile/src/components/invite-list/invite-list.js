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
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var InviteListComponent = /** @class */ (function () {
    function InviteListComponent(navCtrl, navParams, loading, auth, afStore, toast, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.auth = auth;
        this.afStore = afStore;
        this.toast = toast;
        this.afAuth = afAuth;
        this.invitesList = [];
        this.displayInvites = [];
        var testRef = this.afAuth.authState.subscribe(function (user) {
            _this.currentUserID = user.uid;
            _this.currentUser = _this.afStore.collection('people').doc(_this.currentUserID).valueChanges();
            var friendMatchers = [];
            var requestMatchers = [];
            var friendFiltered = [];
            var userFiltered = [];
            var requestFiltered = [];
            var sentRequestMatchers = [];
            //Retrieves friend request the user has been sent
            try {
                _this.sentArray = _this
                    .afStore
                    .collection('people')
                    .doc(_this.currentUserID)
                    .collection('pendingFriendRequest').snapshotChanges().subscribe(function (requestRef) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, requestRef.forEach(function (req) {
                                    var friendRequest = req.payload.doc.data();
                                    sentRequestMatchers.push(friendRequest);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                console.log(error);
                _this.sentArray = [];
            }
            //Retrieves friends list
            try {
                _this.friendsArray = _this
                    .afStore
                    .collection('people')
                    .doc(_this.currentUserID)
                    .collection('friendsList').snapshotChanges().subscribe(function (friendRef) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            //for each object get its data
                            return [4 /*yield*/, friendRef.forEach(function (fl) {
                                    var friend = fl.payload.doc.data();
                                    friendMatchers.push(friend);
                                })];
                            case 1:
                                //for each object get its data
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                console.log(error);
            }
            //Finds people user has sent friend request to.
            try {
                _this.requestArray = _this
                    .afStore
                    .collection('people')
                    .doc(_this.currentUserID)
                    .collection('friendRequestSent').snapshotChanges().subscribe(function (reqRef) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            //for each object get its data
                            return [4 /*yield*/, reqRef.forEach(function (rq) {
                                    var request = rq.payload.doc.data();
                                    requestMatchers.push(request);
                                })];
                            case 1:
                                //for each object get its data
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                console.log(error);
            }
            //Gets everyone in the database.
            try {
                _this.inviteArray = _this.afStore.collection('people').snapshotChanges().subscribe(function (inviteRef) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, inviteRef.forEach(function (invRef) {
                                    var invite = invRef.payload.doc.data();
                                    _this.invitesList.push(invite);
                                })
                                //since function is called from filter it looses scope of this.currentUserID
                                // so need to pass this.currentUserID into filterby user to test.
                                //Removes current user from list
                            ];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, this.invitesList.filter(function (invite) { return filterByUser(invite, _this.currentUserID); })];
                            case 2:
                                //since function is called from filter it looses scope of this.currentUserID
                                // so need to pass this.currentUserID into filterby user to test.
                                //Removes current user from list
                                userFiltered = _a.sent();
                                return [4 /*yield*/, userFiltered.filter(filterByFriend)];
                            case 3:
                                //Removes everyone from friends list
                                friendFiltered = _a.sent();
                                return [4 /*yield*/, friendFiltered.filter(filterByRequest)];
                            case 4:
                                //Removes everyone user sent a friend request to
                                requestFiltered = _a.sent();
                                //Removes everyone who has sent you a friend request.
                                this.displayInvites = requestFiltered.filter(filterBySentRequest);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            catch (error) {
                console.log(error);
            }
            //This function should return false if the user matches the invite
            function filterByUser(invite, tester) {
                if (invite.uid === tester) {
                    return false;
                }
                else {
                    return true;
                }
            }
            //This function should return false if invite matches member of friends List
            function filterByFriend(invite) {
                var testArray = friendMatchers;
                function matchFriend(invite, test) {
                    console.log(invite, test);
                    if (invite === test) {
                        console.log('match true');
                        return false;
                    }
                    else {
                        console.log('match false');
                        return true;
                    }
                }
                var resultArray = testArray.map(function (test) {
                    var result = matchFriend(invite.uid, test.uid);
                    console.log(result);
                    return result;
                });
                var i = resultArray.length;
                console.log(resultArray);
                if (resultArray.includes(false)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            // Filters out users you already sent a friend request to if match return false
            function filterByRequest(invite) {
                var testArray = requestMatchers;
                function matchFriend(request, test) {
                    console.log(request, test);
                    if (request === test) {
                        console.log('match true');
                        return false;
                    }
                    else {
                        console.log('match false');
                        return true;
                    }
                }
                var resultArray = testArray.map(function (test) {
                    var result = matchFriend(invite.uid, test.sentTo);
                    console.log(result);
                    return result;
                });
                var i = resultArray.length;
                console.log(resultArray);
                if (resultArray.includes(false)) {
                    return false;
                }
                else {
                    return true;
                }
            }
            // Filter by friend request sent to user if match return false
            function filterBySentRequest(invite) {
                var testMatchers = [];
                console.log('sent request', sentRequestMatchers);
                if (!sentRequestMatchers || sentRequestMatchers == undefined || sentRequestMatchers == null || sentRequestMatchers.length === 0) {
                    return true;
                }
                sentRequestMatchers.forEach(function (request) {
                    console.log('request id', request.sender.uid);
                    testMatchers.push(request.sender.uid);
                });
                if (testMatchers.includes(invite.uid)) {
                    console.log('match true');
                    return false;
                }
                else {
                    console.log('match false');
                    return true;
                }
            }
        });
    }
    InviteListComponent.prototype.inviteUser = function (user) {
        var _this = this;
        var sentBy;
        var friendRequestKey = AuthServiceProvider.makeKey();
        var senderRef = this.afStore.collection('people').doc(this.currentUserID);
        this.sender = senderRef.valueChanges().subscribe(function (sender) {
            console.log(sender);
            sentBy = sender;
            var friendRequest = {
                message: "you have a friend Request From: " + sentBy.first_name + " " + sentBy.last_name,
                sender: sentBy,
                key: friendRequestKey,
                sentTo: user.uid
            };
            _this.toastOptions = {
                message: 'Friend Request to ' + user.first_name + ' ' + user.last_name + " has been sent!",
                duration: 4000,
                position: 'center'
            };
            _this.afStore.collection('people').doc(user.uid).collection('pendingFriendRequest').doc(friendRequest.key).set(friendRequest);
            _this.afStore.collection('people').doc(_this.currentUserID).collection('friendRequestSent').doc(friendRequest.key).set(friendRequest);
            _this.showToast(_this.toastOptions);
            _this.navCtrl.setRoot('FriendsListPage');
        });
    };
    InviteListComponent.prototype.showToast = function (toastOptions) {
        this.toast.create(toastOptions).present();
    };
    InviteListComponent = __decorate([
        Component({
            selector: 'invite-list',
            templateUrl: 'invite-list.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            AuthServiceProvider,
            AngularFirestore,
            ToastController,
            AngularFireAuth])
    ], InviteListComponent);
    return InviteListComponent;
}());
export { InviteListComponent };
//# sourceMappingURL=invite-list.js.map