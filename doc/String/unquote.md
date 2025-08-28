<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / unquote

# Function: unquote()

```ts
function unquote(input: string, options: QuoteOptions): string;
```

Defined in: [unquote.ts:16](https://github.com/technobuddha/library/blob/main/src/unquote.ts#L16)

Remove surrounding quotes from text

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The text to surrounded by quotes |
| `options` | [`QuoteOptions`](QuoteOptions.md) | see [QuoteOptions](QuoteOptions.md) |

## Returns

`string`

the unescaped text with quotes removed

## Default Value

```ts
quote double-quote (")
```

## Default Value

```ts
escape unescapeJS
```

