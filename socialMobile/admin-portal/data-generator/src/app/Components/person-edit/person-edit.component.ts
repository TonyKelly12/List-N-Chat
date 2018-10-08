import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray} from '@angular/forms';
import {PersonService} from '../../Services/person-service.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
//Interfaces
import {EditPersonData} from '../../Interfaces/edit-person-data';
import {PropertyData} from '../../Interfaces/property-data';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, AfterViewInit, OnDestroy {
  
  renderBoolArray: any =[];
  renderTxtArray: any =[];
  renderDoubleArray: any =[];
  renderPicArray: any =[];

  editPerson: EditPersonData;
  controls:any;
  proper: any[] = [];
  propControllers: any[] = [];
  //propControllersName: any[] = [];
  personEditForm: FormGroup;
  private sub: Subscription;
  private userID;
  
  get properties(): FormArray{
    return <FormArray>this.personEditForm.get('properties')
  }

  constructor(
    private ps: PersonService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,  ) {}

  ngOnInit() {
     this.userID = '';
    //Reads Id From Route
    this.sub = this.route.params.subscribe(
      params =>{
        this.userID = params['userID'];
        this.getUser(this.userID);
      }
    ); 
  }

  ngAfterViewInit(){
   
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  trackByFn(index: any, item: any) {
    return index;
 }
  createFormGroup(userID){
    const editPerson = this.fb.group({
      personID:userID,
      properties: this.fb.array(this.propControllers)
    }); 
    return editPerson
  }

  addProps(prop): FormGroup{
   return this.fb.group({
      isBase64Encoded:false,
      propertyName: prop.propertyName,
      propertyURL: prop.propertyURL,
      propertyValue:prop.propertyValue,
      type: prop.type,
   });
  }

  getUser(userID: number): void {
    this.ps.getEditUser(userID)
    .subscribe(
      (editPerson: EditPersonData) => this.getFormControllers(editPerson) ,
      (error: any) => console.log(error)
    );
  }

  getFormControllers(editPerson: EditPersonData): void{
    //console.log(editPerson);
    this.proper = editPerson.properties;
    //console.log(this.proper);
    this.proper.forEach(prop => { 
      this.propControllers.push(this.addProps(prop))
    });
    this.personEditForm = this.createFormGroup(this.userID);
    this.saveForRender(this.personEditForm);
  };

  saveEdit(){
    console.log(this.personEditForm);
    let savePropList = [];
    let editUserID = this.personEditForm.value.personID;
    let propList = (<FormArray>this.personEditForm.controls['properties']).controls;
   propList.forEach(prop =>{
    
     if(prop.touched == true){
       console.log(prop);
       savePropList.push(prop.value)
     }
   })
    console.log(savePropList);
    this.saveTouched(editUserID, savePropList);
    
  }
saveForRender(prop){
  let renderList = (<FormArray>this.personEditForm.controls['properties']).controls;
  renderList.forEach(prop =>{
    if(prop.value.type == "BOOL"){
      console.log(prop);
      this.renderBoolArray.push(prop)
    }
    if(prop.value.type == "TXT"){
      console.log(prop);
      this.renderTxtArray.push(prop)
    }
    if(prop.value.type == "DOUBLE"){
      console.log(prop);
      this.renderDoubleArray.push(prop)
    }
    if(prop.value.type == "PNG" || prop.value.type == "JPG"){
      console.log(prop);
      this.renderPicArray.push(prop)
    }

    
  })
console.log(prop)
}
  saveTouched(editUserID, savePropList){
    savePropList.forEach(prop => {
      this.ps.saveEditUser(editUserID, prop);
    });
    this.router.navigate(['/person'])
  }
  
}
