import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AngularFirestore} from 'angularfire2/firestore';
import {DataModelServiceService} from '../../providers/data-objects/data-objects';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {IChat} from '../../interfaces';
import {AngularFireAuth} from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-friend-popover',
  templateUrl: 'friend-popover.html',
  providers: [AuthServiceProvider, DataModelServiceService]
})
export class FriendPopoverPage {
  private friendsArray : any;
  friends = [];
  friendsRefTest;
  friendsList;
  chatID;
  currentUserID;
  chatSession ={} as IChat;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl : ViewController,
    private afStore : AngularFirestore, 
    private auth: AuthServiceProvider,
    private afAuth: AngularFireAuth
  
  )
  {
      this.afAuth.authState.subscribe(user => {
			this.currentUserID = user.uid
      });
    this.friendsArray = this
      .afStore
      .collection('people')
      .doc(this.currentUserID)
      .collection('friendsList')
      .snapshotChanges().subscribe(async fr => {
        await fr.forEach(f => {
          let friend = f.payload.doc.data();
            console.log(friend);
          this.friends.push(friend)
        });
        });
    console.log(this.friends)
  }

  addToChat(friend){

      const chatID = this.navParams.get('chatID');
      const chatSession:IChat =this.navParams.get('chatSession');
      let members = Object.values(chatSession.members);
      let photos = Object.values(chatSession.photoURL);
      console.log(chatSession.members);
      members.push(friend.uid);
      photos.push(friend.photoURL);
      console.log('members', members);
      console.log('friend', friend);

      this.afStore.collection('chats').doc(chatID).update({
          members: members,
          photoURL: photos
      }).catch(err => console.error('update err', err));
      this.close()
  }

    close(){
        this.viewCtrl.dismiss().catch(err => console.error('dismiss error', err));
    }
  

}
