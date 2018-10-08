import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { firestore } from '../../../node_modules/firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {

  currentUser:firestore.DocumentData;
  currentUserID;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afStore : AngularFirestore,
    private auth : AuthServiceProvider,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user =>{
			this.currentUserID = user.uid;
			this.currentUser = this.afStore.collection('people').doc(this.currentUserID).valueChanges()
		})
  }

  ionViewCanEnter():boolean {
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
        .setRoot('LoginPage').catch(err => console.error('nav err', err));
    }

  }


}
