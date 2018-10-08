import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from '../navbar/navbar.component'; 
import {PersonInst} from '../../Models/personInst.model';
import {GymService} from '../../Services/gym.service';
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
  selector: 'app-new-gym',
  templateUrl: './new-gym.component.html',
  styleUrls: ['./new-gym.component.css']
})
export class NewGymComponent implements OnInit {
  createGymForm: FormGroup;
  newGym = this.dataObjects.newGym();
  phoneValidation = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  private navFlag = "newGym"
  navbar = new NavbarComponent()
  constructor(
    private gymService:GymService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    public  Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag)
    this.createGymForm = this.fb.group({
      longName:['',[Validators.required]],
      shortName:['',[Validators.required]],
      phoneNumber:['',[Validators.required, Validators.pattern(this.phoneValidation)]],
      streetAddress:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      zipCode:['',[Validators.required]],
      country:['',[Validators.required]],
    })
    
        //CREATING A PERSON FORM//
        const longNameControll = this.createGymForm.get('longName')
        longNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(longNameControll));
    
        const shortNameControll = this.createGymForm.get('shortName')
        shortNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(shortNameControll));
    
        const phoneNumberControll = this.createGymForm.get('phoneNumber')
        phoneNumberControll.valueChanges.subscribe(value => this.Error.setErrorMessage(phoneNumberControll));

        const streetAddressControll = this.createGymForm.get('streetAddress')
        streetAddressControll.valueChanges.subscribe(value => this.Error.setErrorMessage(streetAddressControll));

        const cityControll = this.createGymForm.get('city')
        cityControll.valueChanges.subscribe(value => this.Error.setErrorMessage(cityControll));

        const stateControll = this.createGymForm.get('state')
        stateControll.valueChanges.subscribe(value => this.Error.setErrorMessage(stateControll));

        const zipCodeControll = this.createGymForm.get('zipCode')
        zipCodeControll.valueChanges.subscribe(value => this.Error.setErrorMessage(zipCodeControll));

        const countryControll = this.createGymForm.get('phoneNumber')
        countryControll.valueChanges.subscribe(value => this.Error.setErrorMessage(countryControll));
    
  }

  

  async createNewGym(){
    let data = Object.assign({}, this.newGym, this.createGymForm.value);
    console.log(data);
    this.gymService.createGym(data);
  }

}
