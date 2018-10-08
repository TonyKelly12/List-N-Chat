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
// require("firebase/firestore");
var DataModelServiceService = /** @class */ (function () {
    function DataModelServiceService() {
    }
    DataModelServiceService.prototype.newUser = function () {
        return {
            email: '',
            password: ''
        };
    };
    DataModelServiceService.prototype.User = function () {
        return {
            uid: '',
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            feedRef: '',
            photoURL: '',
            creationTime: '',
            lastSignInTime: '',
            roles: {
                user: true
            },
            status: 'offline'
        };
    };
    DataModelServiceService.prototype.newArena = function () {
        return { gymRef: '', name: '', arenaId: '', };
    };
    DataModelServiceService.prototype.newChallenge = function () {
        return {
            date_start: '',
            description: '',
            name: '',
            reward_points: 0,
            step_goal: 0,
            type: ''
        };
    };
    DataModelServiceService.prototype.newGym = function () {
        return {
            city: '',
            country_iso_code: '',
            description: '',
            gym_phone_number_00: '',
            gym_phone_number_01: '',
            long_name: '',
            short_name: '',
            state: '',
            street_address: '',
            zip_code: 0,
            gymID: '',
            arenaRefs: []
        };
    };
    DataModelServiceService.prototype.newTeam = function () {
        return {
            date_start: '',
            description: '',
            name: '',
            feedRefs: '',
            gymRefs: '',
            gymID: '',
            type: ''
        };
    };
    DataModelServiceService.prototype.newFeed = function () {
        return {
            date_start: '',
            description: '',
            name: '',
            type: '',
            teamRefs: '',
            gymRefs: '',
            userRef: ''
        };
    };
    //set a class for new chat data.
    DataModelServiceService.prototype.newChat = function () {
        return {
            chatID: '',
            lastMessage: {},
            members: {},
            time: '',
            createdBy: '',
            photoURL: {}
        };
    };
    DataModelServiceService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], DataModelServiceService);
    return DataModelServiceService;
}());
export { DataModelServiceService };
//# sourceMappingURL=data-objects.js.map