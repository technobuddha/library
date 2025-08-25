<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / orderOfMagnitude

# Function: orderOfMagnitude()

```ts
function orderOfMagnitude(exponent: number): null | string;
```

Defined in: [numbering/order-of-magnitude.ts:17](https://github.com/technobuddha/library/blob/main/src/numbering/order-of-magnitude.ts#L17)

Get the spelled out word for an exponent

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `exponent` | `number` | The exponent to convert |

## Returns

`null` \| `string`

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

