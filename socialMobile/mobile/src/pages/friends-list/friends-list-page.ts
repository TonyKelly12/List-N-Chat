import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {IChat} from '../../interfaces'
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({selector: 'page-friends-list', templateUrl: 'friends-list-page.html', providers: [AuthServiceProvider]})
export class FriendsListPage implements OnInit {


  friends : any;
  userKey = 'ZaqYVsWT2sVAc70XJmhX';
  friendsRefTest;
  friendsList;
  userRef$;

  currentUserID;
  currentUser;
  chatMatchArray:IChat[] = [];
  constructor(
    public navCtrl : NavController,
    public navParams : NavParams,
    private afStore : AngularFirestore,
    private auth : AuthServiceProvider,
    private afAuth: AngularFireAuth
  ) {

     this.afAuth.authState.subscribe(user =>{
			if(user){
				this.currentUserID = user.uid
			}
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

  ngOnInit(){
    const userRef= this.afStore.collection('people').doc(this.currentUserID).ref;
    userRef.get().then(user =>{
      this.currentUser = user.data();
      console.log('init', this.currentUser)
    })
  }



  invitePage():void {
    this
      .navCtrl
      .setRoot("FriendInvitePage").catch(err => console.error('nav error', err));
  }
  pendingRequestPage():void {
    this
      .navCtrl
      .setRoot("FriendPendingPage").catch(err => console.error('nav error', err));
  };



}
