<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / lerp

# Function: lerp()

```ts
function lerp(
   a: number, 
   b: number, 
   proportion: number): number;
```

Defined in: [lerp.ts:14](https://github.com/technobuddha/library/blob/main/src/lerp.ts#L14)

Performs linear interpolation between values a and b. Returns the value
between a and b proportional to x (when x is between 0 and 1. When x is
outside this range, the return value is a linear extrapolation).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `number` | A number. |
| `b` | `number` | A number. |
| `proportion` | `number` | The proportion between a and b. |

## Returns

`number`

The interpolated value between a and b.

