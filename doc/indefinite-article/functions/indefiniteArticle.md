[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [indefinite-article](../README.md) / indefiniteArticle

# Function: indefiniteArticle()

> **indefiniteArticle**(`word`, `__namedParameters`): `string`

Determine the appropriate indefinite article to use with a word.

## Parameters

• **word**: `string`

The word

• **\_\_namedParameters**: `Options` = `{}`

see Options

## Returns

`string`

The appropriate indefinite article ("a" or "an") combined with the input word.  If the only
option is used, only the indefinite article is returned.

## Remarks

The answer is derived from a simple rules engine, it attempts to cover most exceptions
to the rules, but the English language has lots of quirks, and this rules engine can not cover them
all

## Default

```ts
only false
```

## Defined in

indefinite-article.ts:40
