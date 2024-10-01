[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [cardinal](../README.md) / summarize

# Function: summarize()

> **summarize**(`input`, `options`): `string`

Get a short description of a number

## Parameters

• **input**: `number`

• **options**: [`OptionsIllion`](../type-aliases/OptionsIllion.md) = `{}`

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

## Defined in

cardinal.ts:503
