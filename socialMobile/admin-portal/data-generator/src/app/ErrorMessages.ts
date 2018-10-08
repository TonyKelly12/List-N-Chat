import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessages{
    formValidation = {
        userID_required: 'Please enter a user ID',
        userID_length: 'User ID must be at least 2 numbers',
        first_name_required: 'Please enter a first name',
        first_name_length: 'First name must be at least 2 characters',
        last_name_required: 'Please enter a last name',
        last_name_length: 'Last name must be at least 2 characters',
        profile_status_required: 'Please select intial profile status',
        user_name_required: 'Please enter username',
        user_name_length: 'Must be at least 3 characters',
        weight_required:'Please enter a weight',
        weight_min: 'User must be atleast 35 kg',
        height_required: 'Please enter a height',
        height_min: 'User must be at least 91.44 cm tall',
        favQuote_min: 'Favorite Quote must be atleast 2 characters long'
    }
}