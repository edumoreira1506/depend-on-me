import { Button, Typography, Grid } from '@material-ui/core';
import * as React from 'react';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Notification,  NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import { CreateAccountPOST } from '../../models/http-requests';
import { CREATE_ACCOUNT_END_POINT, http_post, HTTP_SUCCESS, GetHttpRequestDisplayName } from '../../services/http-service';
import { FormFieldParams, FormFieldMetadata, handle_change_function_type } from '../../components/forms/form-field';
import { Form } from '../../components/forms/form';
import { LinkControl } from '../../components/link-control';
import { accounts_validate_null_input, accounts_validate_email, accounts_validate_password } from '../../services/validation-service';
import { RequestStateInterface, NotificationStateInterface, GenericNullKeyArray } from '../../models/types';
import H from 'history/index';
import { redirect } from '../../services/page-service';
import WebRoundedIcon from '@material-ui/icons/WebRounded';

/**
 * definition of all the fields displayed on the create account form 
 */
const fields: FormFieldMetadata<CreateAccountPOST>[] = [
    {key: 'request_first_name', auto_complete: 'given_name'},
    {key: 'request_last_name',  auto_complete: 'family-name'},
    {key: 'request_email',      auto_complete: 'email'},
    {key: 'request_username',   auto_complete: 'username'},
    {key: 'request_password',   auto_complete: 'new-password'}
];


/**
 * Props for this component. No props have been defined for this component
 */
interface Props {
    history: H.History<any>;
}

/**
 * State for this component. contains user data structure to store information
 * to create a new account
 */
interface State extends NotificationStateInterface, RequestStateInterface<CreateAccountPOST> {
    invalid_fields: GenericNullKeyArray<CreateAccountPOST>;
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
    private handleChange: handle_change_function_type<keyof CreateAccountPOST> = (id: keyof CreateAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) => { 
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
        if (!accounts_validate_null_input<CreateAccountPOST, State>(this.state, this)){ return; }

        // validate email is the correct format
        if (!accounts_validate_email<CreateAccountPOST, State>(this.state, this, 'invalid email address entered')) { return; }

        // validate password
        if (!accounts_validate_password<CreateAccountPOST, State>(this.state, this)) { return; }

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

    render() {
        return (
            <div>
                {AccountsPageContainer(
                    <div>
                        <div style={{fontSize: '96px'}}>
                            <Grid container alignItems='center' justify='flex-start' direction='row'>
                                <Grid item>
                                    <WebRoundedIcon fontSize='inherit'/>   
                                </Grid>                   
                                <Grid item>
                                    <Typography variant='h4'>depend on me</Typography>                     
                                </Grid>
                            </Grid>
                        </div>
                        {Form(fields.map<FormFieldParams<CreateAccountPOST>>(item => {
                             return {
                                metadata:       item,
                                label:          GetHttpRequestDisplayName<CreateAccountPOST>(item.key),
                                value:          this.state.request_data[item.key],
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
                                    handle_click:   () => redirect(this.props.history, '/login')
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