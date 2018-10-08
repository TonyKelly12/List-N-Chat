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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
// FIXME: it turns out that iOS devices do not like doing HTTP rest calls
// Since they are treated like remote websites and hence they tend to trigger
// CORS erors.  Consider converting all http calls to "onCall()" firebase native
// calls. See the leaderboard/functions.ts file inside the cloud functions,
// and the corresponding components/step-counter-card.ts file (submitDataToServer())
// within the mobile app for an example.
var PersonsApiProvider = /** @class */ (function () {
    function PersonsApiProvider(http) {
        this.http = http;
        this.apiUrl = 'http://jimbotcentral.com:8080/gatekeeper/rest/v1/';
    }
    PersonsApiProvider.prototype.getRequest = function (url) {
        var _this = this;
        //console.log(`GET url: ${url}`);
        return this.http.get(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'GET'); });
    };
    PersonsApiProvider.prototype.postRequest = function (url, data) {
        var _this = this;
        //console.log(`POST url: ${url}, data: ${data}`);
        var headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post(this.apiUrl + url, data, { headers: headers }).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'POST'); });
    };
    PersonsApiProvider.prototype.putRequest = function (url, data) {
        var _this = this;
        //console.log(`POST url: ${url}, data: ${data}`);
        var headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put(this.apiUrl + url, data, { headers: headers }).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'PUT'); });
    };
    PersonsApiProvider.prototype.deleteRequest = function (url) {
        var _this = this;
        //console.log(`DELETE url: ${url}`);
        return this.http.delete(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'DELETE'); });
    };
    PersonsApiProvider.prototype.handleError = function (error, httpMethod) {
        console.log("HTTP " + httpMethod + " Error: " + JSON.stringify(error));
        return Promise.reject(error);
    };
    /*
     * Get a count of all available properties.
     */
    PersonsApiProvider.prototype.getAvailablePropertiesCount = function (personID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("persons/" + personID + "/properties/count")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get all existing property names, paginated.
     */
    PersonsApiProvider.prototype.getAllPersons = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("persons")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a count of all persons.
     */
    PersonsApiProvider.prototype.getNumberOfPersons = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("persons/count")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get all properties, paginated, for a specified person.
     */
    PersonsApiProvider.prototype.getPersonsProperties = function (personID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("persons/" + personID + "/properties")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a spcified property.
     */
    PersonsApiProvider.prototype.getPersonProperty = function (personID, realm, name, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            _this.getRequest("persons/" + personID + "/properties/" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a specified person.
     */
    PersonsApiProvider.prototype.getPerson = function (personID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("persons/" + personID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Delete a property.
     */
    PersonsApiProvider.prototype.deleteProperty = function (personID, realm, name, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            _this.deleteRequest("persons/" + personID + "/properties/" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Delete a person.
     */
    PersonsApiProvider.prototype.deletePerson = function (personID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteRequest("persons/" + personID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Edit a person.
     */
    PersonsApiProvider.prototype.editPerson = function (personID, name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                name: value
            };
            _this.putRequest("persons/" + personID, data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Edit a property value.
     */
    PersonsApiProvider.prototype.editProperty = function (personID, realm, name, type, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            var data = JSON.stringify({ 'propertyValue': value });
            _this.putRequest("persons/" + personID + "/properties/" + propertyStr, data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) {
                if (err.status == 412) // If property doesn't exist for person, create it
                    _this.createProperty(personID, realm, name, type, value);
                else
                    reject(err);
            });
        });
    };
    /*
     * Create a new person.
     */
    PersonsApiProvider.prototype.createPerson = function (email, password, phone) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                'email': email,
                'password': password,
                'phone': phone
            };
            _this.postRequest('persons/new', data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Create a new property value for the specified person.
     */
    PersonsApiProvider.prototype.createProperty = function (personID, realm, name, type, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            var data = JSON.stringify({ 'propertyValue': value });
            _this.postRequest("persons/" + personID + "/properties/" + propertyStr, data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a list of all selectable sports properties.
     */
    PersonsApiProvider.prototype.getAllSportsProperties = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest('properties')
                .then(function (resp) {
                if (resp) {
                    var allSports_1 = [];
                    resp.forEach(function (property) {
                        var propertyRealm = property['name'].substr(0, property['name'].indexOf('.'));
                        var propertyName = property['name'].substr(property['name'].indexOf('.') + 1, (property['name'].lastIndexOf('.') - property['name'].indexOf('.') - 1));
                        var propertyType = property['name'].substr(property['name'].lastIndexOf('.') + 1);
                        if (propertyRealm == 'person' && propertyName.includes('likes_') && propertyType == 'bool') {
                            var sportsName = propertyName.substr(propertyName.indexOf('_') + 1).replace(/_/g, ' ').split(' ');
                            var sportsTitle = [];
                            for (var i = 0; i < sportsName.length; i++) {
                                sportsTitle.push(sportsName[i].charAt(0).toUpperCase() + sportsName[i].slice(1));
                            }
                            allSports_1.push({ title: sportsTitle.join(' '), propertyName: propertyName, imgUrl: '', favorite: false });
                        }
                    });
                    resolve(allSports_1);
                }
            })
                .catch(function (err) { return reject(err); });
        });
    };
    PersonsApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], PersonsApiProvider);
    return PersonsApiProvider;
}());
export { PersonsApiProvider };
//# sourceMappingURL=persons-api.js.map