<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / median

# Function: median()

```ts
function median(numbers: number[]): number;
```

Defined in: [median.ts:15](https://github.com/technobuddha/library/blob/main/src/median.ts#L15)

Calculates the median value of an array of numbers.

The median is the middle number in a sorted, ascending or descending, list of numbers.
If the list has an even number of elements, the median is the average of the two middle numbers.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `numbers` | `number`[] | An array of numbers to find the median of. |

## Returns

`number`

The median value, or `NaN` if the input array is empty.

