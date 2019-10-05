import H from 'history/index';

/**
 * redirects to a given url 
 * @param history current history of this browser session
 * @param page the url to navigate to 
 * @param replace true if <page> should be replaced instead of pushed onto the history 
 */
export function redirect(history: H.History<any>, page: string = '/', replace: boolean = false): any {
    if (!replace) history.push(page);
    else history.replace(page);
} 