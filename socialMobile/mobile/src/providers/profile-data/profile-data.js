var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { AngularFirestore } from 'angularfire2/firestore';
export var ProfileVisibility;
(function (ProfileVisibility) {
    ProfileVisibility["public"] = "public";
    ProfileVisibility["friends"] = "friends";
    ProfileVisibility["private"] = "private";
})(ProfileVisibility || (ProfileVisibility = {}));
;
var Profile = /** @class */ (function () {
    function Profile() {
    }
    return Profile;
}());
;
var UserProfile = /** @class */ (function (_super) {
    __extends(UserProfile, _super);
    function UserProfile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserProfile;
}(Profile));
export { UserProfile };
;
var ProfileData = /** @class */ (function () {
    function ProfileData(afs) {
        this.afs = afs;
    }
    ProfileData.prototype.getProfileData = function (user) {
        this.peopleDocumentRef = this.afs.doc('/people/' + user.uid);
        return this.peopleDocumentRef.snapshotChanges().map(function (action) {
            var data = action.payload.data();
            var id = action.payload.id;
            return __assign({ id: id }, data);
        });
    };
    ProfileData = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFirestore])
    ], ProfileData);
    return ProfileData;
}());
export { ProfileData };
//# sourceMappingURL=profile-data.js.map