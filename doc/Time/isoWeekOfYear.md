<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / isoWeekOfYear

# Function: isoWeekOfYear()

```ts
function isoWeekOfYear(input: Date, options: ISOWeekOfYearOptions): {
  week: number;
  year: number;
};
```

Defined in: [iso-week-of-year.ts:32](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L32)

Determine the ISO week number for a given date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`ISOWeekOfYearOptions`](ISOWeekOfYearOptions.md) | see [ISOWeekOfYearOptions](ISOWeekOfYearOptions.md) |

## Returns

```ts
{
  week: number;
  year: number;
}
```

the week number (1-53)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `week` | `number` | [iso-week-of-year.ts:39](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L39) |
| `year` | `number` | [iso-week-of-year.ts:39](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L39) |

## Default Value

```ts
weekOneIncludes Thursday
```

## Default Value

```ts
firstDayOfWeek Monday
```

