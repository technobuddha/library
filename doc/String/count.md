<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / count

# Function: count()

```ts
function count(
   input: string, 
   substring: string, 
   options: CountOptions): number;
```

Defined in: [count.ts:21](https://github.com/technobuddha/library/blob/main/src/count.ts#L21)

Compute the number of times a substring occurs within a string

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string |
| `substring` | `string` | The substring to look for |
| `options` | [`CountOptions`](CountOptions.md) | see [CountOptions](CountOptions.md) |

## Returns

`number`

number of times *substring* occurs within *input*

