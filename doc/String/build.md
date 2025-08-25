<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / build

# Function: build()

> **build**(...`args`: ([`StringLike`](StringLike.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`StringLike`](StringLike.md), `any`, `any`\> \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`StringLike`](StringLike.md), `any`, `any`\> \| () => [`StringLike`](StringLike.md))[]): `string`

Defined in: [build.ts:13](https://github.com/technobuddha/library/blob/main/src/build.ts#L13)

Concatenates strings and/or arrays of strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`args` | ([`StringLike`](StringLike.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`StringLike`](StringLike.md), `any`, `any`\> \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`StringLike`](StringLike.md), `any`, `any`\> \| () => [`StringLike`](StringLike.md))[] | Concatenates a list of strings, string arrays, or functions that return a string or string array. |

## Returns

`string`

The concatenation of *args*.

