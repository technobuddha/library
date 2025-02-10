<!-- markdownlint-disable -->

[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / shallowEquals

# Function: shallowEquals()

> **shallowEquals**(`objA`, `objB`, `exclude`): `boolean`

Defined in: [shallow-equals.ts:17](https://github.com/technobuddha/library/blob/main/src/shallow-equals.ts#L17)

Compare two object for equality.  Testing goes one level deep.

## Parameters

### objA

First object to compare

`undefined` | `null` | `Record`\<`string`, `unknown`\>

### objB

Second object to compare

`undefined` | `null` | `Record`\<`string`, `unknown`\>

### exclude

`string`[] = `[]`

Array of key names to exclude from the comparison

## Returns

`boolean`

true if the two objects have the same members
