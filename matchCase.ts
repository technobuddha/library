import isLowerCase				from './isLowerCase';
import isUpperCase				from './isUpperCase';
import toCapitalCase			from './toCapitalCase';
import toSmallCase				from './toSmallCase';

export function matchCase(input: string, target: string): string {
	if(isLowerCase(target))
		return input.toLowerCase();
	else if(isUpperCase(target))
		return input.toUpperCase();
	else if(target.length > 1 && isUpperCase(target[0]) && isLowerCase(target.substr(1)))
		return toCapitalCase(input, {lowerCase: true});
	else if(target.length > 1 && isLowerCase(target[0]) && isUpperCase(target.substr(1)))
		return toSmallCase(input, { upperCase: true});
	else
		return input;
}

export default matchCase;
