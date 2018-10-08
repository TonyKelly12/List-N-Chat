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
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
var PlatformMock = /** @class */ (function () {
    function PlatformMock() {
    }
    PlatformMock.prototype.ready = function () {
        return new Promise(function (resolve) {
            resolve('READY');
        });
    };
    PlatformMock.prototype.getQueryParam = function () {
        return true;
    };
    PlatformMock.prototype.registerBackButtonAction = function (fn, priority) {
        return (function () { return true; });
    };
    PlatformMock.prototype.hasFocus = function (ele) {
        return true;
    };
    PlatformMock.prototype.doc = function () {
        return document;
    };
    PlatformMock.prototype.is = function () {
        return true;
    };
    PlatformMock.prototype.getElementComputedStyle = function (container) {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    };
    PlatformMock.prototype.onResize = function (callback) {
        return callback;
    };
    PlatformMock.prototype.registerListener = function (ele, eventName, callback) {
        return (function () { return true; });
    };
    PlatformMock.prototype.win = function () {
        return window;
    };
    PlatformMock.prototype.raf = function (callback) {
        return 1;
    };
    PlatformMock.prototype.timeout = function (callback, timer) {
        return setTimeout(callback, timer);
    };
    PlatformMock.prototype.cancelTimeout = function (id) {
        // do nothing
    };
    PlatformMock.prototype.getActiveElement = function () {
        return document['activeElement'];
    };
    return PlatformMock;
}());
export { PlatformMock };
var StatusBarMock = /** @class */ (function (_super) {
    __extends(StatusBarMock, _super);
    function StatusBarMock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatusBarMock.prototype.styleDefault = function () {
        return;
    };
    return StatusBarMock;
}(StatusBar));
export { StatusBarMock };
var SplashScreenMock = /** @class */ (function (_super) {
    __extends(SplashScreenMock, _super);
    function SplashScreenMock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplashScreenMock.prototype.hide = function () {
        return;
    };
    return SplashScreenMock;
}(SplashScreen));
export { SplashScreenMock };
var NavMock = /** @class */ (function () {
    function NavMock() {
    }
    NavMock.prototype.pop = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.push = function () {
        return new Promise(function (resolve) {
            resolve();
        });
    };
    NavMock.prototype.getActive = function () {
        return {
            'instance': {
                'model': 'something',
            },
        };
    };
    NavMock.prototype.setRoot = function () {
        return true;
    };
    NavMock.prototype.registerChildNav = function (nav) {
        return;
    };
    return NavMock;
}());
export { NavMock };
var DeepLinkerMock = /** @class */ (function () {
    function DeepLinkerMock() {
    }
    return DeepLinkerMock;
}());
export { DeepLinkerMock };
//# sourceMappingURL=mocks-ionic.js.map