import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, IonicPage, Content} from 'ionic-angular';

import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

import {IChat, IPage} from '../../interfaces';
import {ChatInputComponent} from '../../components/chat-input/chat-input';

import {AngularFirestore} from 'angularfire2/firestore';

@IonicPage()
@Component({
    selector: 'page-chats',
    templateUrl: 'chats.html',
    providers: [AuthServiceProvider]
})
export class ChatsPage implements OnInit, IPage {
    @ViewChild(Content) content: Content;
    @ViewChild(ChatInputComponent) messageInput: ElementRef;
    @ViewChild(ChatInputComponent) inputChild: ChatInputComponent;
    chatID: string;
    chatSession: IChat;
    showFriendPicker: boolean = false;
    members: object;
    photoURL: object;

    constructor(
        public navParams: NavParams,
        public navCtrl: NavController,
        private auth: AuthServiceProvider,
        private afStore: AngularFirestore
    ) {
    }

    ngOnInit() {

        this.chatSession = this.navParams.data as IChat;
        this.chatID = this.chatSession.chatID;
        console.log('chatID', this.chatID);
    }

    //checks if user is logged in and can access page
    ionViewCanEnter(): boolean {
        let authStatus = this
            .auth
            .getAuthStatus();
        if (authStatus === true) {
            return this
                .auth
                .getAuthStatus();
        } else {
            this
                .navCtrl
                .setRoot('LoginPage').catch(err => console.error('setRoot Login', err));
        }

    };

    async addToChat(friend) {
        const friendUID = friend.uid;
        const chatMemberInfo = {
            active: true,
            admin: false,
            memberID: friendUID,
            online: false,
            photo: friend.photoURL
        };
        const chatRef$ = this.afStore.collection('chats').doc(this.chatID).ref;
        chatRef$.get()
            .then(cRef$ => {
                const chat = cRef$.data() as IChat;
                const membersArray = chat.members;
                membersArray.push(chatMemberInfo);
                return this.afStore.collection('chats').doc(this.chatID).update({members: membersArray}).catch(err => console.error('update error', err));
            }).catch(err => console.error('get chat error', err));
    }



    switchFriendPicker(): void {
        this.showFriendPicker = !this.showFriendPicker;
        console.log('Friend picker', this.showFriendPicker);
        if (!this.showFriendPicker) {
            this.onFocus();
            this.focus();
        } else {
            this.inputChild.setTextAreaScroll();
        }
    };

    onFocus(): void {

        this.content.resize();
        //this.scrollToBottom();
    };

    focus(): void {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }
}
