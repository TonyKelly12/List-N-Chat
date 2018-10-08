import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase/app';
import { NativeStorage } from '@ionic-native/native-storage';
import {Platform} from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [AuthServiceProvider]
})
export class LoginPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public authService: AuthServiceProvider,
		public storage: NativeStorage,
		public platform: Platform
	) {
	}

	ngOnInit():void {

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('logged in', user);

                this.navCtrl.setRoot('Dashboard').catch(err => {
                    console.error('nav err', err)
                });
			}
		});

	}


    registerPage():void {
        this.navCtrl.setRoot('RegisterPage').catch(err => {
            console.error('nav err', err)
        });
    }


}
