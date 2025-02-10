<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / summarize

# Function: summarize()

> **summarize**(`input`, `options`): `string`

Defined in: [cardinal.ts:519](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L519)

Get a short description of a number

## Parameters

### input

`number`

number to convert

### options

[`OptionsIllion`](../type-aliases/OptionsIllion.md) = `{}`

see [OptionsIllion](../type-aliases/OptionsIllion.md)

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
