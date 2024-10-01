[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [cardinal](../README.md) / orderOfMagnitude

# Function: orderOfMagnitude()

> **orderOfMagnitude**(`exponent`): `string` \| `null`

Get the spelled out word for an exponent

## Parameters

• **exponent**: `number`

The exponent to convert

## Returns

`string` \| `null`

Order of Magnitude as text

## Remarks

This is only using the exponent, There is no limit to the numbers this function can represents, however Javascript/Typescript can only represent
numbers up to 1e308, which limits the numbers that this method can represent to 10^10^308 which is really really big.

## Examples

```ts
6 is "million"
```

```ts
303 is "centillion"
```

## Defined in

[cardinal.ts:487](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/cardinal.ts#L487)
