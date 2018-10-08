import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {PersonInst} from '../../Models/personInst.model';
import {TeamsService} from '../../Services/teams.service';
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
  selector: 'app-teams-data',
  templateUrl: './teams-data.component.html',
  styleUrls: ['./teams-data.component.css']
})
export class TeamsDataComponent implements OnInit {
  //Form Modles
  teamForm: FormGroup;
  createTeamForm: FormGroup;
  //Init of person and property instances TODO: (Delete What is not needed)
  person = new PersonInst("",""," ","","",0,0,"",false,false,false,"","","","");
  createProps = new CreateProperties(" ", " ", " ", " ")
  //customProps = new AddPersonProperties(true, true, true, true, true)
  //newProps = new AddProperties(" ", " ", " ", " ", false)
  
  // Properties Init TODO: (Delete What is not needed)

  addPropType = ["txt",  "png",  "gif",  "jpg",  "json",  "bool",  "int",  "double"]
  propRealmType = ["person","chat","feed","arena","post","device","team","gym",]
  
  initPerson =this.dataObjects.initalizePersonProperties();
  newTeam = this.dataObjects.newTeam();
  
  //Init of Array of properties being used TODO: (Delete What is not needed)
  personProp: any = [];
  teamDBList=[];
  addProperties : any = [];
  propsToApi : any = [];
  personID;
  propName;
  propType;
  propValue;
  teamData:any;
  initTeamArray:any =[];
  editTeamArray: any = [];
  //navBar State
  private navFlag = "teams"
  navbar = new NavbarComponent()
  constructor(
    private teamService:TeamsService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    private Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ){}

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag);
    this.getAllTeams();
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
        this.teamForm.patchValue({
        avatar: reader.result
      });
      // need to run CD since file load runs outside of zone
      this.cd.markForCheck();
      };
    }
  }

  async getAllTeams(){
    this.teamDBList = [];
    this.initTeamArray = [];
    this.editTeamArray = [];
    let jData = await this.teamService.getTeamData();
    let jsonData = await jData.json();
    console.log(jsonData);
    this.teamDBList = jsonData;
    //this.loopGymDB();
    this.convertToCSV(jsonData);
  }

  async loopTeamDB(){
    this.teamDBList.forEach(team => {
      //console.log(person)
      this.teamService.getEditTeam(team.teamID)
      .subscribe(
      (initialTeam) => this.sortTeam(initialTeam) ,
      (error: any) => console.log(error)
      );
    })
    
  }

  sortTeam(initialTeam){
    if(initialTeam.properties.length == 0){
      this.initTeamArray.push(initialTeam);
    }else{
      this.editTeamArray.push(initialTeam);
    }
    console.log("edit team array " );
    console.log(this.editTeamArray)
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

  async getEditTeam(teamEdit,teamID){
    console.log(this.editTeamArray);
    this.teamData = await this.teamService.getEditTeam(teamID)
  }

}
