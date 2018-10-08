import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PersonInst} from '../Models/personInst.model'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EditPersonData} from '../Interfaces/edit-person-data'
import 'rxjs/add/operator/map'
import { importType } from '@angular/compiler/src/output/output_ast';
import { EditGym } from '../Interfaces/edit-gym';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");

@Injectable()
export class GymService {
  newPersonRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/new";
  getGyms = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms?startIndex=0&maxResults=50";
  private baseGymURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/";
  
  constructor(private http: HttpClient, private router:Router) { }

  createGym(data){ 
    console.log(data);
    fetch(this.newPersonRequest, {
      method: "POST",
      headers: propHeader,
      mode: 'cors',
      body: JSON.stringify(data) //'{"email": "skippy12345@merrybandofpirates.gov","password": "ILoveAnchovies123", "phone": "(555)-555-5555"}'
    })
      .then(res =>{
        console.log(res.json())
        this.router.navigate(['/person'])
      } )
      .catch(err => console.error(err));
  }

  async getGymsData() {
    console.log("get person ran")
    let response = await fetch(this.getGyms, {
        method: "GET",
        headers: propHeader,
        mode: 'cors'
      })
    return response

  }

  getEditGym(gymID: number): Observable<EditGym> {
    const url = `${this.baseGymURL}${gymID}`
    return this.http.get(url).map(this.extractData)
      
      
  }

  private extractData(data){
    //console.log(data);
    return data || {}
  }

  async saveEditGym(gymID, prop){
    //console.log(userID);
    //console.log(prop.propertyValue);
    let data = prop.propertyValue.toString();
   // console.log(data)
    if(gymID){
      let response = await fetch(this.baseGymURL + gymID + "/properties/" + prop.propertyName, {
        method: "PUT",
        headers: propHeader,
        body: JSON.stringify({propertyValue: data}),
        mode: 'cors'
     })
      return console.log(response.json())
     } 
    
  }

}
