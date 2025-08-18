<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / QuoteOptions

# Type Alias: QuoteOptions

> **QuoteOptions** = \{ `escape?`: `string` \| (`input`: `string`) => `string`; `quote?`: `string`; \}

Defined in: [quote.ts:11](https://github.com/technobuddha/library/blob/main/src/quote.ts#L11)

Options for the [quote](quote.md) and [unquote](unquote.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="escape"></a> `escape?` | `string` \| (`input`: `string`) => `string` | Character sequence to replace the quote mark within the text, or function to return the properly escaped text | [quote.ts:15](https://github.com/technobuddha/library/blob/main/src/quote.ts#L15) |
| <a id="quote"></a> `quote?` | `string` | The quote character(s) to use | [quote.ts:13](https://github.com/technobuddha/library/blob/main/src/quote.ts#L13) |
