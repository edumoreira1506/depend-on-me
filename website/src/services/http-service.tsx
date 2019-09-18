/**
 * performs a http POST request
 * @param url the location to send the request to  
 * @param body the data being sent in the request in JSON string form 
 * @returns the http response json
 */
export function http_post(url: string, body: string): any {
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: body
    }).then(response => response.json()).then((data) => {
        // return the response 
        return data;
    });

    // error occurred while preforming the request
    console.log('error occurred while performing the POST request to [' + url + ']');
    // an internal error occurred return nothing 
    return {};
}

// TODO http_get

/**
 * this is the value of the code returned when an http request successfully completes
 */
export const HTTP_SUCCESS: number = 200;