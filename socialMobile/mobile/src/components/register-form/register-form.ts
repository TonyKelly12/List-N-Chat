import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {DataModelServiceService} from "../../providers/data-objects/data-objects";
import {SetError} from "../../providers/set-errors/set-errors";

@Component({
    selector: 'register-form',
    templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        public authService: AuthServiceProvider,
        private fb: FormBuilder,
        private ds: DataModelServiceService,
        public Error: SetError,
    ) {


    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6),
                Validators.maxLength(25),
                Validators.required
            ]],

        });

    }

    get email() {
        return this.registerForm.get('email')
    };

    get password() {
        return this.registerForm.get('password')
    };

    tryRegister() {
        let newUser = this.ds.newUser();
        newUser.email = this.email.value;
        newUser.password = this.password.value;
        this.authService.doRegister(newUser)
            .then(res => {
                console.log(res);
                this.errorMessage = "";
                this.successMessage = "Your account has been created";
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = "";
            })
    }

}
