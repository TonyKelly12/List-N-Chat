import {Component} from '@angular/core';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {NavController, Platform} from "ionic-angular";

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'google-login',
    templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

    text: string;

    constructor(public authService: AuthServiceProvider, public platform: Platform, public navCtrl: NavController,) {

    }

    tryGoogleLogin() {
        if (this.platform.is('cordova')) {
            this.authService.nativeGoogleLogin()
                .then(() => {

                    this.navCtrl.setRoot('Dashboard').catch(err => {
                        console.error('nav err', err)
                    });
                })
        } else {
            this.authService.webGoogleLogin().catch(err => {
                console.error('web google err', err)
            });
        }

    }
}
