var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
// Defined Profile Visibility settings
export var PROFILE_VISIBILITY;
(function (PROFILE_VISIBILITY) {
    PROFILE_VISIBILITY["public"] = "public";
    PROFILE_VISIBILITY["friends"] = "friends";
    PROFILE_VISIBILITY["private"] = "private";
})(PROFILE_VISIBILITY || (PROFILE_VISIBILITY = {}));
// Defined Feed types
export var FEED_TYPE;
(function (FEED_TYPE) {
    FEED_TYPE["feed"] = "feed";
    FEED_TYPE["announcement"] = "announcement";
    FEED_TYPE["forum"] = "forum";
    FEED_TYPE["chat"] = "chat";
    FEED_TYPE["selectedPost"] = "selectedPost";
    FEED_TYPE["comment"] = "comment";
})(FEED_TYPE || (FEED_TYPE = {}));
// Defined Post types
export var POST_TYPE;
(function (POST_TYPE) {
    POST_TYPE["slim"] = "slim";
    POST_TYPE["full"] = "full";
})(POST_TYPE || (POST_TYPE = {}));
var AppGlobals = /** @class */ (function () {
    function AppGlobals() {
        // My default properties
        this.myPersonProperties = {
            personID: 0,
            displayName: '',
            profilePic: '',
            shortBio: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            height: '',
            weight: '',
            profileVisibility: PROFILE_VISIBILITY.friends,
            favoriteSports: []
        };
    }
    AppGlobals = __decorate([
        Injectable()
    ], AppGlobals);
    return AppGlobals;
}());
export { AppGlobals };
//# sourceMappingURL=app-globals.js.map