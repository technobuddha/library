<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [RegExp](./index.md) / matches

# Function: matches()

> **matches**(`text`: `string`, `match`: `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp), `any`, `any`\>): `boolean`

Defined in: [matches.ts:19](https://github.com/technobuddha/library/blob/main/src/matches.ts#L19)

Determines if the given `text` matches the provided `match` criteria.

The `match` parameter can be:
- A string: returns true if the trimmed, lowercased `text` is equal to the lowercased `match` string.
- A RegExp: returns true if the regular expression matches the trimmed, lowercased `text`.
- An iterable of strings or RegExps: returns true if any of the elements match the `text` as described above.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `text` | `string` | The input string to test against the match criteria. |
| `match` | `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp), `any`, `any`\> | A string, RegExp, or iterable of strings/RegExps to match against the input text. |

## Returns

`boolean`

`true` if the text matches the criteria; otherwise, `false`.

