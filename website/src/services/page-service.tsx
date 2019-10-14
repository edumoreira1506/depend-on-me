import H from 'history/index';

/**
 * frontend page microservice
 */
export class PageService {

    // ============================================================================================
    // PUBLIC METHODS
    // ============================================================================================

    /**
     * redirects to a given url 
     * @param history current history of this browser session
     * @param page the url to navigate to 
     * @param replace true if <page> should be replaced instead of pushed onto the history 
     */
    public static redirect(history: H.History<any>, page: string = '/', replace: boolean = false): any {
        if (!replace) {
            history.push(page);
        }
        else {
            history.replace(page);
        }
    }
}