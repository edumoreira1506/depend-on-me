import { Button } from '@material-ui/core';
import * as React from 'react';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Notification, ShowNotification, NOTIFICATION_STYLE_DEFAULT } from '../../components/notification';
import { CreateAccountPOST } from '../../models/http-requests';
import { CREATE_ACCOUNT_END_POINT, HttpService } from '../../services/http-service';
import { FormFieldParams, FormFieldMetadata } from '../../components/forms/form-field';
import { Form } from '../../components/forms/form';
import { LinkControl } from '../../components/link-control';
import { ValidationService } from '../../services/validation-service';
import { RequestStateInterface, NotificationStateInterface, HistoryPropInterface, InvalidFieldsInterface } from '../../models/types';
import { PageService } from '../../services/page-service';
import { mode, MODE } from '../../App';
import { AccountsPageHeader } from '../../components/accounts-page-header';

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
interface Props extends HistoryPropInterface {
}

/**
 * State for this component. contains user data structure to store information
 * to create a new account
 */
interface State extends NotificationStateInterface, RequestStateInterface<CreateAccountPOST>, InvalidFieldsInterface<CreateAccountPOST> {
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
            parent: this,
            style: NOTIFICATION_STYLE_DEFAULT
        },
        invalid_fields: []
    };

    // function to handle creating an account from the values currently defined in state
    private handleCreateAccount = () => {
         // temporary (for development builds only)
         if (mode === MODE.DEVELOPMENT) {
            PageService.redirect(this.props.history, '/home/0');
            return;
        }
         
        // validate all fields are set
        if (!ValidationService.accounts_validate_null_input<CreateAccountPOST, State>(this.state, this)){ return; }

        // validate email is the correct format
        if (!ValidationService.accounts_validate_email<CreateAccountPOST, State>(this.state, this, 'invalid email address entered')) { return; }

        // validate password
        if (!ValidationService.accounts_validate_password<CreateAccountPOST, State>(this.state, this)) { return; }

        // make request
        this.performCreateAccountRequest();
    }

    private performCreateAccountRequest = () => {
        let result = HttpService.http_post(CREATE_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HttpService.SUCCESS) {
            PageService.redirect(this.props.history, '/home');
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
                        {Form(fields.map<FormFieldParams<CreateAccountPOST, Props, State>>(item => {
                             return {
                                metadata:       item,
                                label:          HttpService.GetRequestDisplayName<CreateAccountPOST>(item.key),
                                value:          this.state.request_data[item.key],
                                error:          this.state.invalid_fields.includes(item.key),
                                type:           item.key === 'request_password' ? 'password' : 'text',
                                parent:         this
                            }
                        }), [{
                            content:        <Button style={{boxShadow: "none"}} color='primary' variant='contained' fullWidth onClick={this.handleCreateAccount}>Create Account</Button>,
                            direction:      'top', 
                            padding_size:   'x-small'
                        }, {
                            content:  
                                LinkControl({
                                    text:           'already have an account? sign in here',
                                    align:          'center',
                                    variant:        'subtitle2',
                                    handle_click:   (() => PageService.redirect(this.props.history, '/login'))
                                }),
                            direction:'top', 
                            padding_size: 'x-small'
                        }] 
                        )}
                    </div>
                )}
                {Notification(this)}
            </div>
        );
    }
}