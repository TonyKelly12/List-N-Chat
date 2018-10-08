import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IChat, IUser} from "../../interfaces";
import {Observable} from "rxjs";
import {Content, Events, NavController, NavParams, PopoverController} from "ionic-angular";
import {RelativeTimePipe} from "../../pipes/relative-time/relative-time";
import {firestore} from "firebase";
import {AngularFirestore} from "angularfire2/firestore";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";
import {FormBuilder} from "@angular/forms";

/**
 * Generated class for the ChatMembersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'chat-members',
    templateUrl: 'chat-members.html'
})
export class ChatMembersComponent {
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

    ngOnInit() {
        this.relPipe = new RelativeTimePipe();

        const chat = this.navParams.data;
        this.chatID = chat.chatID;
        console.log('chatID', chat);
        //Gets the chat and get each members username to display at top of chat//
        const chatRef$ = this.afStore.collection('chats').doc(this.chatID);
        chatRef$.valueChanges()
            .subscribe(chat => {
                if (chat) {
                    const ctSession = chat as IChat;
                    const membersRef$ = ctSession.members;
                    console.log('chat memberRef', this.membersRef$);
                    membersRef$.forEach(member => {
                        console.log('chatMemeber', member);
                        const memberID = member.memberID;
                        console.log('memberID', memberID);
                        const mRef = this.afStore.collection('people').doc(memberID).valueChanges();
                        mRef.subscribe(memberRef => {
                            const member = memberRef as IUser;
                            if (!this.chatMemRef$.includes(member.uid))
                                this.chatNames.push(member);
                            this.chatMemRef$.push(member.uid)
                        })
                    });
                    //TODO: find a way to handle exception here if no chat
                }
            });
        this.chatMembers = Observable.of(this.chatNames);
    }

}
