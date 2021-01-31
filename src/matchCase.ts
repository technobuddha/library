import isLowerCase   from './isLowerCase';
import isUpperCase   from './isUpperCase';
import toCapitalCase from './toCapitalCase';
import toSmallCase   from './toSmallCase';

/**
 * Attempt to convert the input string into the same case as the target string
 *
 * @remarks The best guess is made to try to figure out what case the target is in:
 *  * lowercase
 *  * UPPERCASE
 *  * Capitalcase
 *  * sMALLCASE
 *
 * @param input The input string
 * @param target The target string
 * @returns The input in the case case as the target string
 */
export function matchCase(input: string, target: string): string {
    if(isLowerCase(target))
        return input.toLowerCase();
    else if(isUpperCase(target))
        return input.toUpperCase();
    else if(target.length > 1 && isUpperCase(target[0]) && isLowerCase(target.substr(1)))
        return toCapitalCase(input, { lowerCase: true });
    else if(target.length > 1 && isLowerCase(target[0]) && isUpperCase(target.substr(1)))
        return toSmallCase(input, { upperCase: true });
    return input;
}

export default matchCase;
