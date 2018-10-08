import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {PersonInst} from '../../Models/personInst.model';
import {PersonService} from '../../Services/person-service.service';
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

@Component({selector: 'app-person-data', templateUrl: './person-data.component.html', styleUrls: ['./person-data.component.css']})

export class PersonDataComponent implements OnInit {
  //Form Modles
  personForm: FormGroup;
  createPersonForm: FormGroup;
  //Init of person and property instances TODO: (Delete What is not needed)
  person = new PersonInst("",""," ","","",0,0,"",false,false,false,"","","","");
  createProps = new CreateProperties(" ", " ", " ", " ")
  //customProps = new AddPersonProperties(true, true, true, true, true)
  //newProps = new AddProperties(" ", " ", " ", " ", false)
  
  // Properties Init TODO: (Delete What is not needed)
  userID = new AddProperties("","userID","txt","",false)
  username = new AddProperties("","username","txt","",false)
  firstname = new AddProperties("","firstName","txt","",false)
  lastname = new AddProperties("","lastName","txt","",false)
  weight_in_kg= new AddProperties("","weight_in_kg","double","",false)
  height_in_cm = new AddProperties(" ","height_in_cm","double","",false)
  favoritequote = new AddProperties(" ","favoritequote","txt","",false)
  profilevisibility = new AddProperties(" ","profilevisibility","txt","",false)
  addPropType = ["txt",  "png",  "gif",  "jpg",  "json",  "bool",  "int",  "double"]
  propRealmType = ["person","chat","feed","arena","post","device","team","gym",]
  profileOptions : any = ["public", "friends", "private"];
  initPerson =this.dataObjects.initalizePersonProperties();
  newPerson = this.dataObjects.intitPerson();
  
