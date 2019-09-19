import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { CreateAccountPOST } from '../../models/http-requests';
import { CREATE_ACCOUNT_END_POINT, http_post, HTTP_SUCCESS } from '../../services/http-service';
import './create-account.css';
import { NOTIFICATION_STYLE_ERROR, Notification, NotificationFunctionalProps } from '../../components/notification';

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
            request_username:   "",
            request_email:      "",
            request_first_name: "",
            request_last_name:  "",
            request_password:   "",
        },
        notification_data: {
            open: false, 
            message: "",
            on_close: () => {this.setState({notification_data: {...this.state.notification_data, open: false}})}
        }
    };

    // function to update state of field. bound to this component
    handleChange = (id: keyof CreateAccountPOST) => (event: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({request_data: {...this.state.request_data, [id]: event.target.value}});
    }
      
    // function to handle creating an account from the values currently defined in state
    handleCreateAccount = () => {
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
                {PageContainer(
                    <div>
                        <Typography variant='h1'>{'<\\>'}</Typography>
                        {Form(this.state.request_data, this.handleChange, this.handleCreateAccount)}
                    </div>
                )}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }
}

// TODO: abstract the below functional components to be public as needed
// TODO: replace content with array, to allow for mulitple displays
/**
 * wrapper for all content displayed on the page 
 * @param content the content being displayed on the page
 */
function PageContainer(content: any) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="flex-start"
            justify="center"
            className={'container'}
        >
            <Grid item md={6} className={'group-container'}>
                {content}
            </Grid>
        </Grid>
    );
}

/**
 * container for all fields and controls in the account creation form
 * @param state the state of the page
 * @param handleChange the function to handle a change from input to controls
 * @param handleCreateAccount the function used to create a new account
 */
function Form(state: CreateAccountPOST, handleChange: any, handleCreateAccount: any) {
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
                {Field('request_first_name', 'first name', state.request_first_name, 'given-name', handleChange)}
                {Field('request_last_name', 'last name', state.request_last_name, 'family-name', handleChange)}
                {Field('request_email', 'email', state.request_email, 'email', handleChange)}
                {Field('request_username', 'username', state.request_username, 'none', handleChange)}
                {Field('request_password', 'password', state.request_password, 'none', handleChange)}

                {/* navigation group */}
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
 */
function Field(field:keyof CreateAccountPOST, label:string, value:string, autoComplete:string, handleChange: any) {
    return (
        <Grid item >
            <TextField 
                id={field}
                label={label}
                value={value}
                margin="normal"
                autoComplete={autoComplete}
                onChange={handleChange(field)}
                style={{minWidth: '20vw'}}
            />
        </Grid>
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
