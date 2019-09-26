import * as React from 'react';
import { Notification, NotificationFunctionalProps, NOTIFICATION_STYLE_ERROR } from '../../components/notification';

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
                {/* TODO: add page container component here*/}
                {/* Notification Manager*/}
                {Notification(this.state.notification_data, NOTIFICATION_STYLE_ERROR)}
            </div>
        );
    }

}