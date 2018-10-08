import { Component, ViewChild } from '@angular/core';
import { Nav, MenuController, AlertController } from 'ionic-angular';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { PopoverController } from 'ionic-angular';

@Component({
	templateUrl: 'app.html'
})

export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: string = 'LoginPage';

	pages: Array<{ title: string, component: any }>;

	providers: [AuthServiceProvider]

	constructor(
		 public menuCtrl: MenuController, public auth: AuthServiceProvider,  public alertCtrl: AlertController, 	public popoverCtrl: PopoverController) {
		
	}

	friendsList() {
		this.nav.setRoot('FriendsListPage');
		this.menuCtrl.close();
	}

	dashboard() {
		this.nav.setRoot('Dashboard');
		this.menuCtrl.close();
	}


	showLogout() {
		let confirm = this.alertCtrl.create({
			message: 'Are you sure you want to logout?',
			buttons: [
				{
					text: 'No',
					handler: () => {
						console.log('No clicked');
					}
				},
				{
					text: 'Logout',
					handler: () => {
						console.log('Logout clicked');
						this.logout();
					}
				}
			]
		});
		confirm.present();
	}

	logout() {
		this.auth.doLogout();
		this.nav.setRoot('LoginPage');
		this.menuCtrl.close();
	}

	friendsPending() {
		this.nav.setRoot('FriendPendingPage');
		this.menuCtrl.close();
	}

	chatList() {
		this.nav.push('ChatListPage');
		this.menuCtrl.close();
	}



}
