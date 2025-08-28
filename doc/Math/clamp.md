<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / clamp

# Function: clamp()

```ts
function clamp(
   value: number, 
   min: number, 
   max: number): number;
```

Defined in: [clamp.ts:11](https://github.com/technobuddha/library/blob/main/src/clamp.ts#L11)

Clamps a number within the inclusive range specified by `min` and `max`.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `number` | The number to clamp. |
| `min` | `number` | The lower bound of the range. |
| `max` | `number` | The upper bound of the range. |

## Returns

`number`

The clamped value, which will be no less than `min` and no greater than `max`.

