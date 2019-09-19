/**
 * computes the first null or empty string field in the object data
 * @param data the set to iterate over
 * @returns the first key that has a null or empty string value 
 */
export function get_first_null_field(data: any): any {
    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            return key;
        }
    }
    return null;
}

/**
 * computes all null and empty string fields in the object data
 * @param data the set to iterate over
 * @return the set of keys that have a null or empty string value
 */
export function get_all_null_fields(data: any):any {
    let keys: any[] = [];
    for (let key in data) {
        if (data[key] === null || data[key] === "") {
            keys.push(key);
        }
    }
    return keys;
}