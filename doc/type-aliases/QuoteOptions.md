<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / QuoteOptions

# Type Alias: QuoteOptions

> **QuoteOptions** = \{ `escape?`: `string` \| (`input`: `string`) => `string`; `quote?`: `string`; \}

Defined in: [quote.ts:10](https://github.com/technobuddha/library/blob/main/src/quote.ts#L10)

## Properties

### escape?

> `optional` **escape**: `string` \| (`input`: `string`) => `string`

Defined in: [quote.ts:14](https://github.com/technobuddha/library/blob/main/src/quote.ts#L14)

Character sequence to replace the quote mark within the text, or function to return the properly escaped text

***

### quote?

> `optional` **quote**: `string`

Defined in: [quote.ts:12](https://github.com/technobuddha/library/blob/main/src/quote.ts#L12)

The quote character(s) to use
