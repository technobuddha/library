import isNil from 'lodash/isNil';

type Options = {
    prefix?: string;
    suffix?: string;
}

/**
  * Extract the root word, removing a prefix and/or suffix
  * @param input        The word, which might have {@code prefix} before it, and {@code suffix} after it.
  * @param prefix        The prefix
  * @param suffix        The suffix
  * @returns            The root word
  */
export function root(input: string, {prefix, suffix}: Options = {}): string {
    if(!isNil(prefix)) {
        if(input.startsWith(prefix))
            input = input.substr(prefix.length);
    }

    if(!isNil(suffix)) {
        if(input.endsWith(suffix))
            input = input.substr(0, input.length - suffix.length);
    }

    return input;
}

export default root;
