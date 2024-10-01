[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [group-code](../README.md) / groupCode

# Function: groupCode()

> **groupCode**(`input`): `string`

Determine the group code (A-Z, [] or #) to place an item under

## Parameters

• **input**: `string`

a description

## Returns

`string`

The group code

## Remarks

The group code is made by taking the first letter of the *description*.  As a special
case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
under #.

## Defined in

[group-code.ts:14](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/group-code.ts#L14)
