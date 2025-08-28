<!-- markdownlint-disable -->
<!-- cspell: disable -->
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

Defined in: [relative-time.ts:15](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L15)

Options for the [relativeTime](relativeTime.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="mdformat"></a> `mdFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a month and day | [relative-time.ts:23](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L23) |
| <a id="timeformat"></a> `timeFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a time | [relative-time.ts:19](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L19) |
| <a id="todaytomorrowyesterday"></a> `todayTomorrowYesterday?` | `boolean` | Describe the time difference as a time on a nearby day | [relative-time.ts:17](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L17) |
| <a id="ymdformat"></a> `ymdFormat?` | `string` | Passed to [formatDate](formatDate.md) to display a year, month and day | [relative-time.ts:21](https://github.com/technobuddha/library/blob/main/src/relative-time.ts#L21) |

