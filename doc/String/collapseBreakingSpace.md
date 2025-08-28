<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / collapseBreakingSpace

# Function: collapseBreakingSpace()

```ts
function collapseBreakingSpace(input: string, trim: CollapseBreakingSpaceOptions): string;
```

Defined in: [collapse-breaking-space.ts:23](https://github.com/technobuddha/library/blob/main/src/collapse-breaking-space.ts#L23)

Replace all breaking space (space, tab, carriage return, new line) with a single space

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string |
| `trim` | [`CollapseBreakingSpaceOptions`](CollapseBreakingSpaceOptions.md) | If true, remove leading and trailing whitespace |

## Returns

`string`

