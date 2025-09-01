[@technobuddha/library](../modules.md) / addTime

# Function: addTime()

```ts
function addTime(input: Date, increment: TimeIncrement): Date;
```

Defined in: [src/add-time.ts:32](https://github.com/technobuddha/library/blob/main/src/add-time.ts#L32)

Add units of time to a Date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | Starting date |
| `increment` | [`TimeIncrement`](TimeIncrement.md) | Amount of time to increment |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Adjusted date.

## Remarks

Negative values will subtract from the starting date
