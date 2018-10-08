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
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { PostsApiProvider } from '../../providers/posts-api/posts-api';
import { AppGlobals, FEED_TYPE, POST_TYPE } from '../../providers/app-globals/app-globals';
var PostInput = /** @class */ (function () {
    function PostInput(postsApi, element, _global) {
        this.postsApi = postsApi;
        this.element = element;
        this._global = _global;
        this.resizeContent = new EventEmitter();
        this.scrollToNewPost = new EventEmitter();
        this.commentsNbrChange = new EventEmitter();
    }
    Object.defineProperty(PostInput.prototype, "feed", {
        set: function (feed) {
            this.feedData = feed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostInput.prototype, "post", {
        set: function (post) {
            this.postData = post;
        },
        enumerable: true,
        configurable: true
    });
    PostInput.prototype.textInputResized = function () {
        this.resizeContent.emit(true);
    };
    PostInput.prototype.addPost = function () {
        var _this = this;
        if (!this.newPostText)
            return;
        var feedID, replyToPost, postToPersonID;
        if (this.feedData) {
            feedID = this.feedData.feedID;
            replyToPost = 0;
            postToPersonID = this.feedData.postedTo;
        }
        else if (this.postData) {
            feedID = this.postData.feedID;
            replyToPost = this.postData.postID;
            postToPersonID = 0;
        }
        this.postsApi.createPost(feedID, this.newPostText, replyToPost, this._global.myPersonProperties.personID, postToPersonID).then(function (newPost) { return __awaiter(_this, void 0, void 0, function () {
            var textArea, post;
            var _this = this;
            return __generator(this, function (_a) {
                this.newPostText = '';
                textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
                textArea.style.overflow = 'hidden';
                textArea.style.height = 'auto';
                textArea.style.height = "20px";
                this.textInputResized();
                if (this.feedData) {
                    post = {
                        postID: newPost.postID,
                        postCommentNbr: newPost.numChildren,
                        postByPersonID: this._global.myPersonProperties.personID,
                        postToPersonID: postToPersonID
                    };
                    if (this.feedData.type == FEED_TYPE.chat) {
                        this.feedData.posts.push(post);
                        setTimeout(function () {
                            _this.scrollToNewPost.emit(true);
                        }, 0);
                    }
                    else {
                        this.feedData.posts.unshift(post);
                    }
                }
                else if (this.postData) {
                    this.createPostComment(newPost).then(function (postComment) {
                        console.log(postComment);
                        _this.postData.comments.push(postComment);
                        _this.postData.commentsNbr++;
                        _this.commentsNbrChange.emit(_this.postData.commentsNbr);
                    });
                }
                return [2 /*return*/];
            });
        }); }).catch(function (err) { return console.log("Error Creating New Post: " + err); });
    };
    PostInput.prototype.createPostComment = function (commentData) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var postComment;
            _this.postsApi.getPostPersonData(commentData.postedByPersonID).then(function (personData) {
                postComment = {
                    postID: commentData.postID,
                    postType: POST_TYPE.full,
                    message: commentData.message,
                    postedBy: personData,
                    postedTo: personData,
                    postedOn: _this.postsApi.parseIso8601DateTime(commentData.postedOnAsIso8601),
                    comments: [],
                    commentsNbr: commentData.numChildren,
                    commentsDisabled: true,
                    feedID: commentData.feedID,
                    feedType: 'comment'
                };
                resolve(postComment);
            }).catch(function (err) { return console.log("Error Getting Person Data for Comment: " + err); });
        });
        return promise;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PostInput.prototype, "feed", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PostInput.prototype, "post", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PostInput.prototype, "resizeContent", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PostInput.prototype, "scrollToNewPost", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PostInput.prototype, "commentsNbrChange", void 0);
    PostInput = __decorate([
        Component({
            selector: 'post-input',
            templateUrl: 'post-input.html',
            providers: [PostsApiProvider]
        }),
        __metadata("design:paramtypes", [PostsApiProvider, ElementRef, AppGlobals])
    ], PostInput);
    return PostInput;
}());
export { PostInput };
//# sourceMappingURL=post-input.js.map