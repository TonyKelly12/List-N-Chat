var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var ErrorMessagesProvider = /** @class */ (function () {
    function ErrorMessagesProvider() {
        this.formValidation = {
            userID_required: 'Please enter a user ID',
            userID_length: 'User ID must be at least 2 numbers',
            first_name_required: 'Please enter a first name',
            first_name_length: 'First name must be at least 2 characters',
            last_name_required: 'Please enter a last name',
            last_name_length: 'Last name must be at least 2 characters',
            profile_status_required: 'Please select intial profile status',
            user_name_required: 'Please enter username',
            user_name_length: 'Must be at least 3 characters',
            weight_required: 'Please enter a weight',
            weight_min: 'User must be atleast 35 kg',
            height_required: 'Please enter a height',
            height_min: 'User must be at least 91.44 cm tall',
            favQuote_min: 'Favorite Quote must be atleast 2 characters long'
        };
    }
    ErrorMessagesProvider = __decorate([
        Injectable()
    ], ErrorMessagesProvider);
    return ErrorMessagesProvider;
}());
export { ErrorMessagesProvider };
//# sourceMappingURL=error-messages.js.map