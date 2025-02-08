[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / parseDate

# Function: parseDate()

> **parseDate**(`input`): `Date`

Defined in: [parse-date.ts:56](https://github.com/technobuddha/library/blob/main/src/parse-date.ts#L56)

Parse a string into a Date object

## Parameters

### input

`string`

The string containing a date

## Returns

`Date`

new Date object

## Remarks

this is a little more generous about what formats it will take for a date, and if it can't match the input to one of it's supported formats it falls
back to new Date(text)
