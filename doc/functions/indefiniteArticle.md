<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / indefiniteArticle

# Function: indefiniteArticle()

> **indefiniteArticle**(`word`, `__namedParameters`): `string`

Defined in: [indefinite-article.ts:38](https://github.com/technobuddha/library/blob/main/src/indefinite-article.ts#L38)

Determine the appropriate indefinite article to use with a word.

## Parameters

### word

`string`

The word

### \_\_namedParameters

[`IndefiniteArticleOptions`](../type-aliases/IndefiniteArticleOptions.md) = `{}`

see [IndefiniteArticleOptions](../type-aliases/IndefiniteArticleOptions.md)

## Returns

`string`

The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
option is used, only the indefinite article is returned.

## Remarks

The answer is derived from a simple rules engine, it attempts to cover most exceptions
to the rules, but the English language has lots of quirks, and this rules engine can not cover them
all

## Default Value

```ts
only false
```
