[@technobuddha/library](../modules.md) / isoWeekOfYear

# Function: isoWeekOfYear()

```ts
function isoWeekOfYear(input: Date, options: ISOWeekOfYearOptions): {
  week: number;
  year: number;
};
```

Defined in: [src/iso-week-of-year.ts:31](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L31)

Determine the ISO week number for a given date

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date |
| `options` | [`ISOWeekOfYearOptions`](ISOWeekOfYearOptions.md) | see [ISOWeekOfYearOptions](ISOWeekOfYearOptions.md) |

## Returns

the week number (1-53)

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `week` | `number` | The ISO week number | [src/iso-week-of-year.ts:42](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L42) |
| `year` | `number` | The year | [src/iso-week-of-year.ts:40](https://github.com/technobuddha/library/blob/main/src/iso-week-of-year.ts#L40) |

## Default Value

```ts
weekOneIncludes Thursday
```

## Default Value

```ts
firstDayOfWeek Monday
```
