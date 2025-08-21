<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / groupCode

# Function: groupCode()

> **groupCode**(`input`: `string`): `string`

Defined in: [group-code.ts:16](https://github.com/technobuddha/library/blob/main/src/group-code.ts#L16)

Determine the group code (A-Z, [] or #) to place an item under

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | a description |

## Returns

`string`

The group code

## Remarks

The group code is made by taking the first letter of the *description*.  As a special
case descriptions starting with '[' are grouped under [] and anything that isn't a letter is grouped
under #.
