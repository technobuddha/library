import isNil        from 'lodash/isNil';
import escapeRegExp from 'lodash/escapeRegExp';

type Options = {
    indenter?: string
}

/**
  * Determine the indentation level of text
  * @param input    The indented text
  * @param pattern    String or RegExp used to determine the indentation character (default: whitespace)
  */
export function getIndent(input: string, {indenter = '\t'}: Options = {}): number {
    const matches = input.match(new RegExp('^(' + escapeRegExp(indenter) + ')+', 'gm'));
    if(isNil(matches))
      return 0;
    return (Math.min(...matches.map(m => m.length)) || 0) / indenter.length;
}

export default getIndent;
