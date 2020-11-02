import isNaN from 'lodash/isNaN';

export function isValidDate(input: Date): boolean {
	return !isNaN(input.valueOf());
}

export default isValidDate;
