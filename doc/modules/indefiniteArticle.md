[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / indefiniteArticle

# Module: indefiniteArticle

## Table of contents

### References

- [default](indefiniteArticle.md#default)

### Functions

- [indefiniteArticle](indefiniteArticle.md#indefinitearticle)

## References

### default

Renames and exports: [indefiniteArticle](indefiniteArticle.md#indefinitearticle)

## Functions

### indefiniteArticle

▸ **indefiniteArticle**(`word`, `__namedParameters?`): `string`

Determine the appropriate indefinite article to use with a word.

**`remarks`** The answer is derived from a simple rules engine, it attempts to cover most exceptions
to the rules, but the English language has lots of quirks, and this rules engine can not cover them
all

**`default`** only false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `word` | `string` | The word |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`string`

The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
option is used, only the indefinite article is returned.

#### Defined in

[indefiniteArticle.ts:37](../../src/indefiniteArticle.ts#L37)
