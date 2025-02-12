<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / clearObject

# Function: clearObject()

> **clearObject**\<`T`\>(`input`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string` \| `number` \| `symbol`, `T`\>): [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string` \| `number` \| `symbol`, `T`\>

Defined in: [clear-object.ts:12](https://github.com/technobuddha/library/blob/main/src/clear-object.ts#L12)

Delete all own enumerable string properties from an object

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `T` | `unknown` | Type of values within the object |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string` \| `number` \| `symbol`, `T`\> | Object to clear all properties |

## Returns

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string` \| `number` \| `symbol`, `T`\>

Original

## Remarks

The input argument is mutated in place

## See

input with all properties deleted.
