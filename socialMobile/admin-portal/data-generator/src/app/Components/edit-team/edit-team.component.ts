import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray} from '@angular/forms';
import {TeamsService} from '../../Services/teams.service';
import {NavbarComponent} from '../navbar/navbar.component'; 
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {Observable} from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
//Interfaces
//import {EditPersonData} from '../../Interfaces/edit-person-data';
import {PropertyData} from '../../Interfaces/property-data';
import { EditTeam} from '../../Interfaces/editTeams';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})

export class EditTeamComponent implements OnInit {
  renderBoolArray: any =[];
  renderTxtArray: any =[];
  renderDoubleArray: any =[];
  renderPicArray: any =[];

  editTeam: EditTeam;
  controls:any;
  proper: any[] = [];
  propControllers: any[] = [];
  //propControllersName: any[] = [];
  teamEditForm: FormGroup;
  private sub: Subscription;
  private teamID;
  private navFlag = "editTeam"
  navbar = new NavbarComponent()
  get properties(): FormArray{
    return <FormArray>this.teamEditForm.get('properties')
  }

  constructor(
    private teamService: TeamsService, 
    private route: ActivatedRoute, 
    private router: Router,
    private fb: FormBuilder,  ) {}

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag);
    
     this.teamID = '';
    //Reads Id From Route
    this.sub = this.route.params.subscribe(
      params =>{
        this.teamID = params['teamID'];
        this.getTeam(this.teamID);
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
  createFormGroup(teamID){
    const teamEditForm = this.fb.group({
      teamID:teamID,
      properties: this.fb.array(this.propControllers)
    }); 
    return teamEditForm
  }

  addProps(prop): FormGroup{
   return this.fb.group({
      isBase64Encoded:false,
      propertyName: prop.propertyName,
      propertyURL: prop.propertyURL,
      propertyValue:prop.propertyValue,
      propertyType: prop.propertyType,
   });
  }

  getTeam(teamID: number): void {
    
    this.teamService.getEditTeam(teamID)
    .subscribe(
      (editTeam: EditTeam) => this.getFormControllers(editTeam) ,
      (error: any) => console.log(error)
    );
  }

  getFormControllers(editTeam: EditTeam): void{
    //console.log(editPerson);
    this.proper = editTeam.properties;
    console.log(this.proper);
    this.proper.forEach(prop => { 
      this.propControllers.push(this.addProps(prop))
    });
    this.teamEditForm = this.createFormGroup(this.teamID);
    this.saveForRender(this.teamEditForm);
  };

  saveEdit(){
    console.log(this.teamEditForm);
    let savePropList = [];
    let editTeamID = this.teamEditForm.value.teamID;
    let propList = (<FormArray>this.teamEditForm.controls['properties']).controls;
   propList.forEach(prop =>{
    
     if(prop.touched == true){
       console.log(prop);
       savePropList.push(prop.value)
     }
   })
    console.log(savePropList);
    this.saveTouched(editTeamID, savePropList);
    
  }
saveForRender(prop){
  let renderList = (<FormArray>this.teamEditForm.controls['properties']).controls;
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
  saveTouched(editTeamID, savePropList){
    savePropList.forEach(prop => {
      this.teamService.saveEditTeam(editTeamID, prop);
    });
  }

}

