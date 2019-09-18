/**
 * data structure for a user as defined in the database
 */
export class User {

    /**
     * unique identifier of the user
     */
    user_username:      string = "";

    /**
     * the first name of the user 
     */
    user_first_name:    string = "";

    /**
     * the last name of the user 
     */
    user_last_name:     string = "";

    /**
     * the email address of the user
     */
    user_email:         string = "";

    /**
     * the password for the user's account
     */
    user_password:      string = "";

    /**
     * the privilege level of this user 
     */
    user_privilege:    number = -1;

    /**
     * any tags associated with this user. used to assciate the user with tasks
     */
    user_tags:          []     = [];
};

