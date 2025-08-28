<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Template](./index.md) / graphQL

# Function: graphQL()

Tagged template function for constructing GraphQL queries or mutations.

## Call Signature

```ts
function graphQL(template: TemplateStringsArray, ...args: GraphQLValue[]): string;
```

Defined in: [graph-ql.ts:36](https://github.com/technobuddha/library/blob/main/src/graph-ql.ts#L36)

Escapes and formats GraphQL query strings or values.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `template` | `TemplateStringsArray` | The template string array representing the static parts of the GraphQL query. |
| ...`args` | [`GraphQLValue`](GraphQLValue.md)[] | The dynamic values to interpolate into the query. |

### Returns

`string`

The resulting GraphQL query string with interpolated values.

## Call Signature

```ts
function graphQL(arg: GraphQLValue): string;
```

Defined in: [graph-ql.ts:42](https://github.com/technobuddha/library/blob/main/src/graph-ql.ts#L42)

Escape and format an individual GraphQL query string.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `arg` | [`GraphQLValue`](GraphQLValue.md) | The dynamic value to interpolate into the query. |

### Returns

`string`

The resulting GraphQL query string with interpolated values.