  //Init of Array of properties being used TODO: (Delete What is not needed)
  personProp: any = [];
  personDBList=[];
  addProperties : any = [];
  propsToApi : any = [];
  personID;
  propName;
  propType;
  propValue;
  personData:any;
  initPersonArray:any =[];
  editPersonArray: any = [];
  //navBar State
  private navFlag = "editPerson"
  navbar = new NavbarComponent()
  constructor(
    private personService:PersonService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    public Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ){}

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag);
 
    this.personForm = this.fb.group({
      userID: ['',[Validators.required, Validators.minLength(2)]],
      username:['',[Validators.required, Validators.minLength(3)]],
      firstname:['',[Validators.required, Validators.minLength(2)]],
      lastname: ['',[Validators.required, Validators.minLength(2)]],
      weight_in_kg: ['',[Validators.required, Validators.min(34.0194)]],
      height_in_cm: ['',[Validators.required, Validators.min(91.44)]],
      favoritequote: ['',[Validators.minLength(3)]],
      profilevisibility: ['',[Validators.required]],
      avatar:[this.initPerson.avatar]
    })
    
    //ADDING PROPS TO PERSON FORM//
    const userIDControll = this.personForm.get('userID')
    userIDControll.valueChanges.subscribe(value => this.Error.setErrorMessage(userIDControll));

    const firstNameControll = this.personForm.get('firstname')
    firstNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(firstNameControll));
    
    const lastNameControll = this.personForm.get('lastname')
    lastNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(lastNameControll));

    const usernameControll = this.personForm.get('username')
    usernameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(usernameControll));

    const weightControll = this.personForm.get('weight_in_kg')
    weightControll.valueChanges.subscribe(value => this.Error.setErrorMessage(weightControll));
    
    const heightControll = this.personForm.get('height_in_cm')
    heightControll.valueChanges.subscribe(value => this.Error.setErrorMessage(heightControll));

    const quoteControll = this.personForm.get('favoritequote')
    quoteControll.valueChanges.subscribe(value => this.Error.setErrorMessage(quoteControll));
    
    const profileControll = this.personForm.get('profilevisibility')
    profileControll.valueChanges.subscribe(value => this.Error.setErrorMessage(profileControll));

    this.getAllPersons();
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

  randomizePerson() {
    console.log(personList)
    if (!fileUploaded) {
      console.log('!fileUploaded')
    } else if (personList.length === 0) {
      console.log('emptyList');
    } else {
      console.log(personList[0][0][0]); //the way it was parsed caused an extra
      // array to be created. middle will always be [0]

      let personProps = [];
      let currentProp;

      for (let i = 0; i < personList.length; i++) {

        let currentRow = personList[i][0];
        //console.log(currentRow);

        let min = 1;
        let max = currentRow.length;
        let propIndex = Math.floor(Math.random() * (max - min - 1)) + min;

        //console.log(propIndex);
        currentProp = currentRow[propIndex];
        //console.log(currentProp);
        personProps.push(currentProp);
      }
      console.log(personProps);

      this.createPerson(personProps);
    }
  }

  createPerson(personProps) {
    this.person.pword = personProps[0];
    this.person.firstname = personProps[1];
    this.person.lastname = personProps[2];
    this.person.phone = personProps[3];
    this.person.username = personProps[4];
    this.person.weight_in_kg = personProps[5];
    this.person.height_in_cm = personProps[6];
    this.person.favoritequote = personProps[7];
    this.person.email = personProps[8];

    this.personForm.patchValue({
      firstname: this.person.firstname ,
      lastname: this.person.lastname ,
      username: this.person.username ,
      weight_in_kg: this.person.weight_in_kg,
      height_in_cm: this.person.height_in_cm,
      favoritequote: this.person.favoritequote,
      profilevisibility:'friends'
    })

    this.personProp =  Object.keys(this.person).map(e =>{
      let prop = `${e}`
      console.log(prop)
      this.personProp.push(prop) 
      console.log(this.personProp);
    } );
    console.log(this.person);
  }

  userProfile(event : any) {
    this.person.profilevisibility = event.target.value;
    console.log(this.person.profilevisibility);
    let profilevisibility = this.person.profilevisibility
    this.addProperties.push(profilevisibility)
  }
 
  async createNewPerson(){
    let data = Object.assign({}, this.newPerson, this.createPersonForm.value);
    console.log(data);
    this.personService.createPersonPost(data);
  }
  
  async userProperties() {
    //creates init person data object
    
    //maps form data submitted to initial person object
    let formData = Object.assign({}, this.initPerson, this.personForm.value);
    //adds user id to object designed to send to have everything
    //needed to make api call. Change here to match your server.
    let serverData = {
      userID:["txt",formData.userID, ],
      firstname:["txt",formData.userID, ],
      lastname:["txt",formData.userID, ],
      favoritequote:["txt",formData.userID, ],
      username:["txt",formData.userID, ],
      profilevisibility:["txt",formData.userID, ],
      weight_in_kg:["double",formData.userID,],
      height_in_cm:["double",formData.userID,],
      avatar:["png",formData.userID,]
      };

      //loops through formData object and gets prop names and values
      // and assigns them to the serverData object used to make api call
    Object.keys(formData).map(async e =>{
      let prop = `${e}`
      let value = `${formData[e]}`.toString()
      console.log( prop + '= ' + value)
      serverData[prop][2] = value
      serverData[prop][3] = prop 
    } );  
    //call to the person Service which makes http request
    this.personService.addPropApiCall(serverData)
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

  async getAllPersons(){
    this.personDBList = [];
    this.initPersonArray = [];
    this.editPersonArray = [];
    let jData = await this.personService.getPersonsData();
    let jsonData = await jData.json();
    console.log(jsonData);
    this.personDBList = jsonData;
    this.loopUsersDB();
    this.convertToCSV(jsonData);
  }

  async loopUsersDB(){
    this.personDBList.forEach(person => {
      //console.log(person)
      this.personService.getEditUser(person.personID)
      .subscribe(
      (initialPerson) => this.sortPerson(initialPerson) ,
      (error: any) => console.log(error)
      );
    })
    
  }

  sortPerson(initialPerson){
    if(initialPerson.properties.length == 0){
      this.initPersonArray.push(initialPerson);
    }else{
      this.editPersonArray.push(initialPerson);
    }
    console.log("edit person array " );
    console.log(this.editPersonArray)
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
  CSVDownload(filename){
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

  async getEditPerson(personEdit,userID){
    //console.log(this.personData);
    this.personData = await this.personService.getEditUser(userID)
  }

}
