import { remove_prefix } from "../services/utility-service";

/**
 * data structure of body for the create-account POST http request
 */
export interface CreateAccountPOST {
    /**
     * username of the user. unique value used to identify the account in the database
     */
    request_username:   string;

    /**
     * password for the account
     */
    request_password:   string;

    /**
     * the email of the account. must be unique 
     */
    request_email:      string;

    /**
     * the first name of the account
     */
    request_first_name: string;

    /**
     * the last name of the account
     */
    request_last_name:  string;
}

/**
 * produces the display name of a field 
 * @param field the field being converted to a display name
 */
export function CreateAccountPOSTFieldName(field: keyof CreateAccountPOST): string {
    // let parts: string[] = field.split('_');
    // let name: string = '';
    // for (let i: number = 1; i < parts.length; i++) {
    //     name += parts[i] + ' ';
    // }
    // return name;
    return remove_prefix(field, '_');
}

/**
 * data structure of body for the login-account POST http request 
 * 
 * NOTE: both <request_username> and <request_email> are optional but 
 * at least one of these values should be present for the request to be valid
 */
export interface LoginAccountPOST {
    /**
     * email used to identify the account (optional)
     */
    request_email?:     string;

    /**
     * username used to identify the account (optional)
     */
    request_username?:  string;

    /**
     * password for the account given the account identifier (username or email)
     */
    request_password:   string;
}

/**
 * produces the display name of a field 
 * @param field the field being converted to a display name
 */
export function LoginAccountPOSTFieldName(field: keyof LoginAccountPOST): string {
    // let parts: string[] = field.split('_');
    // let name: string = '';
    // for (let i: number = 1; i < parts.length; i++) {
    //     name += parts[i] + ' ';
    // }
    // return name;
    return remove_prefix(field, '_');
}