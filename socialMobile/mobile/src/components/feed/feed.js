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
import { LoadingController, Events, NavController } from 'ionic-angular';
import { FEED_TYPE } from '../../providers/app-globals/app-globals';
var Feed = /** @class */ (function () {
    function Feed(navCtrl, loadingCtrl, events) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.feed = {
            feedID: 0,
            type: '',
            name: '',
            desc: '',
            postedTo: 0,
            posts: []
        };
        this.FEED_TYPE = FEED_TYPE;
    }
    Object.defineProperty(Feed.prototype, "feedID", {
        set: function (feedID) {
            this.feed.feedID = feedID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Feed.prototype, "feedType", {
        set: function (feedType) {
            this.feed.type = feedType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Feed.prototype, "feedPostedTo", {
        set: function (feedPostedTo) {
            this.feed.postedTo = feedPostedTo;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Feed.prototype, "feedID", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], Feed.prototype, "feedType", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], Feed.prototype, "feedPostedTo", null);
    Feed = __decorate([
        Component({
            selector: 'feed',
            templateUrl: 'feed.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, Events])
    ], Feed);
    return Feed;
}());
export { Feed };
//# sourceMappingURL=feed.js.map