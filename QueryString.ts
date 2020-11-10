import delimited from './delimited';

let vars: Record<string, string>;

function init() {
    if(document.URL?.includes('?')) {
        vars = Object.fromEntries(
            delimited(document.URL, '?', 0).split('&').map(hash => hash.split('='))
        );
    } else {
        vars = {};
    }
}

export function get(name: string) {
    if(typeof(vars) === 'undefined') init();
    return vars[name];
}

export default {get}
