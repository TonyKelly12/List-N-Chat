import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation, Injector} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {AddPersonProperties} from '../../Models/personProperties.model';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from '../navbar/navbar.component'; 
import {PersonInst} from '../../Models/personInst.model';
import {TeamsService} from '../../Services/teams.service';
import {AddProperties} from '../../Models/addProperty.model';
import {CreateProperties} from '../../Models/createProperty.model';

import {ErrorMessages} from '../../ErrorMessages';
import {SetError} from '../../SetError';
import {DataObjects} from '../../DataObjects';
import { validateConfig } from '@angular/router/src/config';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");
let newTeamRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/new";
let getTeams = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons?startIndex=0&maxResults" +
    "=20";

let teamsList = [];
let finalCSV;
let fileUploaded = false;

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {
  createTeamsForm: FormGroup;
  newTeam = this.dataObjects.newTeam();
  passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  phoneValidation = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  private navFlag = "newTeam"
  navbar = new NavbarComponent()
  constructor(
    private teamsService:TeamsService, 
    private fb: FormBuilder, 
    private errorMessage: ErrorMessages, 
    public Error:SetError,
    private dataObjects: DataObjects,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.navbar.setNavFlag(this.navFlag)
    this.createTeamsForm = this.fb.group({
      contextID:['',[Validators.required, Validators.required]],
      teamName:['',[Validators.required, Validators.email]],
      teamPurpose:['',[Validators.required,Validators.pattern(this.passwordValidation)]],
      feedName:['',[Validators.required, Validators.pattern(this.phoneValidation)]],
      feedPurpose:['',[Validators.required]]
    })
    
        //CREATING A PERSON FORM//
        const contextControll = this.createTeamsForm.get('contextID')
        contextControll.valueChanges.subscribe(value => this.Error.setErrorMessage(contextControll));

        const teamNameControll = this.createTeamsForm.get('teamName')
        teamNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(teamNameControll));
    
        const teamPurposeControll = this.createTeamsForm.get('teamPurpose')
        teamPurposeControll.valueChanges.subscribe(value => this.Error.setErrorMessage(teamPurposeControll));
    
        const feedNameControll = this.createTeamsForm.get('feedName')
        feedNameControll.valueChanges.subscribe(value => this.Error.setErrorMessage(feedNameControll));
        
        const feedPurposeControll = this.createTeamsForm.get('feedPurpose')
        feedPurposeControll.valueChanges.subscribe(value => this.Error.setErrorMessage(feedPurposeControll));
    
  }

  

  async createNewTeam(){
    let data = Object.assign({}, this.newTeam, this.createTeamsForm.value);
    console.log(data);
    this.teamsService.createTeam(data);
  }

}
