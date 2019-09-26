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

