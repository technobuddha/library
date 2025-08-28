<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / quote

# Function: quote()

```ts
function quote(input: string, options: QuoteOptions): string;
```

Defined in: [quote.ts:28](https://github.com/technobuddha/library/blob/main/src/quote.ts#L28)

Surround text with quotes

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The text to surround |
| `options` | [`QuoteOptions`](QuoteOptions.md) | see [QuoteOptions](QuoteOptions.md) |

## Returns

`string`

text surrounded by quotes

## Default Value

```ts
quote double-quote (")
```

## Default Value

escape [escapeJS](../Encoding/escapeJS.md)

