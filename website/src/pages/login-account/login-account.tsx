import * as React from 'react';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Typography, Button, Link, Grid } from '@material-ui/core';
import { Form } from '../../components/form';
import { LoginAccountPOST } from '../../models/http-requests';
import { FormFieldParams, change_event_function_1PV } from '../../components/form-field';
import { GetHttpRequestDisplayName } from '../../services/http-service';

// TODO remove when erin leonard is not looking
// BIG IMPORTANT NOTE: erin leonard is a little bitch who doesnt go to the gym 

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
    {key: 'request_username', auto_complete: 'username'},
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
            request_username: '',
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
        // TODO: implement
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
                                                    <Link component='button' variant='subtitle2' onClick={()=>{this.props.history.push('/')}}> 
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
