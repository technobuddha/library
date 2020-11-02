
const re    = /^(\p{Lu})+$/u;

export function isUpperCase(input: string): boolean {
    return re.test(input);
}

export default isUpperCase;
