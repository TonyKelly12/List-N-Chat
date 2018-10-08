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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, IonicPage, Content } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ChatInputComponent } from '../../components/chat-input/chat-input';
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");
import { AngularFirestore } from 'angularfire2/firestore';
var ChatsPage = /** @class */ (function () {
    function ChatsPage(navParams, navCtrl, auth, afStore) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.afStore = afStore;
        this.showFriendPicker = false;
    }
    ChatsPage.prototype.ngOnInit = function () {
        this.chatSession = this.navParams.data;
        this.chatID = this.chatSession.chatID;
        console.log('chatID', this.chatID);
    };
    //checks if user is logged in and can access page
    ChatsPage.prototype.ionViewCanEnter = function () {
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
    ;
    ChatsPage.prototype.addToChat = function (friend) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, friendUID, members, photos, newMembers, newPhotos, chatMembers, chatPhotos;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        friendUID = friend.uid;
                        members = this.members;
                        photos = this.photoURL;
                        return [4 /*yield*/, Object.assign((_a = {}, _a[friendUID] = true, _a), members)];
                    case 1:
                        newMembers = _c.sent();
                        return [4 /*yield*/, Object.assign((_b = {}, _b[friendUID] = friend.photoURL, _b), photos)];
                    case 2:
                        newPhotos = _c.sent();
                        chatMembers = newMembers;
                        chatPhotos = newPhotos;
                        console.log('members', members);
                        console.log('photos', photos);
                        setTimeout(function () { _this.saveChatUpdate(chatMembers, chatPhotos); }, 1000);
                        this.switchFriendPicker();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatsPage.prototype.saveChatUpdate = function (chatMembers, chatPhotos) {
        return this.afStore.collection('chats').doc(this.chatID).update({ members: chatMembers, photoURL: chatPhotos });
    };
    ChatsPage.prototype.switchFriendPicker = function () {
        this.showFriendPicker = !this.showFriendPicker;
        console.log('Firend picker', this.showFriendPicker);
        if (!this.showFriendPicker) {
            this.onFocus();
            this.focus();
        }
        else {
            this.inputChild.setTextareaScroll();
        }
    };
    ;
    ChatsPage.prototype.onFocus = function () {
        this.content.resize();
        //this.scrollToBottom();
    };
    ;
    ChatsPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatsPage.prototype, "content", void 0);
    __decorate([
        ViewChild(ChatInputComponent),
        __metadata("design:type", ElementRef)
    ], ChatsPage.prototype, "messageInput", void 0);
    __decorate([
        ViewChild(ChatInputComponent),
        __metadata("design:type", ChatInputComponent)
    ], ChatsPage.prototype, "inputChild", void 0);
    ChatsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chats',
            templateUrl: 'chats.html',
            providers: [AuthServiceProvider]
        }),
        __metadata("design:paramtypes", [NavParams,
            NavController,
            AuthServiceProvider,
            AngularFirestore])
    ], ChatsPage);
    return ChatsPage;
}());
export { ChatsPage };
//# sourceMappingURL=chats.js.map