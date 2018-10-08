import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import {DataModelServiceService} from '../../providers/data-objects/data-objects';
import {SetError} from '../../providers/set-errors/set-errors';
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthServiceProvider, DataModelServiceService, SetError]
})
export class RegisterPage implements OnInit {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public authService: AuthServiceProvider,
  ) {
  }

    ngOnInit(): void {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('logged in', user);

                this.navCtrl.setRoot('Dashboard').catch(err => {
                    console.error('nav err', err)
                });
            }
        });

    }

   loginPage(){
     this.navCtrl.setRoot('LoginPage').catch(err => console.error('nav err login', err));
   }

  

}
