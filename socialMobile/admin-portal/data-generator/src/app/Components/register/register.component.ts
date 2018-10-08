import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as int from '../../Interfaces/data-interfaces';
import {DataModelServiceService} from '../../data-model-service.service';
import {SetError} from '../../SetError';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private ds: DataModelServiceService,
    public Error: SetError
  ) {
    this.createForm();
    
   }

   ngOnInit(){
    const userIDControll = this.registerForm.get('email')
    userIDControll.valueChanges.subscribe(value => this.Error.setErrorMessage(userIDControll));


   }

   createForm() {
     this.registerForm = this.fb.group({
        email: ['', Validators.required, Validators.email ],
        password: ['',Validators.required],
        uid:['',],
        username:['',],
        first_name:['',],
        last_name:[''],
        phone:[''],
        height:[''],
        weight:[''],
        isMemberOf:[true] ,
        isStaffOf: [true],
        gymID:['303'],
     });
   }

   tryFacebookLogin(){
     this.authService.doFacebookLogin()
     .then(res =>{
       this.router.navigate(['/home']);
     }, err => console.log(err)
     )
   }

   tryTwitterLogin(){
     this.authService.doTwitterLogin()
     .then(res =>{
       this.router.navigate(['/home']);
     }, err => console.log(err)
     )
   }

   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/home']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     console.log(value)
     let initUser = this.ds.newPerson();
     this.authService.doRegister(value)
     .then(res => {
       let formData  = Object.assign(<int.NewUser>{}, initUser, this.registerForm.value);
        console.log(res.uid);
        formData.uid = res.uid;
        console.log(formData);
       this.authService.updateNewUser(formData);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

}
