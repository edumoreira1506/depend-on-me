import { RequestStateInterface, NotificationStateInterface } from "../models/types";
import { GetHttpRequestDisplayName } from "./http-service";
import { HttpEmailField, HttpPasswordField } from "../models/http-requests";

// ===========================================================================================================================================================================
// NULL FIELD VALIDATION
// ===========================================================================================================================================================================
/**
 * computes the first null or empty string field in the object data
 * @param data the set to iterate over
 * @returns the first key that has a null or empty string value 
 */
export function get_first_null_field(data: any): any {
    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            return key;
        }
    }
    return null;
}

/**
 * computes all null and empty string fields in the object data
 * @param data the set to iterate over
 * @returns the set of keys that have a null or empty string value
 */
export function get_all_null_fields(data: any):any {
    let keys: any[] = [];
    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            keys.push(key);
        }
    }
    return keys;
}

// ===========================================================================================================================================================================
// EMAIL VALIDATION
// ===========================================================================================================================================================================
/**
 * returns true if the given email address is of the correct format (one or more characters before @ and one or more characters preceeding it)
 * @param email the string being validated
 */
export function validate_email(email: string): boolean {
    let regex = RegExp("^[^@]+@[^@]+$");
    return regex.exec(email) !== null;
}

// ===========================================================================================================================================================================
// PASSWORD VALIDATION 
// ===========================================================================================================================================================================
/**
 * 
 * @param password string being validated
 * @param validation_functions list of functions used to validate the password
 */
export function validate_password(password: string, ...validation_functions: ((password: string)=>password_validation_result)[]): password_validation_result {
    for (let i = 0; i < validation_functions.length ; i++) {    
        let element  = validation_functions[i];
        let result = element(password);
        if (!result.result) {
            return result;
        }
    }
    return {message: 'valid', result: true};
}

/**
 * 
 * @param password string to be checked for lowercase letters
 */
export function password_contains_lowercase(password: string):password_validation_result {
    let regex = RegExp("^(?=.*[a-z])");
    return { message: "must contain at least 1 lowercase character", result: (regex.exec(password) !== null) };
}

/**
 * 
 * @param password string to be checked for uppercase letters
 */
export function password_contains_uppercase(password: string):password_validation_result {
    let regex = RegExp("^(?=.*[A-Z])");
    return { message: 'must contain at least 1 uppercase character', result: regex.exec(password) !== null};
}

/**
 * 
 * @param password string to be checked for numbers
 */
export function password_contains_number(password: string):password_validation_result {
    let regex = RegExp("^(?=.*[0-9])");
    return {message: 'must contain at least 1 number', result: regex.exec(password) !== null};
}

/**
 * 
 * @param password string to be checked for symbols
 */
export function password_contains_symbol(password: string): password_validation_result {
    let regex = RegExp("(?=.*[!@#$%^&*-+=?<>\\\\/])");
    return {message: 'must contain at least 1 symbol', result: regex.exec(password) !== null};
}

/**
 * 
 * @param password string to be checked for a minimum size
 */
export function password_is_min_size(password: string):password_validation_result{
    let regex = RegExp("(?=.{" + MIN_PASSWORD_SIZE + ",})");
    return {message: 'must have at least ' + MIN_PASSWORD_SIZE + ' characters', result: regex.exec(password) !== null};
}

/**
 * return type of all password validation functions
 */
type password_validation_result = {
    message:    string;
    result:     boolean;
}

// internal constant
const MIN_PASSWORD_SIZE: number = 8;

// ===========================================================================================================================================================================
// ACCOUNTS VALIDATION
// ===========================================================================================================================================================================
/**
 * generic function to validate null input within the accounts interface
 * @param state current state associated with <parent>
 * @param parent the component being validated
 */
export function accounts_validate_null_input<RequestType, State extends (RequestStateInterface<RequestType> & NotificationStateInterface)>(state: State, parent: React.Component): boolean {
    let all_null_fields = get_all_null_fields(state.request_data);
    parent.setState({invalid_fields: all_null_fields});
    
    // if there is error, notify user and skip sending the request
    let first_null_field = all_null_fields[0];
    if (first_null_field != null) {
        parent.setState({notification_data: {...state.notification_data, open: true, message: GetHttpRequestDisplayName<RequestType>(first_null_field) + ' cannot be empty'}});
        return false;
    }

    return true;
}

/**
 * generic function to validate an email address within the accounts interface 
 * @param state current state associated with <parent>
 * @param parent the component being validated
 * @param notification_message the message to display within the component if validation fails
 */
export function accounts_validate_email<RequestType extends HttpEmailField, State extends (RequestStateInterface<RequestType> & NotificationStateInterface)>(state: State, parent: React.Component, notification_message: string): boolean {
    let email_validation: boolean = validate_email(state.request_data.request_email);

    if (!email_validation) {
        parent.setState({notification_data: {...state.notification_data, open: true, message: notification_message}});
    }

    return email_validation;
}

/**
 * generic function to validate a password within the accounts interface
 * @param state current state associated with <parent>
 * @param parent the component being validated
 * @param notification_message the message to display within the component if validation fails
 */
export function accounts_validate_password<RequestType extends HttpPasswordField, State extends (RequestStateInterface<RequestType> & NotificationStateInterface)>(state: State, parent: React.Component, notification_message?: string): boolean {
    let password_validation = validate_password(state.request_data.request_password, password_contains_lowercase, password_contains_uppercase, 
        password_contains_number, password_contains_symbol, password_is_min_size);

    if (!password_validation.result) {
        let message: string = 'password ' + (notification_message === undefined ? password_validation.message : notification_message);
        parent.setState({notification_data: {...state.notification_data, open: true, message: message}});
        return false;
    }

    return true;
}