import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
    selector: 'page-friend-invite',
    templateUrl: 'friend-invite.html',
    providers: [AuthServiceProvider]
})
export class FriendInvitePage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loading: LoadingController,
        public auth: AuthServiceProvider,
    ) {
    }

    ngOnInit() {
        this.presentLoading()
    }

    presentLoading(): void {
        const loader = this.loading.create({
            content: "Please wait...",
            duration: 500,
            spinner: 'bubbles'
        });
        loader.present().catch(err => console.error('loader err', err));
    }

    ionViewCanEnter(): boolean {
        let authStatus = this.auth.getAuthStatus();
        if (authStatus === true) {
            return this.auth.getAuthStatus();
        } else {
            this.navCtrl.setRoot('LoginPage').catch(err => console.error('nav err', err));
        }

    }

    toFriendsList(): void {
        this
            .navCtrl
            .setRoot("FriendsListPage").catch(err => console.error('nav err', err));
    }

}
