import { Component } from '@angular/core';
import {firestore} from "firebase";
import {NavController, NavParams, PopoverController} from "ionic-angular";
import {AngularFirestore} from "angularfire2/firestore";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'chat-list',
  templateUrl: 'chat-list.html'
})
export class ChatListComponent {
    chatArray;
    chats;
    messageArray;
    message;
    currentUser:firestore.DocumentData;
    currentUserID;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private afStore : AngularFirestore,
        private auth : AuthServiceProvider,
        public popoverCtrl: PopoverController,
        private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user =>{
            this.currentUserID = user.uid;
            this.currentUser = this.afStore.collection('people').doc(this.currentUserID).valueChanges();

            this.chatArray = this
                .afStore
                .collection('people')
                .doc(this.currentUserID)
                .collection('chats')
                .valueChanges()
                .subscribe( chatArrayRef$ =>{
                    this.chats = [];
                    console.log('array ref',chatArrayRef$);
                    chatArrayRef$.forEach( chatRef$ =>{
                        // @ts-ignore
                        const chatID = chatRef$.chatID ;
                        const chatQuery = this.afStore.collection('chats').doc(chatID).ref;
                        chatQuery.get().then( chatSnapshot =>{
                            const chat = chatSnapshot.data();
                            console.log('doc chat',chat);
                            this.chats.push(chat);
                        })

                    })
                    //this.chats = chatArrayRef$
                });
            console.log(this.currentUserID);

            this.messageArray = this
                .afStore
                .collection('people')
                .doc(this.currentUserID)
                .collection('chats')

        })
    }

    presentPopover(ev, chat) {

        let popover = this.popoverCtrl.create('DeletePopoverPage',{

        });

        popover.present({
            ev: ev
        }).catch(err => console.error('popover error', err));

        popover.onDidDismiss(res => this.deleteChat(res, chat))
    }

    deleteChat(res, chat){
        if(res === true){
            this.afStore.collection('people').doc(this.currentUserID).collection('chats').doc(chat.chatID).delete().catch(err => console.error('delete error', err));
        }else{
            return
        }
    }

    chatPage(chat):void{
        console.log(chat);
        this.navCtrl.setRoot('ChatsPage', chat).catch(err => console.error('nav err', err));
    }


}
