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
//import {ErrorMessages} from './ErrorMessages'
import { ErrorMessagesProvider } from '../error-messages/error-messages';
var SetError = /** @class */ (function () {
    function SetError(errorMessage) {
        this.errorMessage = errorMessage;
    }
    SetError.prototype.setErrorMessage = function (c) {
        if ((c.touched || c.dirty) && c.errors) {
            var formLabel_1 = c.parent.controls;
            var formName = Object.keys(formLabel_1).find(function (name) { return c === formLabel_1[name]; }) || null;
            console.log(formName);
            switch (formName) {
                case 'userID':
                    this.userIDError = '';
                    var errorName_1;
                    var e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "userID_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "userID_length";
                        }
                    });
                    this.userIDError = this.errorMessage.formValidation[errorName_1];
                    console.log(this.userIDError);
                    break;
                case 'firstname':
                    this.firstNameError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "first_name_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "first_name_length";
                        }
                    });
                    this.firstNameError = this.errorMessage.formValidation[errorName_1];
                    console.log(this.firstNameError);
                    break;
                case 'lastname':
                    this.lastNameError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "last_name_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "last_name_length";
                        }
                    });
                    this.lastNameError = this.errorMessage.formValidation[errorName_1];
                    console.log(this.lastNameError);
                    break;
                case 'username':
                    this.usernameError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "user_name_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "user_name_length";
                        }
                    });
                    this.usernameError = this.errorMessage.formValidation[errorName_1];
                    console.log(this.usernameError);
                    break;
                case 'weight_in_kg':
                    this.weightError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "weight_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "weight_min";
                        }
                    });
                    this.weightError = this.errorMessage.formValidation[errorName_1];
                    break;
                case 'height_in_cm':
                    this.heightError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "height_required";
                        }
                        if (key == 'minlength') {
                            errorName_1 = "height_min";
                        }
                    });
                    this.heightError = this.errorMessage.formValidation[errorName_1];
                    break;
                case 'favoritequote':
                    this.favQuoteError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'minlength') {
                            errorName_1 = "favQuote_min";
                        }
                    });
                    this.favQuoteError = this.errorMessage.formValidation[errorName_1];
                    break;
                case 'profilevisibility':
                    this.profileError = '';
                    e = Object.keys(c.errors).map(function (key) {
                        if (key == 'required') {
                            errorName_1 = "favQuote_min";
                        }
                    });
                    this.profileError = this.errorMessage.formValidation[errorName_1];
                    break;
                default:
                    console.log("unknown Error Below");
                    console.log(c.errors);
            }
        }
        if ((c.touched || c.dirty) && c.valid) {
            this.userIDError = '';
            this.usernameError = '';
            this.firstNameError = '';
            this.lastNameError = '';
            this.weightError = '';
            this.heightError = '';
            this.favQuoteError = '';
            this.profileError = '';
        }
    };
    SetError = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [ErrorMessagesProvider])
    ], SetError);
    return SetError;
}());
export { SetError };
//# sourceMappingURL=set-errors.js.map