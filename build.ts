import { empty }  from './constants';
import isFunction from 'lodash/isFunction';

/**
  * Concatenates strings and/or arrays of strings
  * @param args		A list of strings and/or string arrays to concatenate. If not a string,
  * @returns		The concatenation of {@code args}.
  */
export function build(...args: (string | string[] | (() => string | string[]))[]): string
{
	return args.flatMap(a => isFunction(a) ? a() : a).join(empty);
}

export default build;
