[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [clear-object](../README.md) / clearObject

# Function: clearObject()

> **clearObject**\<`T`\>(`input`): `Record`\<`string` \| `number` \| `symbol`, `T`\>

Delete all own enumerable string properties from an object

## Type Parameters

• **T** = `unknown`

Type of values within the object

## Parameters

• **input**: `Record`\<`string` \| `number` \| `symbol`, `T`\>

Object to clear all properties

## Returns

`Record`\<`string` \| `number` \| `symbol`, `T`\>

Original {@code input} with all properties deleted.

## Remark

The input argument is mutated in place

## Defined in

[clear-object.ts:10](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/clear-object.ts#L10)
