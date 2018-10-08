var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PostsApiProvider } from '../../providers/posts-api/posts-api';
import { PersonsApiProvider } from '../../providers/persons-api/persons-api';
import { AppGlobals, FEED_TYPE, POST_TYPE } from '../../providers/app-globals/app-globals';
var Post = /** @class */ (function () {
    function Post(navCtrl, events, sanitizer, postsApi, personsApi, _global) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.sanitizer = sanitizer;
        this.postsApi = postsApi;
        this.personsApi = personsApi;
        this._global = _global;
        this.post = {
            postID: 0,
            postType: POST_TYPE.full,
            message: '',
            postedBy: {
                personID: 0,
                displayName: '',
                profilePic: ''
            },
            postedTo: {
                personID: 0,
                displayName: '',
                profilePic: ''
            },
            postedOn: '',
            comments: [],
            commentsNbr: 0,
            commentsDisabled: false,
            feedID: 0,
            feedType: ''
        };
        this.footer = true;
        this.FEED_TYPE = FEED_TYPE;
        this.POST_TYPE = POST_TYPE;
    }
    Object.defineProperty(Post.prototype, "postID", {
        set: function (postID) {
            this.post.postID = postID;
            this.loadPostData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "feedType", {
        set: function (feedType) {
            this.post.feedType = feedType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "postType", {
        set: function (postType) {
            this.post.postType = postType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "showFooter", {
        set: function (showFooter) {
            this.footer = showFooter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "commentsNbr", {
        set: function (commentsNbr) {
            this.post.commentsNbr = commentsNbr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Post.prototype, "commentsDisabled", {
        set: function (commentsDisabled) {
            this.post.commentsDisabled = commentsDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Post.prototype.loadPostData = function () {
        var _this = this;
        //console.log(`Loading Data for Post: ${this.post.postID}`);
        //console.log(this.post);
        this.postsApi.getPost(this.post.postID).then(function (postData) {
            _this.post.message = postData.message;
            _this.post.commentsNbr = postData.numChildren;
            _this.post.feedID = postData.feedID;
            _this.post.postedOn = _this.postsApi.parseIso8601DateTime(postData.postedOnAsIso8601);
            _this.postsApi.getPostPersonData(postData.postedByPersonID).then(function (personsData) {
                _this.post.postedBy = personsData;
            }).catch(function () { return console.log("Error Loading By Person Data for Post: " + _this.post.postID); });
            if (postData.postedToPersonID) {
                _this.postsApi.getPostPersonData(postData.postedToPersonID).then(function (personsData) {
                    _this.post.postedTo = personsData;
                }).catch(function () { return console.log("Error Loading To Person Data for Post: " + _this.post.postID); });
            }
        }).catch(function () { return console.log("Error Loading Data for Post: " + _this.post.postID); });
    };
    Post.prototype.likePost = function () {
        console.log('OMUHGERD I LOVE THIS POST!');
    };
    Post.prototype.replyToPost = function () {
        //console.log('OMUHGERD I REPLIED TO THIS POST: !');
        this.navCtrl.setRoot('PostComments', { post: this.post, fromPage: this.navCtrl.getActive().name });
    };
    Post.prototype.sharePost = function () {
        console.log('OMUHGERD I SHARED THIS POST!');
    };
    Post.prototype.goToChat = function (chatPost) {
        this.navCtrl.setRoot('Chat', { chatFeedID: chatPost.feedID });
    };
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Post.prototype, "postID", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Post.prototype, "feedType", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Post.prototype, "postType", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Post.prototype, "showFooter", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Post.prototype, "commentsNbr", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Post.prototype, "commentsDisabled", null);
    Post = __decorate([
        Component({
            selector: 'post',
            templateUrl: 'post.html',
            providers: [PostsApiProvider, PersonsApiProvider]
        }),
        __metadata("design:paramtypes", [NavController, Events, DomSanitizer,
            PostsApiProvider, PersonsApiProvider,
            AppGlobals])
    ], Post);
    return Post;
}());
export { Post };
//# sourceMappingURL=post.js.map