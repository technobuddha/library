<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / summarize

# Function: summarize()

> **summarize**(`input`: `number`, `options`: [`OptionsIllion`](../type-aliases/OptionsIllion.md)): `string`

Defined in: [cardinal.ts:521](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L521)

Get a short description of a number

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | number to convert |
| `options` | [`OptionsIllion`](../type-aliases/OptionsIllion.md) | see [OptionsIllion](../type-aliases/OptionsIllion.md) |

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
