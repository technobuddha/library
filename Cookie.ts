import formatDate from './formatDate';

export namespace Cookies
{
    let yummy: Record<string, string>;
    
    function init() {
        if(typeof yummy === 'undefined')
        {
            yummy =  Object.fromEntries(
                document.cookie.split(';').map(
                    cookie => cookie.split('=').map(crumb => decodeURIComponent(crumb.trim()))
                )
            )
        }
    }

    export function get(name: string): string {
        init();
        return yummy[name];
    }

    export function names(): string[] {
        init();
        return Object.keys(yummy);
    }

    export function add(name: string, value: string, expires?: string): void {
        init();
        if(document && document.cookie) {
            var cookie = name + '=' + encodeURIComponent(value) + '; Path=/';

            if(expires)
                cookie += '; Expires=' + formatDate(new Date(expires), 'cookie', { UTC: true });
            document.cookie = cookie;
        }
        yummy[name] = value;
    }

    export function del(name: string): void {
        init();
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT';
        delete yummy[name];
    }
}

export default Cookies;

