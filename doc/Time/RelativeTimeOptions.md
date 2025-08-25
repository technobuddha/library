<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Time](./index.md) / RelativeTimeOptions

# Type Alias: RelativeTimeOptions

```ts
type RelativeTimeOptions = {
  mdFormat?: string;
  timeFormat?: string;
  todayTomorrowYesterday?: boolean;
  ymdFormat?: string;
};
```

Defined in: [relative-time.ts:20](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L20)

Options for the [relativeTime](relativeTime.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="mdformat"></a> `mdFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a month and day | [relative-time.ts:28](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L28) |
| <a id="timeformat"></a> `timeFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a time | [relative-time.ts:24](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L24) |
| <a id="todaytomorrowyesterday"></a> `todayTomorrowYesterday?` | `boolean` | Describe the time difference as a time on a nearby day | [relative-time.ts:22](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L22) |
| <a id="ymdformat"></a> `ymdFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a year, month and day | [relative-time.ts:26](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L26) |

