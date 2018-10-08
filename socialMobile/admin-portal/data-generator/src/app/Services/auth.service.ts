import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
// TODO: Change below to refrence data-interfaces
import * as int from '../Interfaces/data-interfaces';
import {User} from '@firebase/auth-types';

const propHeader = new Headers();
propHeader.append('Content-Type', 'application/json');

@Injectable()
export class AuthService {
  testStaffURL: 'http://localhost:5000/jimbot-managers-portal/us-central1/newStaff';
  newStaffURL: 'https://us-central1-jimbot-managers-portal.cloudfunctions.net/newStaff';
  user: Observable<int.NewUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afstore: AngularFirestore,
    private router: Router,
    private http: HttpClient,
  ) {
    //// Get auth data, then use it to get firestore user document || null
    this.user = this.afAuth.authState
    .switchMap(user => {
      console.log(user);
      if (user) {
        return this.afstore.doc<int.NewUser>('people/' + user.uid).valueChanges();
      }else {
        return Observable.of(null);
      }
    });
  }


  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

    private updatePeopleData(user) {
      console.log(user);
      const userRef: AngularFirestoreDocument<int.NewUser> = this.afstore.doc('people/' + user.uid);

      const data: int.NewUser = ({
        uid: user.uid,
        email: user.email,
        username: '',
        first_name: '',
        last_name: '',
        phone: '',
        height: '',
        weight: '',
        isMemberOf: true,
        isStaffOf: true,
        gymID: '303',
        feedRef: '',
        photoURL: '',
        creationTime: '',
        lastSignInTime: '',
      });
      return userRef.set(data);
    }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        /// **Send response and value from form to function */
        // this.updateNewUser(res,value)
        resolve(res);
      }, err => reject(err));
    });
  }

    async updateNewUser(data) {
    const userRef: AngularFirestoreDocument<int.NewUser> = this.afstore.doc('people/' + data.uid);
    console.log(userRef);
    console.log(data);
    const staff: int.NewUser = ({
      uid: data.uid,
      email: data.email,
      username: data.username || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      phone: data.phone || '',
      height: data.height || '',
      weight: data.weight || '',
      isMemberOf: data.isMemberOf || false ,
      isStaffOf: data.isStaffOf || false,
      gymID: data.gymID,
      feedRef: '',
      photoURL: '',
      creationTime: '',
      lastSignInTime: ''
    });

    const response = await fetch(this.testStaffURL, {
      method: 'PUT',
      headers: propHeader,
      body: JSON.stringify(staff),
      mode: 'cors'
   }).then(res => {
     return res.json();
   }).catch(err => console.error(err));
   }

  private async saveStaff(data) {
  }

  private extractData(data) {
    // console.log(data);
    return data || {};
  }


  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      }else {
        reject();
      }
    });
  }


}
