<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / groupCode

# Function: groupCode()

> **groupCode**(`input`): `string`

Defined in: [group-code.ts:14](https://github.com/technobuddha/library/blob/main/src/group-code.ts#L14)

Determine the group code (A-Z, [] or #) to place an item under

## Parameters

### input

`string`

a description

## Returns

`string`

The group code

## Remarks

The group code is made by taking the first letter of the *description*.  As a special
case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
under #.
