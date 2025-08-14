<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / decodeText

# Function: decodeText()

> **decodeText**(`input`: [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\>, `_encoding`: [`TextEncoding`](../type-aliases/TextEncoding.md)): `string`

Defined in: [decode-text.ts:15](https://github.com/technobuddha/library/blob/main/src/decode-text.ts#L15)

Decode a UTF8 encoded string into unicode

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | [`TypedArray`](../type-aliases/TypedArray.md) \| [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| `ArrayLike`\<`number`\> | `undefined` | the utf encoded string |
| `_encoding` | [`TextEncoding`](../type-aliases/TextEncoding.md) | `'utf8'` | - |

## Returns

`string`

the decoded strings (which is encoded as UTF-16 by javascript)
