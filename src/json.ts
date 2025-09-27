/**
 * Matches a JSON object.
 *
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be
 * extended from. Don't use this as a direct return type as the user would have to double-cast it:
 * `jsonObject as unknown as CustomResponse`. Instead, you could extend your CustomResponse type from
 * it to ensure your type only uses JSON-compatible types:
 * `interface CustomResponse extends JSONObject { … }`.
 * @group JSON
 * @category Serialization
 */
export type JSONObject = { [Key in string]: JSONValue } & {
  [Key in string]?: JSONValue | undefined;
};

/**
 * Matches a JSON array.
 * @group JSON
 * @category Serialization
 */
export type JSONArray = JSONValue[] | readonly JSONValue[];

/**
 * Matches any valid JSON primitive value.
 * @group JSON
 * @category Serialization
 */
export type JSONPrimitive = null | boolean | number | string | Date | RegExp | bigint;

/**
 * Matches any valid JSON value.
 * @group JSON
 * @category Serialization
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

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
