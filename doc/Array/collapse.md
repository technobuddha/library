<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Array](./index.md) / collapse

# Function: collapse()

```ts
function collapse(...args: (
  | StringLike
  | Generator<StringLike, any, any>
  | Iterable<StringLike, any, any>
  | () => StringLike)[]): string[];
```

Defined in: [collapse.ts:22](https://github.com/technobuddha/library/blob/main/src/collapse.ts#L22)

Collapses a list of arguments into a flat array of strings.

Each argument can be:
- A string-like value (`StringLike`)
- A generator or iterable of string-like values
- A function returning a string-like value

The function flattens all arguments, filters out `null` and `empty` values,
and returns the resulting array of strings.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`args` | ( \| [`StringLike`](../String/StringLike.md) \| [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<[`StringLike`](../String/StringLike.md), `any`, `any`\> \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<[`StringLike`](../String/StringLike.md), `any`, `any`\> \| () => [`StringLike`](../String/StringLike.md))[] | The values to collapse, which may be strings, generators, iterables, or functions. |

## Returns

`string`[]

An array of strings, with all `null` and `empty` values removed.

