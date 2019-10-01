import { remove_prefix } from "../services/utility-service";

/**
 * base type for all http requests. 
 * 
 * naming scheme -> all fields should follow the naming scheme <field_name> = 'request_<display_name>'
 */
export interface HttpRequest {}

/**
 * data structure of body for the create-account POST http request
 */
export interface CreateAccountPOST extends HttpRequest {
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
 * data structure of body for the login-account POST http request 
 * 
 * NOTE: both <request_username> and <request_email> are optional when sending a request but 
 * at least one of these values should be present for the request to be valid 
 */
export interface LoginAccountPOST extends HttpRequest {
    /**
     * email used to identify the account (optional)
     */
    request_email:     string;

    /**
     * password for the account given the account identifier (username or email)
     */
    request_password:   string;
}