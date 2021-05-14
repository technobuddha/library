[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / indefiniteArticle

# Module: indefiniteArticle

## Table of contents

### References

- [default](indefinitearticle.md#default)

### Functions

- [indefiniteArticle](indefinitearticle.md#indefinitearticle)

## References

### default

Renames and exports: [indefiniteArticle](indefinitearticle.md#indefinitearticle)

## Functions

### indefiniteArticle

▸ **indefiniteArticle**(`word`: *string*, `__namedParameters?`: Options): *string*

Determine the appropriate indefinite article to use with a word.

**`remarks`** The answer is derived from a simple rules engine, it attempts to cover most exceptions
to the rules, but the English language has lots of quirks, and this rules engine can not cover them
all

**`default`** only false

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `word` | *string* | - | The word |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** *string*

The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
option is used, only the indefinite article is returned.

Defined in: [src/indefiniteArticle.ts:35](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/indefiniteArticle.ts#L35)
