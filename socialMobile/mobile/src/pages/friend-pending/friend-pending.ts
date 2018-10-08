import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {AngularFirestore} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-friend-pending',
  templateUrl: 'friend-pending.html',
})
export class FriendPendingPage {
  pendingRequest;
  friendRequest;
  
  currentUserID;
  toastOptions: ToastOptions;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afStore : AngularFirestore,
    private auth: AuthServiceProvider,
    private toast: ToastController,
    private afAuth: AngularFireAuth
  ) {
    
    this.afAuth.authState.subscribe(user =>{
			this.currentUserID = user.uid
			
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
        .setRoot('LoginPage').catch(err => console.error('nav error', err));
    }

  }


  friendsListPage():void{
    this.navCtrl.setRoot('FriendsListPage').catch(err => console.error('nav error', err))
  }


}
