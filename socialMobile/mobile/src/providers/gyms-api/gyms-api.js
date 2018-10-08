var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs';
/*
  Generated class for the GymsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GymsApiProvider = /** @class */ (function () {
    function GymsApiProvider(http) {
        this.http = http;
        this.gymsURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/";
        //for USI only
        this.gymPhoneNumberURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.phone_number_00.txt";
        this.gymAddressURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.street_address.txt";
        this.gymLNameURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.long_name.txt";
        this.gymSNameURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.short_name.txt";
        this.gymStateURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.state.txt";
        this.gymCityURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.city.txt";
        this.gymZipURL = "http://jimbotcentral.com:8080/gatekeeper/rest/v1/gyms/38/properties/gym.zip_code.txt";
        this.propHeader = new Headers();
        console.log('Hello GymsApiProvider Provider');
    }
    ;
    GymsApiProvider.prototype.getPhoneNumber = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getAddress = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getLongName = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getShortName = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getState = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getCity = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider.prototype.getZip = function (url) {
        return this.http.get(url).map(function (res) { return res; });
    };
    ;
    GymsApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], GymsApiProvider);
    return GymsApiProvider;
}());
export { GymsApiProvider };
//# sourceMappingURL=gyms-api.js.map