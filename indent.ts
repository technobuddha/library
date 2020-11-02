
type Options = {
    indenter?: string;
}

/**
  * Indent each line of a string
  * @param input        The string to indent
  * @param indentation    The text to use for indentation (default tab)
  */
export function indent(input: string, {indenter = '\t'}: Options = {}): string {
    return input.replace(/^/gm, indenter);
}

export default indent;
