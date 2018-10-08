import {Component, ViewChild, Input, Output, EventEmitter,} from '@angular/core';
import {NavController, NavParams, Events, Content, PopoverController,} from 'ionic-angular';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
//Firebase Firestore
import {firestore} from 'firebase';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
//Interfaces
import {IUser, IChat} from '../../interfaces';
//Pipes
import {RelativeTimePipe} from '../../pipes/relative-time/relative-time'

@Component({
    selector: 'chat',
    templateUrl: 'chat.html',
})

export class ChatComponent implements IChat {
    @ViewChild(Content) content: Content;

    @Input() @Output() chatID: string;

    @Output() setTextScrollEvent = new EventEmitter();

    relPipe: RelativeTimePipe;
    lastMessage: object;
    time: string;
    createdBy: string;
    members: any[];
    photoURL: object;
    currentUserID: string;
    currentUser: firestore.DocumentData;
    avatars: string[];
    membersRef$: any[];
    chatMemRef$: string[] = [];
    chatNames: IUser[] = [];
    chatMembers: Observable<IUser[]>;
    messages: Observable<{}[]>;
    showEdit: boolean = false;
    editorMsg: string = '';

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
        })
    }

    ionViewDidLoad() {

    }

    ngOnInit() {
        this.relPipe = new RelativeTimePipe();

        const chat = this.navParams.data;
        this.chatID = chat.chatID;
        console.log('chatID', chat);
        this.messages = this.afStore.collection('chats').doc(this.chatID)
            .collection('messages', ref => ref.orderBy('time', 'asc')).valueChanges();
    }

    showEditButton() {
        console.log('current user', this.currentUser);
        this.afStore.collection('people').doc(this.currentUserID).snapshotChanges().subscribe(user => {
            if (user) {
                const checkUser = user.payload.data() as IUser;
                if (this.auth.canEdit(checkUser)) {
                    this.showEdit = !this.showEdit;
                    console.log('showEdit Ran', this.showEdit)
                }
            }
        })
    };

    pipeMsg(msg) {
        return this.relPipe.transform(msg)
    };

    ionViewDidEnter(): void {
        this.scrollToNewestPost();
    };

    scrollToNewestPost(): void {
        this.content.scrollToBottom(0).catch(err => console.log(err));
    };

    resizeContent(): void {
        this.content.resize();
        this.scrollToNewestPost();
    };

    onFocus(): void {

        this.content.resize();
        this.scrollToBottom();
    };

    scrollToBottom(): void {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom()
                    .catch(err => console.error(err));
            }
        }, 400)
    }


}
