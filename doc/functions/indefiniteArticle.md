<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / indefiniteArticle

# Function: indefiniteArticle()

> **indefiniteArticle**(`word`: `string`, `__namedParameters`: [`IndefiniteArticleOptions`](../type-aliases/IndefiniteArticleOptions.md)): `string`

Defined in: [indefinite-article.ts:48](https://github.com/technobuddha/library/blob/main/src/indefinite-article.ts#L48)

Determine the appropriate indefinite article to use with a word.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `word` | `string` | The word |
| `__namedParameters` | [`IndefiniteArticleOptions`](../type-aliases/IndefiniteArticleOptions.md) | see [IndefiniteArticleOptions](../type-aliases/IndefiniteArticleOptions.md) |

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
