const re	= /^(\p{Ll})+$/u;

export function isLowerCase(input: string):	boolean {
	return re.test(input);
}

export default isLowerCase;