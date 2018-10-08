import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController, NavParams, Platform} from "ionic-angular";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {NativeStorage} from "@ionic-native/native-storage";

@Component({
    selector: 'login-form',
    templateUrl: 'login-form.html'
})
export class LoginFormComponent {

    private loginForm: FormGroup;
    private errorMessage: string = '';
    private errorMessageTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public authService: AuthServiceProvider,
        public storage: NativeStorage,
        public fb: FormBuilder,
        public platform: Platform
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    tryLogin(value): void {
        this.authService.doLogin(value)
            .then(res => {
                console.log(res);

                this.navCtrl.setRoot('Dashboard').catch(err => console.error('nav err', err));
            }, err => {
                this.setError(err.message);
            })
    }

    private setError(message: string): void {
        this.errorMessage = message;
        this.errorMessageTO = setTimeout(() => {
                this.errorMessage = ''
            },
        );
    }

}
