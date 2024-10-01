[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [parse-date](../README.md) / parseDate

# Function: parseDate()

> **parseDate**(`input`): `Date`

Parse a string into a Date object

## Parameters

• **input**: `string`

The string containing a date

## Returns

`Date`

new Date object

## Remarks

this is a little more generous about what formats it will take for a date, and if it can't match the input to one of it's supported formats it falls
back to new Date(text)

## Defined in

[parse-date.ts:56](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/parse-date.ts#L56)
