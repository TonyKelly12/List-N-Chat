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
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PostsApiProvider } from '../../providers/posts-api/posts-api';
import { PersonsApiProvider } from '../../providers/persons-api/persons-api';
import { FEED_TYPE, POST_TYPE } from '../../providers/app-globals/app-globals';
var Comment = /** @class */ (function () {
    function Comment(navCtrl, sanitizer, postsApi, personsApi) {
        this.navCtrl = navCtrl;
        this.sanitizer = sanitizer;
        this.postsApi = postsApi;
        this.personsApi = personsApi;
        this.comment = {
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
            commentsDisabled: true,
            feedID: 0,
            feedType: ''
        };
        this.footer = true;
        this.FEED_TYPE = FEED_TYPE;
    }
    Object.defineProperty(Comment.prototype, "postComment", {
        set: function (postComment) {
            this.comment = postComment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Comment.prototype, "showFooter", {
        set: function (showFooter) {
            this.footer = showFooter;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], Comment.prototype, "postComment", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], Comment.prototype, "showFooter", null);
    Comment = __decorate([
        Component({
            selector: 'comment',
            templateUrl: 'comment.html',
            providers: [PostsApiProvider, PersonsApiProvider]
        }),
        __metadata("design:paramtypes", [NavController, DomSanitizer, PostsApiProvider,
            PersonsApiProvider])
    ], Comment);
    return Comment;
}());
export { Comment };
//# sourceMappingURL=comment.js.map