/**
 * base type for all http requests. 
 * 
 * naming scheme -> all fields should follow the naming scheme <field_name> = 'request_<display_name>'
 */
export interface HttpRequest { }

/**
 * email field definition. any request that includes the email to be present should 
 * extend this interface instead of defining a variable explicitly
 */
export interface HttpEmailField {
    /**
     * email address, any string that contains 1 or more characters before and after the
     * character '@'
     */
    request_email: string;
}

/**
 * password field definition. any request that includes the password to be present should 
 * extend this interface instead of defining a variable explicitly
 */
export interface HttpPasswordField {
    /**
     * password data, should be a hash not plain text
     */
    request_password: string;
}

/**
 * data structure of body for the create-account POST http request
 */
export interface CreateAccountPOST extends HttpRequest, HttpPasswordField, HttpEmailField {
    /**
     * username of the user. unique value used to identify the account in the database
     */
    request_username:   string;

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
 */
export interface LoginAccountPOST extends HttpRequest, HttpEmailField, HttpPasswordField { }

export interface ForgotAccountPOST extends HttpRequest, HttpEmailField { }