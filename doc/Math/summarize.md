<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / summarize

# Function: summarize()

> **summarize**(`input`: `number`): `string`

Defined in: [numbering/summarize.ts:19](https://github.com/technobuddha/library/blob/main/src/numbering/summarize.ts#L19)

Get a short description of a number

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | number to convert |

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
