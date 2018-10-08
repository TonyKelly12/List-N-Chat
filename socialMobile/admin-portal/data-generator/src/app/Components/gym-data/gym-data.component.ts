import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {PersonInst} from '../../Models/personInst.model';
import {GymService} from '../../Services/gym.service';
import {AddProperties} from '../../Models/addProperty.model';
import {CreateProperties} from '../../Models/createProperty.model';
import {NavbarComponent} from '../navbar/navbar.component'; 
import {ErrorMessages} from '../../ErrorMessages';
import {SetError} from '../../SetError';
import {DataObjects} from '../../DataObjects';

import {MatButtonModule, MatCheckboxModule,MatFormFieldModule} from '@angular/material';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");
let newPersonRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/new";
let getPersons = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons?startIndex=0&maxResults" +
    "=20";

let personList = [];
let finalCSV;
let fileUploaded = false;
@Component({
  selector: 'app-gym-data',
  templateUrl: './gym-data.component.html',
  styleUrls: ['./gym-data.component.css']
})
export class GymDataComponent implements OnInit {
    //Form Modles
    personForm: FormGroup;
    createPersonForm: FormGroup;
    //Init of person and property instances TODO: (Delete What is not needed)
    person = new PersonInst("",""," ","","",0,0,"",false,false,false,"","","","");
    createProps = new CreateProperties(" ", " ", " ", " ")
    //customProps = new AddPersonProperties(true, true, true, true, true)
    //newProps = new AddProperties(" ", " ", " ", " ", false)
    
    // Properties Init TODO: (Delete What is not needed)
  
    addPropType = ["txt",  "png",  "gif",  "jpg",  "json",  "bool",  "int",  "double"]
    propRealmType = ["person","chat","feed","arena","post","device","team","gym",]
    
    initPerson =this.dataObjects.initalizePersonProperties();
    newGym = this.dataObjects.newGym();
    
    //Init of Array of properties being used TODO: (Delete What is not needed)
    personProp: any = [];
    gymDBList=[];
    addProperties : any = [];
    propsToApi : any = [];
    personID;
    propName;
    propType;
    propValue;
    gymData:any;
    initGymArray:any =[];
    editGymArray: any = [];
    //navBar State
    private navFlag = "gyms"
    navbar = new NavbarComponent()
    constructor(
      private gymService:GymService, 
      private fb: FormBuilder, 
      private errorMessage: ErrorMessages, 
      public Error:SetError,
      private dataObjects: DataObjects,
      private cd: ChangeDetectorRef,
      private modalService: NgbModal
    ){}
  
    ngOnInit() {
      this.navbar.setNavFlag(this.navFlag);
      this.getAllGyms();
    }  
    
    openModal(id) {
      let modal = document.getElementById(id);
      modal.style.display = 'block';
    }
  
    closeModal(id) {
      let modal = document.getElementById(id);
      modal.style.display = 'none';
  
    }
  
    handleFiles(event) {
      console.log('handle ran')
      if (event) {
        let file = event.target.files[0]
        let reader = new FileReader();
  
        reader.readAsText(file);
        reader.onload = this.loadHandler;
        reader.onerror = this.errorHandler;
  
        fileUploaded = true;
      } else {
        alert('FileReader not supporterd');
      }
  
    }
  
    //TODO: FIx this to prop handel csv backup
    loadHandler(event) {
      let csv = event.target.result;
      let textLines = csv.split(/\r\n|\n/);
      for (let i = 0; i < textLines.length; i++) {
        let textRow = textLines[i].split(';'); //CSV splits each row with ;
        let row = [];
        let col = [];
        
        for (let j = 0; j < textRow.length; j++) {
          let field = textRow[j].split(',');
          row.push(field); // Creates the Row array with individual fields indexs
          // Row Label at index[0]
          personList.push(row); //pushes each row to the personList
        }
        console.log(personList);
      }
    }
  
    errorHandler(event) {
      if (event.target.error.name == "NotReadableError") {
        alert('Cannot read File');
      }
    }
  
  
  
    
 
    setAvatar(avatar) {
      let reader = new FileReader();
      if(avatar.target.files && avatar.target.files.length) {
        const [file] = avatar.target.files;
        //TODO: if broken change back to read as dataURL
        reader.readAsBinaryString(file);
        reader.onload = () => {
          this.personForm.patchValue({
          avatar: reader.result
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        };
      }
    }
  
    async getAllGyms(){
      this.gymDBList = [];
      this.initGymArray = [];
      this.editGymArray = [];
      let jData = await this.gymService.getGymsData();
      let jsonData = await jData.json();
      console.log(jsonData);
      this.gymDBList = jsonData;
      //this.loopGymDB();
      this.convertToCSV(jsonData);
    }
  
    async loopGymDB(){
      this.gymDBList.forEach(gym => {
        //console.log(person)
        this.gymService.getEditGym(gym.gymID)
        .subscribe(
        (initialGym) => this.sortGym(initialGym) ,
        (error: any) => console.log(error)
        );
      })
      
    }
  
    sortGym(initialGym){
      if(initialGym.properties.length == 0){
        this.initGymArray.push(initialGym);
      }else{
        this.editGymArray.push(initialGym);
      }
      console.log("edit person array " );
      console.log(this.editGymArray)
    }
  
    convertToCSV(jsonData){   
      var fields = Object.keys(jsonData[0])
      var replacer = function (key, value) {
        return value === null
          ? ''
          : value
      }
      var csv = jsonData.map(function (row) {
        return fields.map(function (fieldName) {
          return JSON.stringify(row[fieldName], replacer)
        }).join(',')
      })
      csv.unshift(fields.join(',')) // add header column
      //console.log(csv.join('\r\n'))
      finalCSV = csv.join('\r\n')  
    }
    //TODO: Make this function reload a backup csv instead of randomize
    CSVDownload(){
      let fileName = 'personsBackup.csv'
      if (!finalCSV.match(/^data:text\/csv/i)) {
        finalCSV = 'data:text/csv;charset=utf-8,' + finalCSV;
      }
      let data = encodeURI(finalCSV);
  
      let link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', fileName);
      link.click();
    }
  
    async getEditGym(gymEdit,gymID){
      console.log(this.editGymArray);
      this.gymData = await this.gymService.getEditGym(gymID)
    }
  
  }
  