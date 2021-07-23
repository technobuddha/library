import isNil from 'lodash/isNil';

export type Options = {
    /** The refix string to remove */
    prefix?: string;
    /** The suffix string to remove */
    suffix?: string;
};

/**
 * Extract the root word, removing a prefix and/or suffix
 *
 * @param input The word, which might have {@code prefix} before it, and {@code suffix} after it.
 * @param __namedParameters see {@link Options}
 * @returns The root word
 */
export function root(input: string, { prefix, suffix }: Options = {}): string {
    if(!isNil(prefix) && input.startsWith(prefix))
        input = input.substr(prefix.length);

    if(!isNil(suffix) && input.endsWith(suffix))
        input = input.substr(0, input.length - suffix.length);

    return input;
}

export default root;
