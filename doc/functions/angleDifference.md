<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / angleDifference

# Function: angleDifference()

> **angleDifference**(`startAngle`: `number`, `endAngle`: `number`): `number`

Defined in: [angle-difference.ts:27](https://github.com/technobuddha/library/blob/main/src/angle-difference.ts#L27)

Computes the difference between startAngle and endAngle (angles in radians).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `startAngle` | `number` | Start angle in radians. |
| `endAngle` | `number` | End angle in radians. |

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
