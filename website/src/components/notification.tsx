import React from "react";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { Snackbar, SnackbarContent } from "@material-ui/core";

/**
 * parameters required to define the functionality of a notification.
 * 
 * this should be defined at runtime 
 */
export interface NotificationFunctionalProps {
    open:                   boolean;
    message:                string;
    on_close:               any;
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
export function Notification(functional: NotificationFunctionalProps, style: NotificationStyleProps) {
     return (
        <Snackbar
            anchorOrigin={{
                horizontal: style.horizontal,
                vertical: style.vertical,
            }}
            open={functional.open}
            autoHideDuration={style.duration}
            onClose={functional.on_close}
        >
            <SnackbarContent 
                style={{backgroundColor: style.background_color, justifyContent: 'center'}}
                message={<span id="message-id">{functional.message}</span>}
            />
        </Snackbar>
    );
}

export const NOTIFICATION_STYLE_ERROR: NotificationStyleProps = {vertical: 'bottom', horizontal: 'left', duration: 5000, background_color: '#FF4444'}