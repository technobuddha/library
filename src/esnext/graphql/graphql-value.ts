/**
 * A GraphQL Object, similar to a JSONObject
 * @group GraphQL
 * @category Objects
 */
export type GraphQLObject = { [Key in string]: GraphQLValue };

/**
 * A GraphQL Array, similar to a JSONArray
 * @group GraphQL
 * @category Objects
 */
export type GraphQLArray = GraphQLValue[];

/**
 * A GraphQL Value, similar to a JSONValue
 * @group GraphQL
 * @category Objects
 */
export type GraphQLValue = number | string | null | boolean | GraphQLArray | GraphQLObject;
