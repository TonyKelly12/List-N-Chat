var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, forwardRef, Output, Input } from '@angular/core';
import { FriendsProvider } from "../../providers/friends/friends-service";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Events } from 'ionic-angular';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
export var EMOJI_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return FriendPickerComponent; }),
    multi: true
};
var FriendPickerComponent = /** @class */ (function () {
    function FriendPickerComponent(friendsProvider, events, afAuth, afStore) {
        this.friendsProvider = friendsProvider;
        this.events = events;
        this.afAuth = afAuth;
        this.afStore = afStore;
        this.friendEvent = new EventEmitter();
        this.friendsArr = [];
        this.chatMembers = [];
        this.invites = [];
    }
    FriendPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var uid = this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.currentUserID = user.uid;
                console.log('chatID', _this.chatID);
                console.log('current user', _this.currentUserID);
                var chatRef$ = _this.afStore
                    .collection('people')
                    .doc(_this.currentUserID)
                    .collection('chats')
                    .doc(_this.chatID).valueChanges().subscribe(function (chat) {
                    var currentChat = chat;
                    if (currentChat == null || currentChat == undefined || currentChat.members == null || currentChat.members == undefined) {
                        _this.chatMembers = [];
                    }
                    else {
                        _this.chatMembers = Object.keys(currentChat.members);
                    }
                    _this.friendsArrRef$ = _this
                        .afStore
                        .collection('people')
                        .doc(_this.currentUserID)
                        .collection('friendsList').valueChanges().subscribe(function (fr) {
                        fr.forEach(function (friend) {
                            var thisFriend = friend;
                            if (!_this.chatMembers.includes(thisFriend.uid))
                                _this.friendsArr.push(friend);
                        });
                    });
                });
            }
        });
    };
    FriendPickerComponent.prototype.sendFriend = function (friend) {
        console.log(friend);
        return this.friendEvent.emit(friend);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FriendPickerComponent.prototype, "chatID", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FriendPickerComponent.prototype, "friendEvent", void 0);
    FriendPickerComponent = __decorate([
        Component({
            selector: 'friend-picker',
            templateUrl: 'friend-picker.html',
        }),
        __metadata("design:paramtypes", [FriendsProvider, Events, AngularFireAuth, AngularFirestore])
    ], FriendPickerComponent);
    return FriendPickerComponent;
}());
export { FriendPickerComponent };
//# sourceMappingURL=friend-picker.js.map