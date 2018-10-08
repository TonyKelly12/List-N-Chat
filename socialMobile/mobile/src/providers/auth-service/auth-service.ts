import {HttpClient,} from '@angular/common/http';
import {Injectable,} from '@angular/core';
import firebase, {User} from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Platform} from 'ionic-angular';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
import * as ix from '../../interfaces';
import {ProfileData, UserProfile} from '../profile-data/profile-data';
import {NativeStorage} from '@ionic-native/native-storage';

import {GooglePlus} from '@ionic-native/google-plus';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {TwitterConnect} from "@ionic-native/twitter-connect";


// These have to be outside the class to become globals. and hence persisted beyond the life of the AuthServiceProvider.
// Without these here, then the information would be lost  shortly after we make it past the login screen.

@Injectable()
export class AuthServiceProvider {
	private isAuthenticated: boolean;
	user: Observable<User>;
	userID;
	deviceType:string;


    constructor(
        public http:HttpClient,
        public pltform:Platform,
        private afAuth: AngularFireAuth,
        private afstore: AngularFirestore,
        private profileData: ProfileData,
        public localStorage: NativeStorage,
        public gplus: GooglePlus,
        public facebook: Facebook,
        public twitter: TwitterConnect
	) {
		console.error('1');
		//Keeps track of the users auth status with firebase.
		//can be called from other pages by auth.user
		this.user = this.afAuth.authState
			.switchMap(user => {
				console.log(user);
				if (user) {
					//this.userID = user.uid
					
					return this.afstore.doc<ix.IUser>('people/${user.uid}').valueChanges()
				} else {
					return Observable.of(null)
				}
			});

			this.userID = this.afAuth.authState.switchMap(user =>{
				if(user){
					return user.uid
				}
			});

		console.error('2');
        //used for the page router guards. sets auth status if user is logged in
		this.afAuth.authState.subscribe(user => {
			if (user && user.email && user.uid) {
				console.log('Logged in successfully');
				
				return this.isAuthenticated = true;
			} else {
				return this.isAuthenticated = false
			}
		});	
	};

    //makes a random key
    public static makeKey(): string {
        let key = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 16; i++)
            key += possible.charAt(Math.floor(Math.random() * possible.length));

        return key;
    }



	/**Returns auth status as true or false for page auth guards
	 */
	public getAuthStatus(): boolean {
		console.log(this.isAuthenticated);
		return this.isAuthenticated;
	}

	/**checks platform and returns as string 
	 * example: 'ios'
	*/
	public getPlatform():string{
		if (this.pltform.is('ios')) {
			return 'ios';
		}else if(this.pltform.is('android')) {
			return 'android';
		}else if(this.pltform.is('cordova')) {
			return 'cordova';
		}else{
			return 'web';
		}
		
	}

		/**updates user Document in firestore */ 
	public updateUser(user: ix.IUser, data:any){
            console.log(user);
            console.log(this.userID);
		return this.afstore.doc('people/' + user.uid).update(data);
	}

	/**Registers user for app */
	public doRegister(value: ix.IAccount): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(value.email, value.password)	
			.then(res => {
				const uidRes = res.uid;

				
				this.deviceType = this.getPlatform();
				console.error('platform', this.deviceType);

				if(this.deviceType === 'web'){
					window.localStorage.setItem('userToken',uidRes)
				}else{
                    this.localStorage.setItem('USER', {userToken: uidRes}).catch(err => console.error('set err', err));
					this.isAuthenticated = true;
					resolve(res);
				}

            }, err => reject(err))
		})
	}

	/**
	 * logs user in using firestore auth 
	 */
	public doLogin(value: ix.IAccount): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
				.then(() => {
					console.log('Logging in');
					firebase.auth().signInWithEmailAndPassword(value.email, value.password)
						.then(res => {

                            console.error(res.uid);
                            this.userID = res.uid;

							this.deviceType = this.getPlatform();
							console.error('platform', this.deviceType);

						}, err => reject(err))
				});
		});
	}

	public async nativeGoogleLogin(): Promise<void> {
		try{
			const googleUser = await this.gplus.login({
				//FIXME: REMOVE KEY BEFORE SUBMITTING TO PUBLIC REPO!!
				'webClientId': '557118430343-0vfmf920aell6rk0pscfpcoco6vk2nie.apps.googleusercontent.com',
				'offline': true,
				'scopes': 'profile email'
            });
			 return await this.afAuth.auth.signInWithCredential(
				 firebase.auth.GoogleAuthProvider.credential(googleUser.idToken)
			 )

		}catch(err){
			console.error('Native Login Error',err)

		}
	}

    /**
     * google login method for Web
     */
	public async webGoogleLogin(): Promise<void>{
		try{
			const provider = new firebase.auth.GoogleAuthProvider();
            await this.afAuth.auth.signInWithPopup(provider);
		}catch(err){
			console.error('web login error', err)
		}
	}

    /**
     * Logs User in using facebook api
     * */
    tryFacebookLogin() {
        return this.facebook.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => {
                // Build Firebase credential with the Facebook access token.
                var credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
                console.log('Logged into Facebook!', res)
            })
            .catch(e => console.log('Error logging into Facebook', e));


    }

    /**
     * Logs User in using facebook api
     * */
    tryTwitterLogin() {
        return this.twitter.login().then(this.onSuccess, this.onError);
    }

    onSuccess(response) {
        console.log('response', response);
        console.log(response.userName);
        console.log(response.userId);
        console.log(response.secret);
        console.log(response.token);
        const twitterCredential = firebase.auth.TwitterAuthProvider.credential(
            response.token,
            response.secret
        );
        return this.afAuth.auth
            .signInWithCredential(twitterCredential)
            .then(res => {
                this.user = res;
            })
            .catch(error => console.log("error", error));
    }

    onError(error) {
        console.error('twitter login error', error);
        return error

    }
	/**
	 * logs user out
	 */
	public doLogout(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.deviceType = this.getPlatform();
			if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut().catch(err => console.error('sign out err', err));

				this.isAuthenticated = false;
				if (this.deviceType === 'cordova'){
                    this.gplus.logout().catch(err => console.error('logout err', err));
                    this.facebook.logout().catch(err => console.error('facebook logout error', err));
				}
				if(this.deviceType === 'web'){
					window.localStorage.clear()
				}else{
                    this.localStorage.remove('USER').catch(err => console.error('user remove err', err))
				}
				resolve();
			}
			else {
				reject();
			}
		});
	}
	
	/**
	 * gets userProfile Data for profile page
	 * @param user 
	 */
    public getProfileData(user: firebase.User): Observable<UserProfile> {
		return this.profileData.getProfileData(user).map(profile => {
			return profile;
		});
	}


	// Abilities and Roles // 

	
	public canRead(user: ix.IUser): boolean{
        const allowed = ['user', 'pro', 'staff', 'admin'];
		return this.checkRoleAuth(user, allowed);
	}

	public canEdit(user: ix.IUser): boolean{
        const allowed = ['pro', 'staff', 'admin'];
		return this.checkRoleAuth(user, allowed);
	}

	public canDelete(user: ix.IUser): boolean{
        const allowed = ['staff', 'admin'];
		return this.checkRoleAuth(user, allowed);
	}
		/**
		 * Checks to see if the user has matching role
		 * @param user 
		 * @param allowedRoles 
		 */
	private checkRoleAuth(user: ix.IUser, allowedRoles: string[]):boolean{
            if (!user || !user.roles) return false;
		for (const role of allowedRoles){
			if (user.roles[role]){
				return true
			}
		}
		return false
	}

	
}
