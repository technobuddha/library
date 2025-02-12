<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / orderOfMagnitude

# Function: orderOfMagnitude()

> **orderOfMagnitude**(`exponent`: `number`): `string` \| `null`

Defined in: [cardinal.ts:519](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L519)

Get the spelled out word for an exponent

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `exponent` | `number` | The exponent to convert |

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
