<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / endOfWeek

# Function: endOfWeek()

> **endOfWeek**(`input`: [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date), `options`: [`EndOfWeekOptions`](EndOfWeekOptions.md)): [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Defined in: [end-of-week.ts:28](https://github.com/technobuddha/library/blob/main/src/end-of-week.ts#L28)

Determine the last day of the week containing a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`EndOfWeekOptions`](EndOfWeekOptions.md) | see [EndOfWeekOptions](EndOfWeekOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

Midnight of the last day of the week containing the input date

## Default Value

```ts
utc false
```

