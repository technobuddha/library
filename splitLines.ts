import { empty } from './constants';

/**
  * Split a string into an array of lines within the string
  * @param input		The string to split
  */
export function splitLines(input: string): string[] {
	if(input === empty)
		return [];
	else
		return input.split(/\r\n|\n\r|\r|\n|\0/);
}


export default splitLines;
