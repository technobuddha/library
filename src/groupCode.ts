import toASCII   from './toASCII';
import sortOrder      from './sortOrder';

/**
 * Determine the group code (A-Z, [] or #) to place an item under
 *
 * @remarks The group code is made by taking the first letter of the *description*.  As a special
 * case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
 * under #.
 *
 * @param input a description
 * @returns The group code
 */
export function groupCode(input: string): string {
    const group = toASCII(sortOrder(input).slice(0, 1)).toUpperCase();

    if(group >= 'A' && group <= 'Z')
        return group;
    else if(group === '[')
        return '[]';
    return '#';
}

export default groupCode;
