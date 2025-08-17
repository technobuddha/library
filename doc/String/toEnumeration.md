<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / toEnumeration

# Function: toEnumeration()

> **toEnumeration**(`input`: `string`, ...`tests`: (`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp), `any`, `any`\>)[]): `undefined` \| `number`

Defined in: [to-enumeration.ts:12](https://github.com/technobuddha/library/blob/main/src/to-enumeration.ts#L12)

Convert a string to a numeric value

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to convert |
| ...`tests` | (`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp), `any`, `any`\>)[] | Array of tests (string value or regular expressions) |

## Returns

`undefined` \| `number`

The index of the first test to match the input string
