import { Button } from '@material-ui/core';
import React from 'react';
import { mode, MODE } from '../../App';
import AccountsPageContainer from '../../components/accounts-page-container';
import { AccountsPageHeader } from '../../components/accounts-page-header';
import { Form } from '../../components/forms/form';
import { FormFieldMetadata, FormFieldParams } from '../../components/forms/form-field';
import { LinkControl } from '../../components/link-control';
import { ShowNotification, NOTIFICATION_STYLE_DEFAULT } from '../../components/notification';
import { ForgotAccountPOST } from '../../models/http-requests';
import { HistoryPropInterface, NotificationStateInterface, RequestStateInterface, InvalidFieldsInterface } from '../../models/types';
import { HttpService, FORGOT_ACCOUNT_END_POINT } from '../../services/http-service';
import { PageService } from '../../services/page-service';
import { ValidationService } from '../../services/validation-service';

interface Props extends HistoryPropInterface {};

interface State extends RequestStateInterface<ForgotAccountPOST>, NotificationStateInterface, InvalidFieldsInterface<ForgotAccountPOST> {
    // invalid_fields: GenericNullKeyArray<ForgotAccountPOST>;
};

/**
 * definition of all the fields displayed on the forgot account form 
 */
const fields: FormFieldMetadata<ForgotAccountPOST>[] = [
    {key: 'request_email', auto_complete: 'email'}
];

export class ForgotAccountPage extends React.Component<Props, State> {

    state: State = {
        request_data: {
            request_email: ''
        },
        notification_data: {
            open: false, 
            message: "",
            parent: this,
            style: NOTIFICATION_STYLE_DEFAULT
        },
        invalid_fields: []
    }

    // private handleChange: handle_change_function_type<keyof ForgotAccountPOST> = (id: keyof ForgotAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({request_data: {...this.state.request_data, [id]: event.target.value}});

    //     if (event.target.value === '') {
    //         this.setState({invalid_fields: this.state.invalid_fields.concat(id)});
    //     } else {
    //         this.setState({invalid_fields: this.state.invalid_fields.filter(function(element){return element !== id;})});
    //     }
    // }

    private handleForgotAccount = () => {
        // temporary (for development builds only)
        if (mode === MODE.DEVELOPMENT) {
            PageService.redirect(this.props.history, '/login');
            return;
        }

        // validate null input
        if (!ValidationService.accounts_validate_null_input<ForgotAccountPOST, State>(this.state, this)) { return; }

        // validate email address (format)
        if (!ValidationService.accounts_validate_email<ForgotAccountPOST, State>(this.state, this, 'please enter a valid email address')) { return; }

        // make request 
        this.performForgotAccountRequest();
    }

    private performForgotAccountRequest = () => {
        let result = HttpService.http_post(FORGOT_ACCOUNT_END_POINT, JSON.stringify(this.state.request_data));

        if (result.statusCode === HttpService.SUCCESS) {
            PageService.redirect(this.props.history, '/login');
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
                        {Form(fields.map<FormFieldParams<ForgotAccountPOST, Props, State>>(item => {
                            return {
                                metadata:       item,
                                label:          HttpService.GetRequestDisplayName<ForgotAccountPOST>(item.key),
                                value:          this.state.request_data[item.key],
                                // handle_change:  this.handleChange,
                                error:          this.state.invalid_fields.includes(item.key),
                                type:           'text',
                                parent:         this
                            }
                        }), [{
                            content:        <Button style={{boxShadow: "none"}} color='primary' variant='contained' fullWidth onClick={this.handleForgotAccount}>Recover Account</Button>,
                            direction:      'top', 
                            padding_size:   'x-small'
                        }, {
                            content:  
                                LinkControl({
                                    text:           'remember your account? sign in here',
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
            </div>

        );
    }

}