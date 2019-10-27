import { HttpRequest } from "./http-requests";
import { NotificationFunctionalProps } from "../components/notification";
import H from 'history/index';

export type display_content = any;
export type padding_direction = 'left'|'right'|'top'|'bottom'|'vertical'|'horizontal'|'all'|'none';
export type named_size = 'x-small'| 'small' | 'medium' | 'large';

export type GenericNullKeyArray<Type> = (keyof Type | undefined)[]

export interface HistoryPropInterface {
    history: H.History<any>;
}

export interface RequestStateInterface<RequestType extends HttpRequest> {
    request_data: RequestType;
}

export interface NotificationStateInterface {
    notification_data: NotificationFunctionalProps<any, any>;
}