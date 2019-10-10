import * as React from 'react';
import { Notification, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Typography, Button, Grid } from '@material-ui/core';
import { Form } from '../../components/forms/form';
import { LoginAccountPOST } from '../../models/http-requests';
import { FormFieldParams, handle_change_function_type, FormFieldMetadata } from '../../components/forms/form-field';
import { LOGIN_ACCOUNT_END_POINT, HttpService } from '../../services/http-service';
import { LinkControl } from '../../components/link-control';
import { RequestStateInterface, NotificationStateInterface, GenericNullKeyArray } from '../../models/types';
import { accounts_validate_null_input, accounts_validate_email, accounts_validate_password } from '../../services/validation-service';
import H from 'history/index';
import { PageService } from '../../services/page-service';
import WebRoundedIcon from '@material-ui/icons/WebRounded';
import { MODE, mode } from '../../App';

interface Props {
    history: H.History<any>;
}

interface State extends RequestStateInterface<LoginAccountPOST>, NotificationStateInterface {
    invalid_fields: GenericNullKeyArray<LoginAccountPOST>;
}

const fields: FormFieldMetadata<LoginAccountPOST>[] = [
    {key: 'request_email',      auto_complete: 'email'},
    {key: 'request_password',   auto_complete: 'current-password'}
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
    private handleChange: handle_change_function_type<keyof LoginAccountPOST> = (id: keyof LoginAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({request_data: {...this.state.request_data, [id]: event.target.value}});
    
        if (event.target.value === '') {
            this.setState({invalid_fields: this.state.invalid_fields.concat(id)});
        } else {
            this.setState({invalid_fields: this.state.invalid_fields.filter(function(element){return element !== id;})});
        }
    }

    private handleLoginAccount = () => {
        // temporary (for development builds only)
        if (mode === MODE.DEVELOPMENT) {
            PageService.redirect(this.props.history, '/home/0');
            return;
        }

        // validate null input
        if (!accounts_validate_null_input<LoginAccountPOST, State>(this.state, this)) { return; }

        // validate email address (format)
        if (!accounts_validate_email<LoginAccountPOST, State>(this.state, this, 'incorrect email or password entered')) { return; }

        // local password validate (format)
        if (!accounts_validate_password<LoginAccountPOST, State>(this.state, this, "incorrect email or password entered")) { return; }

        // make request 
        this.performLoginAccountRequest();
    }

    private performLoginAccountRequest = () => {
        let result = HttpService.http_post(LOGIN_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HttpService.SUCCESS) {
            PageService.redirect(this.props.history, '/home/0');
        } else {
            this.setState({notification_data: {...this.state.notification_data, open: true, message: result['error']}});
        }
    }

    render() {
        return (
            <div> 
                {AccountsPageContainer(
                    <div>
                        {/* <Typography variant='h1'>{'<\\>'}</Typography> */}
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
                        {Form(
                            fields.map<FormFieldParams<LoginAccountPOST>>(item => {
                                return {
                                    metadata:       item,
                                    label:          HttpService.GetRequestDisplayName<LoginAccountPOST>(item.key),
                                    value:          this.state.request_data[item.key], 
                                    handle_change:  this.handleChange, 
                                    type:           item.key === 'request_password' ? 'password' : 'text', 
                                    error:          this.state.invalid_fields.includes(item.key)
                                }
                            }), [
                                {
                                    content: <Button style={{boxShadow: "none"}} color='primary' variant='contained' fullWidth onClick={this.handleLoginAccount}>Login</Button>,
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
                                                {LinkControl({
                                                    text:           "don't have an account? register here",
                                                    align:          'center',
                                                    variant:        'subtitle2',
                                                    handle_click:   (() => PageService.redirect(this.props.history, '/createaccount'))
                                                })}
                                            </Grid> 
                                            <Grid item>
                                                {LinkControl({
                                                    text:           "forgot password",
                                                    align:          'center',
                                                    variant:        'subtitle2',
                                                    handle_click:   (() => PageService.redirect(this.props.history, '/forgotaccount'))
                                                })}
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
