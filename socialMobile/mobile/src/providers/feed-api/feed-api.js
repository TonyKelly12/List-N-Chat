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
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
var FeedApiProvider = /** @class */ (function () {
    function FeedApiProvider(http) {
        this.http = http;
        this.apiUrl = 'http://jimbotcentral.com:8080/gatekeeper/rest/v1/';
    }
    FeedApiProvider.prototype.getRequest = function (url) {
        var _this = this;
        //console.log(`GET url: ${url}`);
        return this.http.get(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'GET'); });
    };
    FeedApiProvider.prototype.postRequest = function (url, data) {
        var _this = this;
        //console.log(`POST url: ${url}, data: ${data}`);
        return this.http.post(this.apiUrl + url, data).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'POST'); });
    };
    FeedApiProvider.prototype.putRequest = function (url, data) {
        var _this = this;
        //console.log(`PUT url: ${url}, data: ${data}`);
        return this.http.put(this.apiUrl + url, data).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'PUT'); });
    };
    FeedApiProvider.prototype.deleteRequest = function (url) {
        var _this = this;
        //console.log(`DELETE url: ${url}`);
        return this.http.delete(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'DELETE'); });
    };
    FeedApiProvider.prototype.handleError = function (error, httpMethod) {
        console.log("HTTP " + httpMethod + " Error: " + JSON.stringify(error));
        return Promise.reject(error);
    };
    // ---------------- Feed Provider Methods ----------------
    //       ------------- Feed Instances -------------
    /*
     * Get a specified feed.
     */
    FeedApiProvider.prototype.getFeed = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("feeds/" + feedID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a list of all feeds.
     */
    FeedApiProvider.prototype.getFeeds = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("feeds")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a count of all feeds.
     */
    FeedApiProvider.prototype.getFeedsCount = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("feeds/count")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Create a new feed.
     */
    FeedApiProvider.prototype.createNewFeed = function (name, purpose) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = {
                name: name,
                purpose: purpose
            };
            _this.postRequest("feeds/new", data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Delete a feed.
     */
    FeedApiProvider.prototype.deleteFeed = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteRequest("feeds/" + feedID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    //       ------------- Feed Properties -------------
    /*
     * Get a specified feed property.
     */
    FeedApiProvider.prototype.getFeedProperty = function (feedID, realm, name, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            _this.getRequest("feeds/" + feedID + "/properties/" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a list of all feed properties.
     */
    FeedApiProvider.prototype.getFeedProperties = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("feeds/" + feedID + "/properties")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a count of all feed properties.
     */
    FeedApiProvider.prototype.getFeedPropertiesCount = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("feeds/" + feedID + "/properties/count")
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Create new property for a feed.
     */
    FeedApiProvider.prototype.createFeedProperty = function (feedID, realm, name, type, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = realm + '.' + name + '.' + type;
            var data = {
                value: value
            };
            _this.postRequest("feeds/" + feedID + "/properties/" + propertyStr, data)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Delete a property from a feed.
     */
    FeedApiProvider.prototype.deleteFeedProperty = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteRequest("feeds/" + feedID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    FeedApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], FeedApiProvider);
    return FeedApiProvider;
}());
export { FeedApiProvider };
//# sourceMappingURL=feed-api.js.map