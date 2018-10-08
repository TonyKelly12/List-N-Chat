var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Input, Output, EventEmitter, } from '@angular/core';
import { NavController, NavParams, Events, Content, PopoverController, } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
//Pipes
import { RelativeTimePipe } from '../../pipes/relative-time/relative-time';
var ChatComponent = /** @class */ (function () {
    function ChatComponent(navParams, navCtrl, afStore, auth, events, popoverCtrl, afAuth, fb) {
        var _this = this;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.afStore = afStore;
        this.auth = auth;
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.afAuth = afAuth;
        this.fb = fb;
        this.EsetTextScroll = new EventEmitter();
        this.chatMemRef$ = [];
        this.chatNames = [];
        this.showEdit = false;
        this.editorMsg = '';
        var uid = this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.currentUserID = user.uid;
                var userRef = _this.afStore.collection('people').doc(_this.currentUserID).ref;
                userRef.get().then(function (user) {
                    _this.currentUser = user.data();
                    console.log('init', _this.currentUser);
                });
            }
        });
    }
    ChatComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.relPipe = new RelativeTimePipe();
        //this.chatSession = this.navParams.data
        //this.chatID = this.navParams.get('chatID');
        console.log('chatID', this.chatID);
        //Gets the chat and get each members username to display at top of chat//
        var chatRef$ = this.afStore.collection('chats').doc(this.chatID);
        chatRef$.valueChanges()
            .subscribe(function (chat) {
            if (chat) {
                var ctSession = chat;
                _this.avatars = Object.values(ctSession.photoURL);
                //every memebers uid in chat
                _this.membersRef$ = Object.keys(ctSession.members);
                var memsort = _this.membersRef$.forEach(function (m) {
                    var mRef = _this.afStore.collection('people').doc(m).valueChanges();
                    mRef.subscribe(function (memberRef) {
                        var member = memberRef;
                        if (!_this.chatMemRef$.includes(member.uid))
                            _this.chatNames.push(member);
                        _this.chatMemRef$.push(member.uid);
                    });
                });
                //TODO: find a way to handle exeption here if no chat
            }
        });
        this.chatMembers = Observable.of(this.chatNames);
        this.messages = this.afStore.collection('people').doc(this.currentUserID)
            .collection('chats').doc(this.chatID)
            .collection('messages', function (ref) { return ref.orderBy('time', 'asc'); }).valueChanges();
        console.log('subChatID', this.chatID);
        console.log('subUserID', this.currentUserID);
    };
    ChatComponent.prototype.ionViewDidLoad = function () {
    };
    ;
    ChatComponent.prototype.showEditButton = function () {
        var _this = this;
        console.log('current user', this.currentUser);
        this.afStore.collection('people').doc(this.currentUserID).snapshotChanges().subscribe(function (user) {
            if (user) {
                var checkUser = user.payload.data();
                if (_this.auth.canEdit(checkUser)) {
                    _this.showEdit = !_this.showEdit;
                    console.log('showEdit Ran', _this.showEdit);
                }
            }
        });
    };
    ;
    ChatComponent.prototype.pipeMsg = function (msg) {
        return this.relPipe.transform(msg);
    };
    ;
    ChatComponent.prototype.ionViewDidEnter = function () {
        this.scrollToNewestPost();
    };
    ;
    ChatComponent.prototype.scrollToNewestPost = function () {
        this.content.scrollToBottom(0);
    };
    ;
    ChatComponent.prototype.resizeContent = function () {
        this.content.resize();
        this.scrollToNewestPost();
    };
    ;
    ChatComponent.prototype.onFocus = function () {
        this.content.resize();
        this.scrollToBottom();
    };
    ;
    ChatComponent.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatComponent.prototype, "content", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ChatComponent.prototype, "chatID", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatComponent.prototype, "EsetTextScroll", void 0);
    ChatComponent = __decorate([
        Component({
            selector: 'chat',
            templateUrl: 'chat.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            NavController,
            AngularFirestore,
            AuthServiceProvider,
            Events,
            PopoverController,
            AngularFireAuth,
            FormBuilder])
    ], ChatComponent);
    return ChatComponent;
}());
export { ChatComponent };
//# sourceMappingURL=chatComponent.js.map