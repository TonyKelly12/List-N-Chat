import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
@Component({
  selector: 'friends-nav',
  templateUrl: 'friends-nav.html'
})
export class FriendsNavComponent {



  constructor(public navCtrl: NavController,
		public navParams: NavParams,) {
   
  }

  toFriendsList():void {
		this
			.navCtrl
			.setRoot("FriendsListPage");
	}
	pendingRequestPage():void {
		this
			.navCtrl
			.setRoot("FriendPendingPage");
	};

    invitePage():void {
        this.navCtrl.setRoot("FriendInvitePage");
    }

}
