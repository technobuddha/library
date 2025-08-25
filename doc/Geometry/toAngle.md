<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / toAngle

# Function: toAngle()

```ts
function toAngle(
   input: number, 
   from: AngleUnit, 
   to: AngleUnit): number;
```

Defined in: [to-angle.ts:14](https://github.com/technobuddha/library/blob/main/src/to-angle.ts#L14)

Converts an angle from one unit to another.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `number` | `undefined` | Angle to convert |
| `from` | [`AngleUnit`](AngleUnit.md) | `undefined` | The input unit of the angle |
| `to` | [`AngleUnit`](AngleUnit.md) | `'radians'` | The output unit of the angle (default is 'radians') |

## Returns

`number`

Converted angle.

