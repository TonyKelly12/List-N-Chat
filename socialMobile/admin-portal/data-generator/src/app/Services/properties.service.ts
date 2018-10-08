import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

let propHeader = new Headers();
propHeader.append("Content-Type", "application/json");

@Injectable()
export class PropertiesService {
  private basePropURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/properties/";
  
  constructor(private http:HttpClient) { }

  async saveNewProperty(data){
    let response = await fetch(this.basePropURL + data.realm + "." + data.propName + "." + data.type + "?description=" + data.description, {
      method: "POST",
      headers: propHeader,
      mode: 'cors'
   })
    return console.log(response.json())
  }

}
