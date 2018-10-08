import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs';
/*
  Generated class for the GymsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class GymsApiProvider {
  gymsURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/"
  //for USI only
   gymPhoneNumberURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.phone_number_00.txt";
   gymAddressURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.street_address.txt";
   gymLNameURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.long_name.txt";
   gymSNameURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.short_name.txt";
   gymStateURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.state.txt";
   gymCityURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.city.txt";
   gymZipURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.zip_code.txt"
  propHeader =new Headers();			
   phoneNumber;
  constructor(private http: HttpClient) {
    console.log('Hello GymsApiProvider Provider');
  };
    
  getPhoneNumber(url: string) :Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getAddress(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getLongName(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getShortName(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getState(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getCity(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };

  getZip(url: string) : Observable<any> {
    return this.http.get(url).map(res => res);
  };
}
