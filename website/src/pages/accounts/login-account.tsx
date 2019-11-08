import * as React from 'react';
import { Notification, ShowNotification, NOTIFICATION_STYLE_DEFAULT } from '../../components/notification';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Button, Grid } from '@material-ui/core';
import { Form } from '../../components/forms/form';
import { LoginAccountPOST } from '../../models/http-requests';
import { FormFieldParams,  FormFieldMetadata } from '../../components/forms/form-field';
import { LOGIN_ACCOUNT_END_POINT, HttpService } from '../../services/http-service';
import { LinkControl } from '../../components/link-control';
import { RequestStateInterface, NotificationStateInterface, HistoryPropInterface, InvalidFieldsInterface } from '../../models/types';
import { ValidationService } from '../../services/validation-service';
import { PageService } from '../../services/page-service';
import { MODE, mode } from '../../App';
import { AccountsPageHeader } from '../../components/accounts-page-header';

interface Props extends HistoryPropInterface {
}

interface State extends RequestStateInterface<LoginAccountPOST>, NotificationStateInterface, InvalidFieldsInterface<LoginAccountPOST> {
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
            parent: this,
            style: NOTIFICATION_STYLE_DEFAULT
        },
        invalid_fields: []
    };

    private handleLoginAccount = () => {
        // temporary (for development builds only)
        if (mode === MODE.DEVELOPMENT) {
            PageService.redirect(this.props.history, '/home/0');
            return;
        }

        // validate null input
        if (!ValidationService.accounts_validate_null_input<LoginAccountPOST, State>(this.state, this)) { return; }

        // validate email address (format)
        if (!ValidationService.accounts_validate_email<LoginAccountPOST, State>(this.state, this, 'incorrect email or password entered')) { return; }

        // local password validate (format)
        if (!ValidationService.accounts_validate_password<LoginAccountPOST, State>(this.state, this, "incorrect email or password entered")) { return; }

        // make request 
        this.performLoginAccountRequest();
    }

    private performLoginAccountRequest = () => {
        let result = HttpService.http_post(LOGIN_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HttpService.SUCCESS) {
            PageService.redirect(this.props.history, '/home/0');
        } else {
            ShowNotification(this, result['error']);
        }
    }

    render() {
        return (
            <div> 
                {AccountsPageContainer(
                    <div>
                        { AccountsPageHeader() }
                        {Form(
                            fields.map<FormFieldParams<LoginAccountPOST, Props, State>>(item => {
                                return {
                                    metadata:       item,
                                    label:          HttpService.GetRequestDisplayName<LoginAccountPOST>(item.key),
                                    value:          this.state.request_data[item.key], 
                                    type:           item.key === 'request_password' ? 'password' : 'text', 
                                    error:          this.state.invalid_fields.includes(item.key),
                                    parent:         this
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
                {Notification(this)}
            </div>
        );
    }
}
