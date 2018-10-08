import {Component} from '@angular/core';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {NavController, Platform} from "ionic-angular";

/**
 * Generated class for the FacebookLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'facebook-login',
    templateUrl: 'facebook-login.html'
})
export class FacebookLoginComponent {

    text: string;

    constructor(public authService: AuthServiceProvider, public platform: Platform, public navCtrl: NavController,) {

    }

    tryFacebookLogin() {
        this.authService.tryFacebookLogin()
            .then(res => {
                console.log(res);
                this.navCtrl.setRoot('Dashboard').catch(err => console.error('nav err', err));
            })
    }
}
