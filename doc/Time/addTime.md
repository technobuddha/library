<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / addTime

# Function: addTime()

> **addTime**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `increment`: [`TimeIncrement`](TimeIncrement.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [add-time.ts:26](https://github.com/technobuddha/library/blob/main/src/add-time.ts#L26)

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
