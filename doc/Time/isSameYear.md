<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / isSameYear

# Function: isSameYear()

```ts
function isSameYear(
   input1: Date, 
   input2: Date, 
   options: SameYearOptions): boolean;
```

Defined in: [is-same-year.ts:22](https://github.com/technobuddha/library/blob/main/src/is-same-year.ts#L22)

Determine if two dates occur in the same year

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input1` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The first date |
| `input2` | [`Date`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date) | The second date |
| `options` | [`SameYearOptions`](SameYearOptions.md) | see [SameYearOptions](SameYearOptions.md) |

## Returns

`boolean`

true, if the two dates occur in the same year

## Default Value

```ts
utc false
```

