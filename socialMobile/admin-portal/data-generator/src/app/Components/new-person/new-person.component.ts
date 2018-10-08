import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from '../navbar/navbar.component'; 
import {PersonInst} from '../../Models/personInst.model';
import {PersonService} from '../../Services/person-service.service';
import {AddProperties} from '../../Models/addProperty.model';
import {CreateProperties} from '../../Models/createProperty.model';

import {ErrorMessages} from '../../ErrorMessages';
import {SetError} from '../../SetError';
import {DataObjects} from '../../DataObjects';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");
let newPersonRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/new";
let getPersons = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons?startIndex=0&maxResults" +
    "=20";

let personList = [];
let finalCSV;
let fileUploaded = false;

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {
  createPersonForm: FormGroup;
  newPerson = this.dataObjects.intitPerson();
  passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  phoneValidation = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  private navFlag = "registerPerson"
  navbar = new NavbarComponent()
  constructor(
    private personService:PersonService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    public Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag)
    this.createPersonForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.pattern(this.passwordValidation)]],
      phone:['',[Validators.required, Validators.pattern(this.phoneValidation)]]
    })
    
        //CREATING A PERSON FORM//
        const emailControll = this.createPersonForm.get('email')
        emailControll.valueChanges.subscribe(value => this.Error.setErrorMessage(emailControll));
    
        const passwordControll = this.createPersonForm.get('password')
        passwordControll.valueChanges.subscribe(value => this.Error.setErrorMessage(passwordControll));
    
        const phoneControll = this.createPersonForm.get('phone')
        phoneControll.valueChanges.subscribe(value => this.Error.setErrorMessage(phoneControll));
    
  }

  

  async createNewPerson(){
    let data = Object.assign({}, this.newPerson, this.createPersonForm.value);
    console.log(data);
    this.personService.createPersonPost(data);
  }

}
