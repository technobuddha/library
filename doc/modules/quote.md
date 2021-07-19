[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / quote

# Module: quote

## Table of contents

### References

- [default](quote.md#default)

### Type aliases

- [Options](quote.md#options)

### Functions

- [quote](quote.md#quote)

## References

### default

Renames and exports: [quote](quote.md#quote)

## Type aliases

### Options

Ƭ **Options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `escape?` | `string` \| (`input`: `string`) => `string` | Character sequence to replace the quote mark within the text, or function to return the properly escaped text |
| `quote?` | `string` | The quote character(s) to use |

#### Defined in

[quote.ts:6](../../src/quote.ts#L6)

## Functions

### quote

▸ **quote**(`input`, `__namedParameters?`): `string`

Surround text with quotes

**`default`** quote double-quote (")

**`deffaultvalue`** escape {@link esapeJs}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The text to surround |
| `__namedParameters` | [`Options`](quote.md#options) | see [Options](quote.md#options) |

#### Returns

`string`

text surrounded by quotes

#### Defined in

[quote.ts:22](../../src/quote.ts#L22)
