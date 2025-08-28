<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / orderOfMagnitude

# Function: orderOfMagnitude()

```ts
function orderOfMagnitude(exponent: number): null | string;
```

Defined in: order-of-magnitude.ts:20

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
numbers up to 1e308, which limits the numbers that this method can represent to 10 \*\* 10 \*\* 308 which is really really big.

## Example

```typescript
orderOfMagnitude(3); // "thousand"
orderOfMagnitude(6); // "million"
orderOfMagnitude(9); // "billion"
orderOfMagnitude(0); // ""
orderOfMagnitude(-3); // null
```

