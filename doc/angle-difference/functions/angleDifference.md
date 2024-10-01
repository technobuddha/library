[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [angle-difference](../README.md) / angleDifference

# Function: angleDifference()

> **angleDifference**(`startAngle`, `endAngle`): `number`

Computes the difference between startAngle and endAngle (angles in radians).

## Parameters

• **startAngle**: `number`

Start angle in radians.

• **endAngle**: `number`

End angle in radians.

## Returns

`number`

The number of radians that when added to *startAngle* will result in *endAngle*.

## Remarks

Positive numbers mean that the
direction is clockwise. Negative numbers indicate a counter-clockwise direction.
The shortest route (clockwise vs counter-clockwise) between the angles is used.
When the difference is PI radians, the function returns PI (not -PI)

## Example

```ts
angleDifference(PI * 1/6,  PI * 2/6) is PI * 1/6

angleDifference(PI * 2/6, PI * 1/6)  is -PI * 1/6.

angleDifference(PI * 11/6, PI * 1/6) is PI * 2/6

angleDifference(PI * 1/6, PI * 11/6) is -PI * 1/6.
```

## Defined in

[angle-difference.ts:25](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/angle-difference.ts#L25)
