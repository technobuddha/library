import { space } from './constants';

/**
  * Return the number of unicode code points in a string
  */
export function unicodeLength(input: string):    number
{
    return input.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, space).length;
}

export default unicodeLength;
