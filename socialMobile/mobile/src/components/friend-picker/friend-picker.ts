import {Component, EventEmitter, forwardRef, Output, Input, OnInit} from '@angular/core';
import {FriendsProvider} from "../../providers/friends/friends-service";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Events} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {IChat, IUser} from '../../interfaces';

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FriendPickerComponent),
    multi: true
};

@Component({
    selector: 'friend-picker',
    templateUrl: 'friend-picker.html',

})
export class FriendPickerComponent implements OnInit {
    @Input() chatID;
    @Output() friendEvent = new EventEmitter();
    friendsArr;
    friendsArrRef$;
    currentUserID;
    _content: string;
    _onChanged: Function;
    _onTouched: Function;
    chatMembers = [];
    invites = [];

    constructor(public friendsProvider: FriendsProvider, public events: Events, public afAuth: AngularFireAuth, public afStore: AngularFirestore) {

    }

    ngOnInit() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUserID = user.uid;
                console.log('chatID', this.chatID);
                console.log('current user', this.currentUserID);
                this.friendsArr = [];
                this.afStore
                    .collection('people')
                    .doc(this.currentUserID)
                    .collection('chats')
                    .doc(this.chatID).valueChanges().subscribe(chat => {
                    //below only has chatID property
                    const currentChat = chat as IChat;
                    console.log('currentChat', currentChat);
                    if (currentChat == null || currentChat == undefined) {
                        this.chatMembers = [];
                    } else {
                        console.log('else ran');
                        const chatQuery = this.afStore.collection('chats').doc(currentChat.chatID).ref;
                        chatQuery.get()
                            .then(cRef$ => {
                                const chat = cRef$.data() as IChat;
                                this.chatMembers = [];
                                chat.members.forEach(m => {
                                    this.chatMembers.push(m.memberID)
                                });

                                this.friendsArrRef$ = this
                                    .afStore
                                    .collection('people')
                                    .doc(this.currentUserID)
                                    .collection('friendsList').valueChanges().subscribe(fr => {
                                        fr.forEach(friend => {
                                            const thisFriend = friend as IUser;
                                            if (!this.chatMembers.includes(thisFriend.uid) && thisFriend.uid !== 'theBot') {
                                                console.log('push ran');
                                                this.friendsArr.push(friend)
                                            }
                                        })
                                    });

                            });
                    }
                })
            }
        });
    }

    sendFriend(friend): void {
        console.log(friend);
        return this.friendEvent.emit(friend);
    }
}
