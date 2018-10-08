var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { PersonsApiProvider } from '../persons-api/persons-api';
var PostsApiProvider = /** @class */ (function () {
    function PostsApiProvider(http, personsApi) {
        this.http = http;
        this.personsApi = personsApi;
        this.apiUrl = 'http://jimbotcentral.com:8080/gatekeeper/rest/v1/';
    }
    PostsApiProvider.prototype.getRequest = function (url) {
        var _this = this;
        //console.log(`GET url: ${url}`);
        return this.http.get(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'GET'); });
    };
    PostsApiProvider.prototype.postRequest = function (url, data) {
        var _this = this;
        //console.log(`POST url: ${url}, data: ${data}`);
        return this.http.post(this.apiUrl + url, data).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'POST'); });
    };
    PostsApiProvider.prototype.putRequest = function (url, data) {
        var _this = this;
        //console.log(`PUT url: ${url}, data: ${data}`);
        return this.http.put(this.apiUrl + url, data).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'PUT'); });
    };
    PostsApiProvider.prototype.deleteRequest = function (url) {
        var _this = this;
        //console.log(`DELETE url: ${url}`);
        return this.http.delete(this.apiUrl + url).toPromise()
            .then(function (resp) { return resp; })
            .catch(function (e) { return _this.handleError(e, 'DELETE'); });
    };
    PostsApiProvider.prototype.handleError = function (error, httpMethod) {
        console.log("HTTP " + httpMethod + " Error: " + JSON.stringify(error));
        return Promise.reject(error);
    };
    // ---------------- Post Provider Methods ----------------
    //       ------------- Post Instances -------------
    /*
     * Get a post.
     */
    PostsApiProvider.prototype.getPost = function (postID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("posts/" + postID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a list of all PARENT posts from a specified feed.
     */
    PostsApiProvider.prototype.getFeedPosts = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = "?feedID=" + feedID + "&inResponseToPostID=0";
            _this.getRequest("posts" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a list of all CHILDREN posts from a specified feed.
     */
    PostsApiProvider.prototype.getPostsChildren = function (feedID, inResponseToPostID, startIndex, maxResults) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = "?feedID=" + feedID + "&inResponseToPostID=" + inResponseToPostID + "&startIndex=" + startIndex +
                ("&maxResults=" + maxResults);
            _this.getRequest("posts" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a chat post.
     */
    PostsApiProvider.prototype.getChatPost = function (postedByPersonID, postedToPersonID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = "?postedByPersonID=" + postedByPersonID + "&postedToPersonID=" + postedToPersonID +
                "&startIndex=0&maxResults=1";
            _this.getRequest("posts" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get all chat posts.
     */
    PostsApiProvider.prototype.getAllChatPosts = function (personID) {
        var _this = this;
        var allMyPostsPromise = new Promise(function (resolve, reject) {
            _this.getAllMyPosts(personID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
        var allPostsToMePromise = new Promise(function (resolve, reject) {
            _this.getAllPostsToMe(personID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
        return Promise.all([allMyPostsPromise, allPostsToMePromise]);
        /*
            return new Promise((resolve, reject) => {
                this.getAllMyPosts(personID)
                  .then(resp => resolve(resp))
                  .catch(err => reject(err));
            });
        */
    };
    /*
     * Get all posts by me.
     */
    PostsApiProvider.prototype.getAllMyPosts = function (postedByPersonID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = "?postedByPersonID=" + postedByPersonID + "&postedToPersonID=0&startIndex=0&maxResults=0";
            _this.getRequest("posts" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get all posts to me.
     */
    PostsApiProvider.prototype.getAllPostsToMe = function (postedToPersonID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var propertyStr = "?postedByPersonID=0&postedToPersonID=" + postedToPersonID + "&startIndex=0&maxResults=0";
            _this.getRequest("posts" + propertyStr)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Get a count of all posts from a specified feed.
     */
    PostsApiProvider.prototype.getPostsCount = function (feedID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getRequest("posts/count/" + feedID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Create new post for a specified feed.
     */
    PostsApiProvider.prototype.createPost = function (feedId, post, responseTo, postedBy, postedTo) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var dateNow = new Date();
            var newPost = {
                'feedID': feedId,
                'message': post,
                'inResponseToPostID': responseTo,
                'postedByPersonID': postedBy,
                'postedToPersonID': postedTo,
                'postedOnAsIso8601': dateNow.toISOString()
            };
            _this.postRequest("posts/new", newPost)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    /*
     * Delete a post (and its children) from a feed.
     */
    PostsApiProvider.prototype.deletePost = function (postID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.deleteRequest("posts/" + postID)
                .then(function (resp) { return resolve(resp); })
                .catch(function (err) { return reject(err); });
        });
    };
    // Parse the saved date in Iso8601 format to a specified format
    PostsApiProvider.prototype.parseIso8601DateTime = function (Iso8601DateTime) {
        var formattedPostDateTime;
        var currDateTime = new Date();
        var postDateTime = new Date(Iso8601DateTime);
        var postDateDiff = Math.floor((Date.UTC(currDateTime.getFullYear(), currDateTime.getMonth(), currDateTime.getDate()) -
            Date.UTC(postDateTime.getFullYear(), postDateTime.getMonth(), postDateTime.getDate()))
            / (1000 * 60 * 60 * 24));
        if (postDateDiff == 0) { // Posted today
            var postHourDiff = currDateTime.getHours() - postDateTime.getHours();
            var postMinDiff = currDateTime.getMinutes() - postDateTime.getMinutes();
            if (postHourDiff == 0 && postMinDiff == 0) { // Posted just now
                formattedPostDateTime = 'Now';
            }
            else { // Posted so many hours or minutes ago
                if (postHourDiff > 0) {
                    formattedPostDateTime = postHourDiff + ((postHourDiff == 1) ? ' hour ago' : ' hours ago');
                }
                else {
                    formattedPostDateTime = postMinDiff + ((postMinDiff == 1) ? ' minute ago' : ' minutes ago');
                }
            }
        }
        else if (postDateDiff > 0 && postDateDiff < 8) { // Posted this past week
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            formattedPostDateTime = days[postDateTime.getUTCDay()] + ' at ' + postDateTime.toLocaleString('en-US', options);
        }
        else if (postDateDiff >= 8) { // Posted longer than a week ago
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'];
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            formattedPostDateTime = months[postDateTime.getMonth()] + ' ' + postDateTime.getDate() + ' at ' +
                postDateTime.toLocaleString('en-US', options);
        }
        return formattedPostDateTime;
    };
    // Get person data for a post.
    PostsApiProvider.prototype.getPostPersonData = function (personID) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var personData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        personData = {
                            personID: personID,
                            profilePic: '',
                            displayName: ''
                        };
                        return [4 /*yield*/, this.personsApi.getPersonsProperties(personID).then(function (properties) {
                                properties.forEach(function (property) {
                                    switch (property.propertyName) {
                                        case 'person.username.txt':
                                            personData.displayName = property.propertyValue;
                                            break;
                                        case 'person.avatar.png':
                                            personData.profilePic = property.propertyValue;
                                            break;
                                    }
                                });
                                resolve(personData);
                            }).catch(function (err) { return reject(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return promise;
    };
    PostsApiProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient, PersonsApiProvider])
    ], PostsApiProvider);
    return PostsApiProvider;
}());
export { PostsApiProvider };
//# sourceMappingURL=posts-api.js.map