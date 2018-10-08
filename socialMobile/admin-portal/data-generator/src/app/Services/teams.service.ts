import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PersonInst} from '../Models/personInst.model'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EditPersonData} from '../Interfaces/edit-person-data'
import 'rxjs/add/operator/map'
import { importType } from '@angular/compiler/src/output/output_ast';
import { EditGym } from '../Interfaces/edit-gym';
import { EditTeam } from '../Interfaces/editTeams';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");

@Injectable()
export class TeamsService {
  newTeamRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/teams/new";
  getTeams = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/teams?startIndex=0&maxResults=50";
  private baseTeamURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/teams/";
  
  constructor(private http: HttpClient, private router:Router) { }

  createTeam(data){ 
    console.log(data);
    fetch(this.newTeamRequest, {
      method: "POST",
      headers: propHeader,
      mode: 'cors',
      body: JSON.stringify(data) //'{"email": "skippy12345@merrybandofpirates.gov","password": "ILoveAnchovies123", "phone": "(555)-555-5555"}'
    })
      .then(res =>{
        console.log(res.json())
        this.router.navigate(['/teams'])
      } )
      .catch(err => console.error(err));
  }

  async getTeamData() {
    console.log("get person ran")
    let response = await fetch(this.getTeams, {
        method: "GET",
        headers: propHeader,
        mode: 'cors'
      })
    return response

  }

  getEditTeam(teamID: number): Observable<EditTeam> {
    const url = `${this.baseTeamURL}${teamID}`
    return this.http.get(url).map(this.extractData)
      
      
  }

  private extractData(data){
    //console.log(data);
    return data || {}
  }

  async saveEditTeam(teamID, prop){
    //console.log(userID);
    //console.log(prop.propertyValue);
    let data = prop.propertyValue.toString();
   // console.log(data)
    if(teamID){
      let response = await fetch(this.baseTeamURL + teamID + "/properties/" + prop.propertyName, {
        method: "PUT",
        headers: propHeader,
        body: JSON.stringify({propertyValue: data}),
        mode: 'cors'
     })
      return console.log(response.json())
     } 
    
  }

}
