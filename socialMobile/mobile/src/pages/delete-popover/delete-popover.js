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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
var DeletePopoverPage = /** @class */ (function () {
    function DeletePopoverPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    DeletePopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DeletePopoverPage');
    };
    DeletePopoverPage.prototype.closePopover = function (res) {
        return this.viewCtrl.dismiss(res);
    };
    DeletePopoverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-delete-popover',
            templateUrl: 'delete-popover.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], DeletePopoverPage);
    return DeletePopoverPage;
}());
export { DeletePopoverPage };
//# sourceMappingURL=delete-popover.js.map