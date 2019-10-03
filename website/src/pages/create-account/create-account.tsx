import { Button, Typography } from '@material-ui/core';
import * as React from 'react';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import { CreateAccountPOST } from '../../models/http-requests';
import { CREATE_ACCOUNT_END_POINT, http_post, HTTP_SUCCESS, GetHttpRequestDisplayName } from '../../services/http-service';
import './create-account.css';
import { FormFieldParams } from '../../components/form-field';
import { Form } from '../../components/form';
import { LinkControl } from '../../components/link-control';
import { accounts_validate_null_input, accounts_validate_email, accounts_validate_password } from '../../services/validation-service';

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
    history: any
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
    private handleCreateAccount = () => {
        // validate all fields are set
        if (!accounts_validate_null_input(this.state, this)){ return; }

        // validate email is the correct format
        if (!accounts_validate_email(this.state, this, 'invalid email address entered')) { return; }

        // validate password
        if (!accounts_validate_password(this.state, this)) { return; }

        // make request
        this.performCreateAccountRequest();
    }

    private performCreateAccountRequest = () => {
        let result = http_post(CREATE_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HTTP_SUCCESS) {
            this.props.history.push('/home');
        } else {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: result['error']}});
        }
    }

    // TODO refactor to service level method
    redirect = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                {AccountsPageContainer(
                    <div>
                        {/* TODO refactor this into a page header */}
                        <Typography variant='h1'>{'<\\>'}</Typography>
                        {Form(fields.map<FormFieldParams<CreateAccountPOST>>(item => {
                             return {
                                field:          item.key,
                                label:          GetHttpRequestDisplayName<CreateAccountPOST>(item.key),
                                value:          this.state.request_data[item.key],
                                auto_complete:  item.autocomplete,
                                handle_change:  this.handleChange,
                                error:          this.state.invalid_fields.includes(item.key),
                                type:           item.key === 'request_password' ? 'password' : 'text'
                            }
                        }), [{
                            content:        <Button color='primary' variant='contained' fullWidth onClick={this.handleCreateAccount}>Create Account</Button>,
                            direction:      'top', 
                            padding_size:   'x-small'
                        }, {
                            content:  
                                LinkControl({
                                    text:           'already have an account? sign in here',
                                    align:          'center',
                                    variant:        'subtitle2',
                                    handle_click:   this.redirect
                                }),
                            direction:'top', 
                            padding_size: 'x-small'
                        }] 
                        )}
                    </div>
                )}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }
}