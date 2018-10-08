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
import { Animation, Transition } from 'ionic-angular';
// Modal open transition for iOS devices
var ModalAlertPopIn = /** @class */ (function (_super) {
    __extends(ModalAlertPopIn, _super);
    function ModalAlertPopIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalAlertPopIn.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.enteringView.pageRef().nativeElement;
        var backdropEle = ele.querySelector('ion-backdrop');
        var backdrop = new Animation(this.plt, backdropEle);
        var wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.3);
        this.easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(wrapper);
    };
    return ModalAlertPopIn;
}(Transition));
export { ModalAlertPopIn };
// Modal close transition for iOS devices
var ModalAlertPopOut = /** @class */ (function (_super) {
    __extends(ModalAlertPopOut, _super);
    function ModalAlertPopOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalAlertPopOut.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.leavingView.pageRef().nativeElement;
        var backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var wrapperEle = ele.querySelector('.modal-wrapper');
        var wrapper = new Animation(this.plt, wrapperEle);
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.3, 0);
        this.easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(wrapper);
    };
    return ModalAlertPopOut;
}(Transition));
export { ModalAlertPopOut };
// Modal open transition for Android devices
var ModalAlertMdPopIn = /** @class */ (function (_super) {
    __extends(ModalAlertMdPopIn, _super);
    function ModalAlertMdPopIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalAlertMdPopIn.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.enteringView.pageRef().nativeElement;
        var backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
        backdrop.fromTo('opacity', 0.01, 0.5);
        this.easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(wrapper);
    };
    return ModalAlertMdPopIn;
}(Transition));
export { ModalAlertMdPopIn };
// Modal close transition for Android devices
var ModalAlertMdPopOut = /** @class */ (function (_super) {
    __extends(ModalAlertMdPopOut, _super);
    function ModalAlertMdPopOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModalAlertMdPopOut.prototype.init = function () {
        _super.prototype.init.call(this);
        var ele = this.leavingView.pageRef().nativeElement;
        var backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
        var wrapper = new Animation(this.plt, ele.querySelector('.modal-wrapper'));
        wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
        backdrop.fromTo('opacity', 0.5, 0);
        this.easing('ease-in-out')
            .duration(200)
            .add(backdrop)
            .add(wrapper);
    };
    return ModalAlertMdPopOut;
}(Transition));
export { ModalAlertMdPopOut };
//# sourceMappingURL=modal-transitions.js.map