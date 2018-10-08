import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray} from '@angular/forms';
import {GymService} from '../../Services/gym.service';
import {NavbarComponent} from '../navbar/navbar.component'; 
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
//Interfaces
//import {EditPersonData} from '../../Interfaces/edit-person-data';
import {PropertyData} from '../../Interfaces/property-data';
import { EditGym } from '../../Interfaces/edit-gym';

@Component({
  selector: 'app-edit-gym',
  templateUrl: './edit-gym.component.html',
  styleUrls: ['./edit-gym.component.css']
})
export class EditGymComponent implements OnInit {
 
  renderBoolArray: any =[];
  renderTxtArray: any =[];
  renderDoubleArray: any =[];
  renderPicArray: any =[];

  editGym: EditGym;
  controls:any;
  proper: any[] = [];
  propControllers: any[] = [];
  //propControllersName: any[] = [];
  gymEditForm: FormGroup;
  private sub: Subscription;
  private gymID;
  private navFlag = "editGym"
  navbar = new NavbarComponent()
  get properties(): FormArray{
    return <FormArray>this.gymEditForm.get('properties')
  }

  constructor(
    private gymService: GymService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,  ) {}

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag);
    
     this.gymID = '';
    //Reads Id From Route
    this.sub = this.route.params.subscribe(
      params =>{
        this.gymID = params['gymID'];
        this.getGym(this.gymID);
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
  createFormGroup(gymID){
    const gymEditForm = this.fb.group({
      gymID:gymID,
      properties: this.fb.array(this.propControllers)
    }); 
    return gymEditForm
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

  getGym(gymID: number): void {
    
    this.gymService.getEditGym(gymID)
    .subscribe(
      (editGym: EditGym) => this.getFormControllers(editGym) ,
      (error: any) => console.log(error)
    );
  }

  getFormControllers(editGym: EditGym): void{
    //console.log(editPerson);
    this.proper = editGym.properties;
    console.log(this.proper);
    this.proper.forEach(prop => { 
      this.propControllers.push(this.addProps(prop))
    });
    this.gymEditForm = this.createFormGroup(this.gymID);
    this.saveForRender(this.gymEditForm);
  };

  saveEdit(){
    console.log(this.gymEditForm);
    let savePropList = [];
    let editGymID = this.gymEditForm.value.gymID;
    let propList = (<FormArray>this.gymEditForm.controls['properties']).controls;
   propList.forEach(prop =>{
    
     if(prop.touched == true){
       console.log(prop);
       savePropList.push(prop.value)
     }
   })
    console.log(savePropList);
    this.saveTouched(editGymID, savePropList);
    
  }
saveForRender(prop){
  let renderList = (<FormArray>this.gymEditForm.controls['properties']).controls;
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
      this.gymService.saveEditGym(editUserID, prop);
    });
  }

}

