import { Component } from '@angular/core';
import { Nav } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {IUser} from '../../interfaces';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';


@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {
  currentUserID;
  text: string;
  photoURL: string;
  currentUser:IUser;
  constructor(private nav: Nav, private auth: AuthServiceProvider, private afAuth: AngularFireAuth, public afStore: AngularFirestore) {
    
    
    const testRef =this.afAuth.authState.subscribe(user =>{
      if (!user) {
        this.photoURL = "https://firebasestorage.googleapis.com/v0/b/socialdemo-b8fe1.appspot.com/o/" +
                        "avatars%2FColor%20Nerds%20Logo.jpg?alt=media&token=18d5659a-ae61-4690-aa7c-de802dd86021";
  
      }else{
        this.currentUserID = user.uid
        const currentUserRef$ = this.afStore.collection('people').doc(this.currentUserID).valueChanges()
        .subscribe(u =>{
          this.currentUser = u as IUser
           this.photoURL = this.currentUser.photoURL
        })
      }	
		})
  }

  viewMyProfile() {
    this.nav.setRoot('Profile', {profileID: this.currentUserID});
  }
}
