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
import { Nav } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(nav, auth, afAuth, afStore) {
        var _this = this;
        this.nav = nav;
        this.auth = auth;
        this.afAuth = afAuth;
        this.afStore = afStore;
        var testRef = this.afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.photoURL = "https://firebasestorage.googleapis.com/v0/b/socialdemo-b8fe1.appspot.com/o/" +
                    "avatars%2FColor%20Nerds%20Logo.jpg?alt=media&token=18d5659a-ae61-4690-aa7c-de802dd86021";
            }
            else {
                _this.currentUserID = user.uid;
                var currentUserRef$ = _this.afStore.collection('people').doc(_this.currentUserID).valueChanges()
                    .subscribe(function (u) {
                    _this.currentUser = u;
                    _this.photoURL = _this.currentUser.photoURL;
                });
            }
        });
    }
    NavBarComponent.prototype.viewMyProfile = function () {
        this.nav.setRoot('Profile', { profileID: this.currentUserID });
    };
    NavBarComponent = __decorate([
        Component({
            selector: 'nav-bar',
            templateUrl: 'nav-bar.html'
        }),
        __metadata("design:paramtypes", [Nav, AuthServiceProvider, AngularFireAuth, AngularFirestore])
    ], NavBarComponent);
    return NavBarComponent;
}());
export { NavBarComponent };
//# sourceMappingURL=nav-bar.js.map