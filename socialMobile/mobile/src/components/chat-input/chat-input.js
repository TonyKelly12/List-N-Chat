var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, } from '@angular/core';
import { NavController, NavParams, Events, Content, PopoverController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';
var ChatInputComponent = /** @class */ (function () {
    function ChatInputComponent(navParams, navCtrl, afStore, auth, events, popoverCtrl, afAuth, fb) {
        var _this = this;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.afStore = afStore;
        this.auth = auth;
        this.events = events;
        this.popoverCtrl = popoverCtrl;
        this.afAuth = afAuth;
        this.fb = fb;
        this.EswitchFriendPicker = new EventEmitter();
        this.msgEvent = new EventEmitter();
        this.EsetTextareaScroll = new EventEmitter();
        this.Efocus = new EventEmitter();
        this.EonFocus = new EventEmitter();
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
    ChatInputComponent.prototype.addPost = function () {
        var _this = this;
        if (!this.editorMsg.trim())
            return;
        console.log('view user1', this.editorMsg);
        //** Below has to be snapshotChanges. ValueChanges never end subscription causing freez//
        var membersArray = this.navParams.get('members');
        var relTime = moment().startOf('days').fromNow();
        var now = new Date();
        var timestamp = now.getTime();
        //console.log(chat);
        var sendMessage = {
            messageID: '',
            message: this.editorMsg,
            photoURL: this.currentUser.photoURL,
            time: timestamp,
            fromUID: this.currentUserID,
            username: this.currentUser.username,
            relTime: relTime,
            chatID: this.chatID
        };
        console.log('after lastChat update');
        //TODO: NO Trigger
        return this.afStore.collection('people').doc(this.currentUserID).collection('chats').doc(this.chatID)
            .collection('messages').add(sendMessage)
            .then(function (res) {
            console.log('resp', res);
            _this.editorMsg = '';
            if (!_this.showFriendPicker) {
                _this.Efocus.emit();
            }
            console.log('after save res', res.id);
            var chatMessage = sendMessage;
            chatMessage.messageID = res.id;
            console.log('after send', sendMessage);
            //updates the messageID for the user who sent the chat
            //TODO: no trigger
            _this.afStore.collection('people').doc(chatMessage.fromUID).collection('chats').doc(_this.chatID).collection('messages').doc(res.id)
                .update({ messageID: res.id })
                .then(function () {
                //TODO: Triggers Sync Message
                //sets the new message in the main chat node which will trigger cloud function to update members of chat
                _this.afStore.collection('chats').doc(_this.chatID).collection('messages').doc(res.id).set(chatMessage)
                    .then(function () {
                    //TODO: Triggers Sync Chat
                    //updates the last message section which is displayed on chatlist
                    _this.afStore.collection('chats').doc(_this.chatID).update({ lastMessage: sendMessage });
                }).catch(function (err) { return console.error(err); })
                    .then(function () {
                    //TODO: triggers sync chat
                    //updates the message id in the lastMessage on the chat document
                    _this.afStore.collection('chats').doc(_this.chatID).update({ 'lastMessage.messageID': res.id });
                }).catch(function (err) { return console.log(err); });
            }).catch(function (err) { return console.error(err); });
        }).catch(function (err) { return console.error(err); });
    };
    ;
    //shows friend picker to add user to chat
    ChatInputComponent.prototype.switchFriendPicker = function () {
        this.EswitchFriendPicker.emit();
    };
    ;
    //runs function in chat component to focus messages
    ChatInputComponent.prototype.postEvent = function () {
        return this.msgEvent.emit();
    };
    ChatInputComponent.prototype.runOnFocus = function () {
        return this.EonFocus.emit();
    };
    ChatInputComponent.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    ChatInputComponent.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatInputComponent.prototype, "content", void 0);
    __decorate([
        ViewChild('chat_input'),
        __metadata("design:type", ElementRef)
    ], ChatInputComponent.prototype, "messageInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ChatInputComponent.prototype, "chatID", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ChatInputComponent.prototype, "showFriendPicker", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatInputComponent.prototype, "EswitchFriendPicker", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatInputComponent.prototype, "msgEvent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatInputComponent.prototype, "EsetTextareaScroll", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatInputComponent.prototype, "Efocus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ChatInputComponent.prototype, "EonFocus", void 0);
    ChatInputComponent = __decorate([
        Component({
            selector: 'chat-input',
            templateUrl: 'chat-input.html'
        }),
        __metadata("design:paramtypes", [NavParams,
            NavController,
            AngularFirestore,
            AuthServiceProvider,
            Events,
            PopoverController,
            AngularFireAuth,
            FormBuilder])
    ], ChatInputComponent);
    return ChatInputComponent;
}());
export { ChatInputComponent };
//# sourceMappingURL=chat-input.js.map