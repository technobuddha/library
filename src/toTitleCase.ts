const titles = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

/**
 * Convert a string to a title, capitalizing each word, except for the small words
 * 
 * @param input the string to make title case
 * @return the string in title case
 */
export function toTitleCase(input: string): string {
    return input.replace(
        /[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,
        (match, index, title) => {
            if(index > 0 && index + match.length !== title.length &&
                match.search(titles) > -1 && title.charAt(index - 2) !== ":" &&
                (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                title.charAt(index - 1).search(/[^\s-]/) < 0) {
                return match.toLowerCase();
            }

            if(match.substr(1).search(/[A-Z]|\../) > -1) {
                return match;
            }

            return match.charAt(0).toUpperCase() + match.substr(1);
        }
    );
}

export default toTitleCase;
