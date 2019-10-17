import React from "react";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { NotificationStateInterface } from "../models/types";

/**
 * parameters required to define the functionality of a notification.
 * 
 * this should be defined at runtime 
 */
export interface NotificationFunctionalProps<Props, State extends NotificationStateInterface> {
    open:       boolean;
    message:    string;
    parent:     React.Component<Props, State>;
    style:      NotificationStyleProps;
}

/**
 * parameters required to define the style of a notification.
 * this also includes the position 
 * 
 * this should be defined at compile time
 */
interface NotificationStyleProps extends SnackbarOrigin {
    duration:               number;
    background_color:       string;
}

/**
 * wrapper for a snackbar, splits parameters into 2 parts, functional and style 
 * @param functional parameters that determine what content is displayed
 * @param style parameters that determine how the content is displayed
 */
export function Notification<Props, State extends NotificationStateInterface>(parent: React.Component<Props, State>) {
     return (
        <Snackbar
            anchorOrigin={{
                horizontal: parent.state.notification_data.style.horizontal,
                vertical: parent.state.notification_data.style.vertical,
            }}
            open={parent.state.notification_data.open}
            autoHideDuration={parent.state.notification_data.style.duration}
            onClose={() => HideNotification(parent.state.notification_data.parent)}
        >
            <SnackbarContent 
                style={{backgroundColor: parent.state.notification_data.style.background_color, justifyContent: 'center'}}
                message={<span id="message-id">{parent.state.notification_data.message}</span>}
            />
        </Snackbar>
    );
}

export const NOTIFICATION_STYLE_ERROR: NotificationStyleProps = {vertical: 'bottom', horizontal: 'left', duration: 5000, background_color: '#FF4444'}
export const NOTIFICATION_STYLE_DEFAULT: NotificationStyleProps = NOTIFICATION_STYLE_ERROR;

/**
 * hides a notification
 * @param parent the container component hiding the notification
 */
export function HideNotification<Props, State extends NotificationStateInterface>(parent: React.Component<Props, State>): void {
    parent.setState({notification_data: {...parent.state.notification_data, open: false}})
}

/**
 * 
 * @param parent 
 * @param message 
 * @param style 
 */
export function ShowNotification<Props, State extends NotificationStateInterface>(parent: React.Component<Props, State>, message: string, style?: NotificationStyleProps): void {
    let not_null_style: NotificationStyleProps =  style === undefined ? NOTIFICATION_STYLE_DEFAULT : style;
    parent.setState({notification_data: {...parent.state.notification_data, open: true, message: message, style: not_null_style}});
}