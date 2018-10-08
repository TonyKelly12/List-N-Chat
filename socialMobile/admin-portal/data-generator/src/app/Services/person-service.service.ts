import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {PersonInst} from '../Models/personInst.model'
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {EditPersonData} from '../Interfaces/edit-person-data'
import 'rxjs/add/operator/map'
import { importType } from '@angular/compiler/src/output/output_ast';

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");

@Injectable()
export class PersonService {
    newPersonRequest = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/new";
    getPersons = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons?startIndex=0&maxResults" +"=50";
    private getEditPersonURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/"; 
    private saveEditPersonURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/";
    personID;
    propName ;
    propType ;
    propValue;
  
    constructor(private http:HttpClient, private router:Router ) {}

    createPersonPost(data){ 
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

    personPropertyNamePost(data) {
      var propertyName = data;
      fetch("http://jimbotcentral.com:8080/gatekeeper/rest/v1/properties/person." + propertyName + ".bool", {method: "POST"})
      .then(res =>{
        console.log(res.json())
        this.router.navigate(['/person'])
      });
  
    }

    async getPersonsData() {
      console.log("get person ran")
      let response = await fetch(this.getPersons, {
          method: "GET",
          headers: propHeader,
          mode: 'cors'
        })
      return response
  
    }

  async addPropApiCall(data) {
    //console.log(data);
    Object.keys(data).map(async e =>{
      //console.log("keyloop")
      //console.log(e)
      let prop = `${e}`
      let value = data[e]
      console.log(value)
      if(e != "userID" && e != "undefined" || undefined){
        let response = await fetch("http://jimbotcentral.com:8080/gatekeeper/rest/v1/persons/" + value[1] + "/properties/person." + value[3] + "." + value[0], {
          method: "POST",
          headers: propHeader,
          body: JSON.stringify({propertyValue:value[2]}),
          mode: 'cors'
       })
        return console.log(response.json())
       }   
      } );     
  }
    getEditUser(userID: number): Observable<EditPersonData> {
      const url = `${this.getEditPersonURL}${userID}`
      return this.http.get(url).map(this.extractData)
        
        
    }
    async saveEditUser(userID, prop){
      //console.log(userID);
      //console.log(prop.propertyValue);
      let data = prop.propertyValue.toString();
     // console.log(data)
      if(userID){
        let response = await fetch(this.saveEditPersonURL + userID + "/properties/" + prop.propertyName, {
          method: "PUT",
          headers: propHeader,
          body: JSON.stringify({propertyValue: data}),
          mode: 'cors'
       })
        return console.log(response.json())
       } 
      
    }

    private extractData(data){
      //console.log(data);
      return data || {}
    }
  
  
    newPropApiCall(newPropData) {
      const newPropName = newPropData.newPropName;
      const realmType = newPropData.realmType;
      const newPropType = newPropData.newPropType;
      const newPropDescription = newPropData.newPropDescription;
      fetch("http://jimbotcentral.com:8080/gatekeeper/rest/v1/properties/" + realmType + "." + newPropName + "." + newPropType + "?description=" + newPropDescription, {
          method: "POST",
          headers: propHeader
        })
        .then(res =>{
          console.log(res.json())
          this.router.navigate(['/person'])
        } )
        .catch(err => console.error(err));;
    }

    customProp(customProperty) {
      
      this.personPropertyNamePost(customProperty);
    }

}
