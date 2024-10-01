[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [shallow-equals](../README.md) / shallowEquals

# Function: shallowEquals()

> **shallowEquals**(`objA`, `objB`, `exclude`): `boolean`

Compare two object for equality.  Testing goes one level deep.

## Parameters

• **objA**: `undefined` \| `null` \| `Record`\<`string`, `unknown`\>

First object to compare

• **objB**: `undefined` \| `null` \| `Record`\<`string`, `unknown`\>

Second object to compare

• **exclude**: `string`[] = `[]`

Array of key names to exclude from the comparison

## Returns

`boolean`

true if the two objects have the same members

## Defined in

[shallow-equals.ts:9](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/shallow-equals.ts#L9)
