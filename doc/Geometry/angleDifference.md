<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / angleDifference

# Function: angleDifference()

> **angleDifference**(`startAngle`: `number`, `endAngle`: `number`, `unit`: [`AngleUnit`](AngleUnit.md)): `number`

Defined in: [angle-difference.ts:30](https://github.com/technobuddha/library/blob/main/src/angle-difference.ts#L30)

Computes the difference between startAngle and endAngle.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `startAngle` | `number` | `undefined` | Start angle in radians. |
| `endAngle` | `number` | `undefined` | End angle in radians. |
| `unit` | [`AngleUnit`](AngleUnit.md) | `'radians'` | The angle unit to use for the output. |

## Returns

`number`

The number of radians that when added to *startAngle* will result in *endAngle*.

## Remarks

Positive numbers mean that the
direction is clockwise. Negative numbers indicate a counter-clockwise direction.
The shortest route (clockwise vs counter-clockwise) between the angles is used.
When the difference is π radians, the function returns π (not -π)

## Example

```ts
angleDifference(π * 1/6,  π * 2/6) is π * 1/6

angleDifference(π * 2/6, π * 1/6)  is -π * 1/6.

angleDifference(π * 11/6, π * 1/6) is π * 2/6

angleDifference(π * 1/6, π * 11/6) is -π * 1/6.
```

