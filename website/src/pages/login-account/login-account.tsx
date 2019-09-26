import * as React from 'react';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';
import AccountsPageContainer from '../../components/accounts-page-container';
import { Typography } from '@material-ui/core';

interface Props {

}

interface State {
    notification_data: NotificationFunctionalProps;
}

/**
 * page displayed to user to login to the platform. contains controls to perform 
 * the login and create an account (see create-account-page.tsx) 
 */
export default class LoginAccountPage extends React.Component<Props, State> {

    state: State = {
        notification_data: {
            open: false,
            message: "",
            on_close: () => {this.setState({notification_data:{...this.state.notification_data, open: false}})}
        }
    };

    render() {
        return (
            <div> 
                {AccountsPageContainer(
                    <div>
                        <Typography variant='h1'>{'<\\>'}</Typography>
                        {/* TODO add form component (refactored from create account) */}
                    </div>
                )}
                
                {/* Notification Manager*/}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }

}