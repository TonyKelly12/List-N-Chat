import {Component, ViewChild, ElementRef, Input, Output, EventEmitter,} from '@angular/core';
import {NavController, NavParams, Events, Content, PopoverController} from 'ionic-angular';

import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {AngularFirestore} from 'angularfire2/firestore';
import {IMessage} from '../../interfaces';
import * as moment from 'moment';

import {AngularFireAuth} from 'angularfire2/auth';
import {FormBuilder} from '@angular/forms';
import {firestore} from 'firebase';

@Component({
    selector: 'chat-input',
    templateUrl: 'chat-input.html'
})
export class ChatInputComponent {
    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    @Input() chatID: string;
    @Input() showFriendPicker: boolean;
    @Output() switchFriendPickerEvent = new EventEmitter();
    @Output() msgEvent = new EventEmitter();
    @Output() setTextAreaScrollEvent = new EventEmitter();
    @Output() focusEvent = new EventEmitter();
    @Output() onFocusEvent = new EventEmitter();

    text: string;
    editorMsg: string = '';
    currentUserID: string;
    currentUser: firestore.DocumentData;
    members: object;
    photoURL: object;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        private afStore: AngularFirestore,
        private auth: AuthServiceProvider,
        public events: Events,
        public popoverCtrl: PopoverController,
        private afAuth: AngularFireAuth,
        public fb: FormBuilder
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUserID = user.uid;
                const userRef = this.afStore.collection('people').doc(this.currentUserID).ref;
                userRef.get().then(user => {
                    this.currentUser = user.data();
                    console.log('init', this.currentUser)
                })
            }
        });
    }

    addPost(): Promise<void> {
        if (!this.editorMsg.trim()) return;

        const relTime = moment().startOf('days').fromNow();
        const now = new Date();
        const timestamp = now.getTime();

        const sendMessage: IMessage = {
            messageID: '',
            message: this.editorMsg,
            photoURL: this.currentUser.photoURL,
            time: timestamp,
            fromUID: this.currentUserID,
            username: this.currentUser.username,
            relTime: relTime,
            chatID: this.chatID
        };

        return this.afStore.collection('chats').doc(this.chatID)
            .collection('messages').add(sendMessage)

            .then(res => {
                console.log('resp', res);
                this.editorMsg = '';
                if (!this.showFriendPicker) {
                    this.focusEvent.emit();
                }
            }).catch(err => console.error(err));
    };

    //shows friend picker to add user to chat
    switchFriendPicker(): void {
        this.switchFriendPickerEvent.emit();
    };

    postEvent(): void {
        return this.msgEvent.emit();
    }

    runOnFocus(): void {
        return this.onFocusEvent.emit();
    }

    focus(): void {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    setTextAreaScroll(): void {
        const textArea = this.messageInput.nativeElement;
        textArea.scrollTop = textArea.scrollHeight;
    }

}
