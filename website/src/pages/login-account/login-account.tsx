import * as React from 'react';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Typography, Button, Link, Grid } from '@material-ui/core';
import { Form } from '../../components/form';
import { LoginAccountPOST } from '../../models/http-requests';
import { FormFieldParams, change_event_function_1PV } from '../../components/form-field';
import { GetHttpRequestDisplayName, http_post, LOGIN_ACCOUNT_END_POINT, HTTP_SUCCESS } from '../../services/http-service';
import { get_all_null_fields, validate_email, validate_password, password_contains_lowercase, password_contains_uppercase, password_contains_number, password_contains_symbol, password_is_min_size } from '../../services/validation-service';

/**
 * type definition for complex type
 */
type NullableLoginAccountPOSTFieldArray = (keyof LoginAccountPOST| null)[];


interface Props {
    history: any
}

interface State {
    request_data:       LoginAccountPOST;
    notification_data:  NotificationFunctionalProps;
    invalid_fields:     NullableLoginAccountPOSTFieldArray;
}

type FieldMetadata = {
    key:            keyof LoginAccountPOST;
    auto_complete:  string;
};

const fields: FieldMetadata[] = [
    {key: 'request_email', auto_complete: 'email'},
    {key: 'request_password', auto_complete: 'password'}
];

/**
 * page displayed to user to login to the platform. contains controls to perform 
 * the login and create an account (see create-account-page.tsx) 
 */
export default class LoginAccountPage extends React.Component<Props, State> {

    state: State = {
        request_data: {
            request_email: '',
            request_password: ''
        },
        notification_data: {
            open: false,
            message: "",
            on_close: () => {this.setState({notification_data:{...this.state.notification_data, open: false}})}
        },
        invalid_fields: []
    };

     // function to update state of field. bound to this component
    private handleChange: change_event_function_1PV<keyof LoginAccountPOST> = (id: keyof LoginAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({request_data: {...this.state.request_data, [id]: event.target.value}});
    
        if (event.target.value === '') {
            this.setState({invalid_fields: this.state.invalid_fields.concat(id)});
        } else {
            this.setState({invalid_fields: this.state.invalid_fields.filter(function(element){return element !== id;})});
        }
    }

    private handleLoginAccount = () => {
        // validate null input
        if (!this.performNullInputValidation()) { return; }

        // validate email address (format)
        if (!this.performEmailValidation()) { return; }
        
        // local password validate (format)
        if (!this.performPasswordValidation()) { return; }
        
        // make request 
        this.performLoginAccountRequest();
    }

    private performNullInputValidation = () => {
        let all_null_fields = get_all_null_fields(this.state.request_data);
        this.setState({invalid_fields: all_null_fields});
        
        // if there is error, notify user and skip sending the request
        let first_null_field = all_null_fields[0];
        if (first_null_field != null) {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: GetHttpRequestDisplayName<LoginAccountPOST>(first_null_field) + ' cannot be empty'}});
            return false;
        }

        return true;
    }

    private performEmailValidation = () => {
        let email_validation: boolean = validate_email(this.state.request_data.request_email);

        if (!email_validation) {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: 'invalid email address entered'}});
        }

        return email_validation;
    }

    private performPasswordValidation = () => {
        let password_validation = validate_password(this.state.request_data.request_password, password_contains_lowercase, password_contains_uppercase, 
            password_contains_number, password_contains_symbol, password_is_min_size);

        if (!password_validation.result) {
            // ambiguous error message because we only soft validate the password
            this.setState({notification_data: {...this.state.notification_data, open: true, message: "incorrect email or password entered"}});
            return false;
        }

        return true;
    }

    private performLoginAccountRequest = () => {
        let result = http_post(LOGIN_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

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
                        <Typography variant='h1'>{'<\\>'}</Typography>
                        {Form(
                            fields.map<FormFieldParams<LoginAccountPOST>>(item => {
                                return {
                                    field: item.key,
                                    label: GetHttpRequestDisplayName<LoginAccountPOST>(item.key),
                                    value: this.state.request_data[item.key], 
                                    auto_complete: item.auto_complete,
                                    handle_change: this.handleChange, 
                                    type: item.key === 'request_password' ? 'password' : 'text', 
                                    error: this.state.invalid_fields.includes(item.key)
                                }
                            }), [
                                {
                                    content: <Button color='primary' variant='contained' fullWidth onClick={this.handleLoginAccount}>Login</Button>,
                                    direction: 'top', 
                                    padding_size: 'x-small'
                                },{
                                    content:
                                        <Grid
                                            container
                                            spacing={0}
                                            direction="row"
                                            alignItems="stretch"
                                            justify="space-between"
                                        >
                                                <Grid item>
                                                    <Typography align='center'>
                                                        <Link component='button' variant='subtitle2' onClick={()=>{this.props.history.push('/createaccount')}}> 
                                                            don't have an account? register here
                                                        </Link>
                                                    </Typography>
                                                </Grid> 
                                                <Grid item>
                                                <Typography align='center'>
                                                    <Link component='button' variant='subtitle2' onClick={()=>{this.props.history.push('/forgotpassword')}}> 
                                                        forgot password
                                                    </Link>
                                                </Typography>
                                                </Grid>
                                        </Grid>,
                                    direction: 'top', 
                                    padding_size: 'x-small'
                                },

                            ]
                        )}
                    </div>
                )}
                
                {/* Notification Manager*/}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }
}