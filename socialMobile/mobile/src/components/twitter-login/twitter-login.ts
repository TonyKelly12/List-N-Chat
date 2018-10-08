import {Component} from '@angular/core';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {NavController, Platform} from "ionic-angular";


@Component({
    selector: 'twitter-login',
    templateUrl: 'twitter-login.html'
})
export class TwitterLoginComponent {

    text: string;

    constructor(public authService: AuthServiceProvider, public platform: Platform, public navCtrl: NavController,) {
        console.log('Hello TwitterLoginComponent Component');
        this.text = 'Hello World';
    }

    tryTwitterLogin() {
        this.authService.tryTwitterLogin()
            .then(res => {
                console.log(res);

                this.navCtrl.setRoot('Dashboard').catch(err => console.error('nav err', err));
            })
    }
}
