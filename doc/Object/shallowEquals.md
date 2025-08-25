<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Object](./index.md) / shallowEquals

# Function: shallowEquals()

> **shallowEquals**(`objA`: `undefined` \| `null` \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>, `objB`: `undefined` \| `null` \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>, `exclude`: `string`[]): `boolean`

Defined in: [shallow-equals.ts:19](https://github.com/technobuddha/library/blob/main/src/shallow-equals.ts#L19)

Compare two object for equality.  Testing goes one level deep.

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `objA` | `undefined` \| `null` \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | `undefined` | First object to compare |
| `objB` | `undefined` \| `null` \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | `undefined` | Second object to compare |
| `exclude` | `string`[] | `[]` | Array of key names to exclude from the comparison |

## Returns

`boolean`

true if the two objects have the same members

