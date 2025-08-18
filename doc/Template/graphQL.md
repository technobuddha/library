<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / graphQL

# Function: graphQL()

## Call Signature

> **graphQL**(`template`: `TemplateStringsArray`, ...`args`: [`GraphQLValue`](GraphQLValue.md)[]): `string`

Defined in: [graphql.ts:40](https://github.com/technobuddha/library/blob/main/src/graphql.ts#L40)

Tagged template function for constructing GraphQL queries or mutations.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `template` | `TemplateStringsArray` | The template string array representing the static parts of the GraphQL query. |
| ...`args` | [`GraphQLValue`](GraphQLValue.md)[] | The dynamic values to interpolate into the query. |

### Returns

`string`

The resulting GraphQL query string with interpolated values.

## Call Signature

> **graphQL**(`arg`: [`GraphQLValue`](GraphQLValue.md)): `string`

Defined in: [graphql.ts:41](https://github.com/technobuddha/library/blob/main/src/graphql.ts#L41)

Tagged template function for constructing GraphQL queries or mutations.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `arg` | [`GraphQLValue`](GraphQLValue.md) |

### Returns

`string`

The resulting GraphQL query string with interpolated values.
