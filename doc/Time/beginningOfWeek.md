<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / beginningOfWeek

# Function: beginningOfWeek()

```ts
function beginningOfWeek(input: Date, options: BeginningOfWeekOptions): Date;
```

Defined in: [beginning-of-week.ts:28](https://github.com/technobuddha/library/blob/main/src/beginning-of-week.ts#L28)

Determine the start of the week for a date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`BeginningOfWeekOptions`](BeginningOfWeekOptions.md) | see [BeginningOfWeekOptions](BeginningOfWeekOptions.md) |

## Returns

[`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date)

The date value for midnight on the first day of the specified week

## Default Value

```ts
utc false
```

