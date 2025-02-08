[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / plural

# Function: plural()

> **plural**(`input`, `quantity`?): `string`

Defined in: [plural.ts:13](https://github.com/technobuddha/library/blob/main/src/plural.ts#L13)

Return the plural version of the input string

## Parameters

### input

`string`

The word to pluralize

### quantity?

`number`

The quantity to prepend to the word.  If omitted nothing is prepended.  If quantity is one the singular form is returned.

## Returns

`string`

The plural form of the input, or if a quantity is supplied - the quantity and the singular/plural form of the input (whichever is appropriate)
