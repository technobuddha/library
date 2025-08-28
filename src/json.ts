import { type JsonPrimitive } from 'type-fest';

/**
 * Matches a JSON object.
 *
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be
 * extended from. Don't use this as a direct return type as the user would have to double-cast it:
 * `jsonObject as unknown as CustomResponse`. Instead, you could extend your CustomResponse type from
 * it to ensure your type only uses JSON-compatible types:
 * `interface CustomResponse extends TBJsonObject { … }`.
 * @group JSON
 * @category Serialization
 */
export type TBJsonObject = { [Key in string]: TBJsonValue } & {
  [Key in string]?: TBJsonValue | undefined;
};

/**
 * Matches a JSON array.
 * @group JSON
 * @category Serialization
 */
export type TBJsonArray = TBJsonValue[] | readonly TBJsonValue[];

/**
 * Matches any valid JSON primitive value.
 * @group JSON
 * @category Serialization
 */
export type TBJsonPrimitive = JsonPrimitive | Date | RegExp | bigint;

/**
 * Matches any valid JSON value.
 * @group JSON
 * @category Serialization
 */
export type TBJsonValue = TBJsonPrimitive | TBJsonObject | TBJsonArray;

/**
 * The beginning of a special JSON value
 * @group JSON
 * @category Serialization
 */
export const specialBegin = '﴾';

/**
 * The end of a special JSON value
 * @group JSON
 * @category Serialization
 */
export const specialFinish = '﴿';
