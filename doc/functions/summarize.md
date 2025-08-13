<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / summarize

# Function: summarize()

> **summarize**(`input`: `number`, `options`: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`CardinalOptions`](../type-aliases/CardinalOptions.md), `"groups"` \| `"digits"`\>): `string`

Defined in: [cardinal.ts:517](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L517)

Get a short description of a number

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | number to convert |
| `options` | [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`CardinalOptions`](../type-aliases/CardinalOptions.md), `"groups"` \| `"digits"`\> | see [CardinalOptions](../type-aliases/CardinalOptions.md) |

## Returns

`string`

number as text

## Remarks

this is a shortcut to calling cardinal with options {groups: 1, digits: true}

## Examples

```ts
1000000 "1 million"
```

```ts
101323847382459 "101 trillion"
```
