<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / build

# Function: build()

> **build**(...`args`: ([`StringLike`](StringLike.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<`string`, `any`, `any`\> \| `IterableIterator`\<`string`, `any`, `any`\> \| () => [`StringLike`](StringLike.md))[]): `string`

Defined in: [build.ts:20](https://github.com/technobuddha/library/blob/main/src/build.ts#L20)

Concatenates strings and/or arrays of strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`args` | ([`StringLike`](StringLike.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<`string`, `any`, `any`\> \| `IterableIterator`\<`string`, `any`, `any`\> \| () => [`StringLike`](StringLike.md))[] | Concatenates a list of strings, string arrays, or functions that return a string or string array. |

## Returns

`string`

The concatenation of *args*.
