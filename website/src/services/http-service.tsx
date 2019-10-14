import { HttpRequest } from "../models/http-requests";
import { UtilityService } from "./utility-service";

/**
 * frontend http microservice
 */
export class HttpService {

    // ============================================================================================
    // CONSTANTS
    // ============================================================================================

    /**
     * status code returned by a successful http request 
     */
    public static SUCCESS: number = 200;

    // ============================================================================================
    // PUBLIC METHODS
    // ============================================================================================    

    /**
     * performs a http POST request
     * @param url the location to send the request to  
     * @param body the data being sent in the request in JSON string form 
     * @returns the http response json
     */
    public static http_post(url: string, body: string): any {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: body
        }).then(response => response.json()).then((data) => {
            // return the response 
            return data;
        }).catch(err => {
            console.log('error occurred while performing the POST request to [ ' + url + '] [' + err + ']');
            // request failed, return nothing 
            return {'error': 'an error has occurred'};
        });

        // error occurred while preforming the request
        console.log('error occurred while performing the POST request to [' + url + ']');
        // an internal error occurred return nothing 
        return {'error': 'an error has occurred'};
    }

    // TODO http_get

    /**
     * generic function to convert a field name to a display name 
     * 
     * NOTE: currently all http request interfaces follow the naming scheme where <field_name> is equivaent to 
     * 'request_<display_name>'. this function is designed to extract <display_name> from <field_name>
     * @param field_name the name being converted to a display name (text that can be displayed to the user) 
     */
    public static GetRequestDisplayName<RequestInterface extends HttpRequest>(field_name: keyof RequestInterface): string {
        return UtilityService.remove_prefix(field_name.toString(), '_');
    }


}

// TODO: abstract to general constants file 
// TODO: consider adding a url service 
/**
 * this is the value of the code returned when an http request successfully completes
 */
//export const HTTP_SUCCESS: number = 200;

/**
 * API endpoint for all server related calls
 */
const API_END_POINT: string = "www.ourapiendpoint.com"; // TODO change this to be the correct value

/**
 * route of create-account endpoint on the server
 */
export const CREATE_ACCOUNT_END_POINT: string = API_END_POINT + "/createAccount";
export const LOGIN_ACCOUNT_END_POINT: string = API_END_POINT + "/loginAccount"