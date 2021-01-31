type Options = {
    /** The indentation character */
    indenter?: string;
};

/**
 * Indent each line of a string
 *
 * @param input The string to indent
 * @param __namedParameters see {@Options}
 * @default indenter space
 * @returns string with each line indented
 */
export function indent(input: string, { indenter = ' ' }: Options = {}): string {
    return input.replace(/^/ugm, indenter);
}

export default indent;
