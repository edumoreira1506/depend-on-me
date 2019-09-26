import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import { CreateAccountPOST, CreateAccountPOSTFieldName } from '../../models/http-requests';
import { CREATE_ACCOUNT_END_POINT, http_post, HTTP_SUCCESS } from '../../services/http-service';
import { get_all_null_fields, password_contains_lowercase, password_contains_number, password_contains_symbol, password_contains_uppercase, password_is_min_size, validate_password } from '../../services/validation-service';
import AccountsPageContainer from '../../components/accounts-page-container';
import './create-account.css';


/**
 * type definition for complex type
 */
type NullableCreateAccountPOSTFieldArray = (keyof CreateAccountPOST| null)[];

/**
 * container for a fields id and autocamplete values
 */
type FieldMetadata = {
    key:             keyof CreateAccountPOST;
    autocomplete:   string;
};

/**
 * definition of all the fields displayed on the create account form 
 */
const fields: FieldMetadata[] = [
    {key: 'request_first_name', autocomplete: 'given_name'},
    {key: 'request_last_name', autocomplete: 'family-name'},
    {key: 'request_email', autocomplete: 'email'},
    {key: 'request_username', autocomplete: 'none'},
    {key: 'request_password', autocomplete: 'none'}
];


/**
 * @description Props for this component. No props have been defined for this component
 */
interface Props {
}

/**
 * @description State for this component. contains user data structure to store information
 * to create a new account
 */
interface State {
    request_data:       CreateAccountPOST;
    notification_data:  NotificationFunctionalProps;
    invalid_fields:     NullableCreateAccountPOSTFieldArray;
};

/**
 * @description page view form to create an account. contains navigation controls to splash 
 * screen page, login page, and forgot password page. also has controls to create an account 
 * with filled out fields
 */
export default class CreateAccountPage extends React.Component<Props, State> {

    // initialization of state object 
    state: State = {
        request_data: {
            request_first_name: "",
            request_last_name:  "",
            request_email:      "",
            request_username:   "",
            request_password:   "",
        },
        notification_data: {
            open: false, 
            message: "",
            on_close: () => {this.setState({notification_data: {...this.state.notification_data, open: false}})}
        },
        invalid_fields: []
    };

    // function to update state of field. bound to this component
    handleChange = (id: keyof CreateAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({request_data: {...this.state.request_data, [id]: event.target.value}});
    
        if (event.target.value === '') {
            this.setState({invalid_fields: this.state.invalid_fields.concat(id)});
        } else {
            this.setState({invalid_fields: this.state.invalid_fields.filter(function(element){return element !== id;})});
        }
    }
    
    
    // function to handle creating an account from the values currently defined in state
    handleCreateAccount = () => {
        // validate all fields are set
        if (!this.performInputValidation()) { return; }

        // validate password
        if (!this.performPasswordValidation()) { return; }        

        // make request
        this.performCreateAccountRequest();
    }

    /**
     * validates that all fields have values present
     */
    performInputValidation = () : boolean => {
        let all_null_fields = get_all_null_fields(this.state.request_data);
        this.setState({invalid_fields: all_null_fields});
        
        // if there is error, notify user and skip sending the request
        let first_null_field = all_null_fields[0];
        if (first_null_field != null) {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: CreateAccountPOSTFieldName(first_null_field) + ' cannot be empty'}});
            return false;
        }

        return true;
    }

    /**
     * validates that the current password meets the requirements for a secure password 
     */
    performPasswordValidation = () : boolean => {
        let password_validation = validate_password(this.state.request_data.request_password, password_contains_lowercase, password_contains_uppercase, 
            password_contains_number, password_contains_symbol, password_is_min_size);

        if (!password_validation.result) {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: "password " + password_validation.message}});
            return false;
        }

        return true;
    }

    performCreateAccountRequest = () => {
        let result = http_post(CREATE_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HTTP_SUCCESS) {
            // TODO redirect 
        } else {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: result['error']}});
        }
    }


    render() {
        return (
            <div>
                {AccountsPageContainer(
                    <div>
                        <Typography variant='h1'>{'<\\>'}</Typography>
                        {Form(this.state.request_data, this.handleChange, this.handleCreateAccount, this.state.invalid_fields)}
                    </div>
                )}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }
}

// // TODO: abstract the below functional components to be public as needed
// // TODO: replace content with array, to allow for mulitple displays
/**
 * container for all fields and controls in the account creation form
 * @param state the state of the page
 * @param handleChange the function to handle a change from input to controls
 * @param handleCreateAccount the function used to create a new account
 * @param invalid_fields the current fields that should be highlighted as an error
 */
function Form(state: CreateAccountPOST, handleChange: any, handleCreateAccount: any, invalid_fields: NullableCreateAccountPOSTFieldArray) {
    return (
        <form noValidate autoComplete="off">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                {/* field group */}
                {fields.map(item => {
                    return Field(item.key, CreateAccountPOSTFieldName(item.key), state[item.key], item.autocomplete, handleChange, invalid_fields);
                })}
                
                {/* control group */}
                {Control(
                    <Button color='primary' variant='contained' fullWidth onClick={handleCreateAccount}>Create Account</Button>
                )}
                {Control(
                    <Link> 
                        <Typography align='center'>already have an account? sign in here</Typography>
                    </Link>
                )}
            </Grid>
        </form>
    );
}

/**
 * wrapper for field
 * @param field field in the request_data object to associate with this control
 * @param label text to be displayed on the control
 * @param value current value in the control
 * @param autoComplete class of autocomplete to prefil the field
 * @param handleChange function to handle when this control recieves input
 * @param invalid_fields the current fields that should be highlighted as an error
 */
function Field(field:keyof CreateAccountPOST, label:string, value:string, autoComplete:string, handleChange: any, invalid_fields: NullableCreateAccountPOSTFieldArray) {  
    if (invalid_fields.includes(field)) {
        return (
            <Box width={1}>
                <Grid item >
                    <TextField 
                        error
                        type={(field === 'request_password' ? 'password' : 'text')}
                        id={field}
                        label={label}
                        value={value}
                        margin="normal"
                        autoComplete={autoComplete}
                        onChange={handleChange(field)}
                        fullWidth                
                    />
                </Grid>
            </Box>
        );
    }
    
    return (
        <Box width={1}>
            <Grid item >
                <TextField 
                    type={(field === 'request_password' ? 'password' : 'text')}
                    id={field}
                    label={label}
                    value={value}
                    margin="normal"
                    autoComplete={autoComplete}
                    onChange={handleChange(field)}
                    fullWidth
                    />
            </Grid>
        </Box>
    );
}

/**
 * wrapper for navigation control
 * @param content content to be displayed in this control
 */
function Control(content: any) {
    return (
        <Box width={1} className={'control-container'}>
            <Grid item>
                {content}
            </Grid>
        </Box>
    );
}

