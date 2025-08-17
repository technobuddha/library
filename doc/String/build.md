<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / build

# Function: build()

> **build**(...`args`: ([`Stringy`](Stringy.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`Stringy`](Stringy.md), `any`, `any`\> \| `IterableIterator`\<`string`, `any`, `any`\> \| () => [`Stringy`](Stringy.md))[]): `string`

Defined in: [build.ts:18](https://github.com/technobuddha/library/blob/main/src/build.ts#L18)

Concatenates strings and/or arrays of strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`args` | ([`Stringy`](Stringy.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`Stringy`](Stringy.md), `any`, `any`\> \| `IterableIterator`\<`string`, `any`, `any`\> \| () => [`Stringy`](Stringy.md))[] | Concatenates a list of strings, string arrays, or functions that return a string or string array. |

## Returns

`string`

The concatenation of *args*.
