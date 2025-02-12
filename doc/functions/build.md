<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / build

# Function: build()

> **build**(...`args`: ([`Stringy`](../type-aliases/Stringy.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`Stringy`](../type-aliases/Stringy.md)\> \| `IterableIterator`\<`string`\> \| () => [`Stringy`](../type-aliases/Stringy.md))[]): `string`

Defined in: [build.ts:18](https://github.com/technobuddha/library/blob/main/src/build.ts#L18)

Concatenates strings and/or arrays of strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`args` | ([`Stringy`](../type-aliases/Stringy.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`Stringy`](../type-aliases/Stringy.md)\> \| `IterableIterator`\<`string`\> \| () => [`Stringy`](../type-aliases/Stringy.md))[] | Concatenates a list of strings, string arrays, or functions that return a string or string array. |

## Returns

`string`

The concatenation of *args*.
