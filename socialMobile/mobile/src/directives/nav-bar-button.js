var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppGlobals } from '../providers/app-globals/app-globals';
var NavBarButton = /** @class */ (function () {
    function NavBarButton(navCtrl, navParams, _global) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._global = _global;
    }
    NavBarButton.prototype.handleNavBtn = function (navBtnID) {
        switch (navBtnID) {
            case 'chatNavBtn':
                this.navCtrl.push('ChatListPage');
                break;
            case 'avatarNavBtn':
                this.navCtrl.push('Profile', { profileID: this._global.myPersonProperties.personID });
                break;
        }
    };
    NavBarButton = __decorate([
        Directive({
            selector: '[nav-bar-button]',
            host: {
                '(click)': 'handleNavBtn($event.currentTarget.id)'
            }
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AppGlobals])
    ], NavBarButton);
    return NavBarButton;
}());
export { NavBarButton };
//# sourceMappingURL=nav-bar-button.js.map