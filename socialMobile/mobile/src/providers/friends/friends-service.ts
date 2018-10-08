
import { Injectable } from '@angular/core';
import {AuthServiceProvider} from '../auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FriendsProvider {
  currentUserID;
  constructor(private auth: AuthServiceProvider, private afStore: AngularFirestore){
    

  }
  
  getFriends() {
    let friends = [];
      this
      .afStore
      .collection('people')
      .doc(this.currentUserID)
      .collection('friendsList')
      .snapshotChanges().subscribe(async fr => {
        await fr.forEach(f => {
          let friend = f.payload.doc.data();
            console.log(friend);
          friends.push(friend)
        });
      });
    return friends
  }

}
