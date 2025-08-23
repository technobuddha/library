<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / graphQL

# Function: graphQL()

## Call Signature

> **graphQL**(`template`: `TemplateStringsArray`, ...`args`: [`GraphQLValue`](GraphQLValue.md)[]): `string`

Defined in: [graph-ql.ts:43](https://github.com/technobuddha/library/blob/main/src/graph-ql.ts#L43)

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

Defined in: [graph-ql.ts:44](https://github.com/technobuddha/library/blob/main/src/graph-ql.ts#L44)

Tagged template function for constructing GraphQL queries or mutations.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `arg` | [`GraphQLValue`](GraphQLValue.md) |

### Returns

`string`

The resulting GraphQL query string with interpolated values.
