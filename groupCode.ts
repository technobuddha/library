import toBasicLatin   from './toBasicLatin';
import sortOrder      from './sortOrder';

export function groupCode(input: string): string {
    let group    = toBasicLatin(sortOrder(input).substr(0, 1)).toUpperCase();

    if(group >= 'A' && group <= 'Z')
        return group;
    else
    if(group === '[')
        return '[]';
    else
        return '#';
}

export default groupCode;




