import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {NavbarComponent} from '../navbar/navbar.component'; 
import {PersonInst} from '../../Models/personInst.model';
import {PropertiesService} from '../../Services/properties.service';
import {AddProperties} from '../../Models/addProperty.model';
import {CreateProperties} from '../../Models/createProperty.model';

import {ErrorMessages} from '../../ErrorMessages';
import {SetError} from '../../SetError';
import {DataObjects} from '../../DataObjects';

@Component({
  selector: 'app-new-person-property',
  templateUrl: './new-person-property.component.html',
  styleUrls: ['./new-person-property.component.css']
})
export class NewPersonPropertyComponent implements OnInit {
  createProps = new CreateProperties(" ", " ", " ", " ")
  addPropType = ["txt",  "png",  "gif",  "jpg",  "json",  "bool",  "int",  "double"]
  propRealmType = ["person","chat","feed","arena","post","device","team","gym",]
  createProperty: FormGroup
  newProperty = this.dataObjects.newProperty();

  //navBar State
  private navFlag = "createProp"
  navbar = new NavbarComponent()
  constructor(
    private propertyService:PropertiesService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    public Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.navbar.setNavFlag(this.navFlag);
    this.createProperty = this.fb.group({
      propName: ['',[Validators.required, Validators.minLength(3)]],
      realm:['',[Validators.required]],
      type:['',[Validators.required]],
      description: ['',[Validators.required, Validators.minLength(3)]],
      
    })

    //Form Watchers
    //CREATING A PERSON FORM//
    const propNameControll = this.createProperty.get('propName')
    propNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(propNameControll));

    const propRealmControll = this.createProperty.get('realm')
    propRealmControll.valueChanges.subscribe(value => this.Error.setErrorMessage(propRealmControll));

    const propTypeControll = this.createProperty.get('type')
    propTypeControll.valueChanges.subscribe(value => this.Error.setErrorMessage(propTypeControll));

    const propDescriptionControll = this.createProperty.get('type')
    propDescriptionControll.valueChanges.subscribe(value => this.Error.setErrorMessage(propDescriptionControll));
  }

  async createNewProperty(){
    let data = Object.assign({}, this.newProperty, this.createProperty.value);
    console.log(data);
    this.propertyService.saveNewProperty(data);
  }

}
