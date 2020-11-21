import formatDate from './formatDate';

let yummy: Record<string, string>;

/**
 * Initialize the cookie system with the browsers cookies
 */
function init(): void {
    if(typeof yummy === 'undefined') {
        parse(document.cookie);
    }
}

/**
 * Parse a string containing cookies for use by other cookie method
 * 
 * @param input string to be decoded
 */
export function parse(input: string): void {
    if(typeof yummy === 'undefined') {
        yummy =  Object.fromEntries(input.split(';').map(
            cookie => cookie.split('=').map(crumb => decodeURIComponent(crumb.trim()))
        ));
    }
}

/**
 * Get the value of a cookie
 * 
 * @param name name of a cookie
 */
export function get(name: string): string | undefined {
    init();
    return yummy[name];
}

/**
 * Get the names of all cookies
 * 
 * @returns array of cookie names
 */
export function names(): string[] {
    init();
    return Object.keys(yummy);
}

/**
 * Add or update a cookie
 * 
 * @param name name of the cookie
 * @param value value of the cookie
 * @param expires Expiration date
 */
export function add(name: string, value: string, expires?: string | Date): void {
    init();
    if(document && document.cookie) {
        let cookie = name + '=' + encodeURIComponent(value) + '; Path=/';

        if(expires)
            cookie += '; Expires=' + formatDate(new Date(expires), 'cookie', { UTC: true });
        document.cookie = cookie;
    }
    yummy[name] = value;
}

/** 
 * Delete a cookie
 * 
 * @param name 
 */
export function del(name: string): void {
    init();
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
    delete yummy[name];
}

export default {init, get, names, add, del};

