var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { DataModelServiceService } from '../../providers/data-objects/data-objects';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
var ProfileEditorComponent = /** @class */ (function () {
    function ProfileEditorComponent(fb, ds, auth, afStore, afAuth) {
        var _this = this;
        this.fb = fb;
        this.ds = ds;
        this.auth = auth;
        this.afStore = afStore;
        this.afAuth = afAuth;
        var testRef = this.afAuth.authState.subscribe(function (user) {
            _this.currentUserID = user.uid;
        });
    }
    ProfileEditorComponent.prototype.ngOnInit = function () {
        this.infoForm = this.fb.group({
            username: ['', [Validators.required]],
            first_name: ['',],
            last_name: [''],
        });
    };
    Object.defineProperty(ProfileEditorComponent.prototype, "username", {
        get: function () { return this.infoForm.get('username'); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ProfileEditorComponent.prototype, "first_name", {
        get: function () { return this.infoForm.get('first_name'); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ProfileEditorComponent.prototype, "last_name", {
        get: function () { return this.infoForm.get('last_name'); },
        enumerable: true,
        configurable: true
    });
    ;
    ProfileEditorComponent.prototype.setProfile = function (user) {
        var _this = this;
        console.log('userid', this.currentUserID);
        var userRef$ = this.afStore.collection('people').doc(this.currentUserID).valueChanges();
        userRef$.subscribe(function (user) {
            _this.currentUser = user;
            var initUser = _this.ds.User();
            var updateUser = Object.assign({}, _this.currentUser);
            updateUser.username = _this.username.value;
            updateUser.first_name = _this.first_name.value;
            updateUser.last_name = _this.last_name.value;
            console.log('updateuser', updateUser);
            // updateUser.phone = this.phone.value;
            // updateUser.photoURL = this.photoURL.value;
            return _this.auth.updateUser(updateUser, {
                username: updateUser.username,
                first_name: updateUser.first_name,
                last_name: updateUser.last_name,
            });
        });
    };
    ProfileEditorComponent = __decorate([
        Component({
            selector: 'profile-editor',
            templateUrl: 'profile-editor.html'
        }),
        __metadata("design:paramtypes", [FormBuilder, DataModelServiceService, AuthServiceProvider, AngularFirestore, AngularFireAuth])
    ], ProfileEditorComponent);
    return ProfileEditorComponent;
}());
export { ProfileEditorComponent };
//# sourceMappingURL=profile-editor.js.map