<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / decodeText

# Function: decodeText()

> **decodeText**(`input`: `ArrayBufferLike` \| [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> \| [`Int8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)\<`ArrayBufferLike`\> \| [`Int16Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)\<`ArrayBufferLike`\> \| [`Uint16Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)\<`ArrayBufferLike`\> \| [`Int32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)\<`ArrayBufferLike`\> \| [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)\<`ArrayBufferLike`\> \| [`Float32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)\<`ArrayBufferLike`\> \| [`Float64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)\<`ArrayBufferLike`\> \| [`Uint8ClampedArray`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)\<`ArrayBufferLike`\> \| [`BigInt64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)\<`ArrayBufferLike`\> \| [`BigUint64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)\<`ArrayBufferLike`\>, `_encoding`: [`TextEncoding`](../type-aliases/TextEncoding.md)): `string`

Defined in: [decode-text.ts:14](https://github.com/technobuddha/library/blob/main/src/decode-text.ts#L14)

Decode a UTF8 encoded string into unicode

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `ArrayBufferLike` \| [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)\<`ArrayBufferLike`\> \| [`Int8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)\<`ArrayBufferLike`\> \| [`Int16Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int16Array)\<`ArrayBufferLike`\> \| [`Uint16Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array)\<`ArrayBufferLike`\> \| [`Int32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)\<`ArrayBufferLike`\> \| [`Uint32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array)\<`ArrayBufferLike`\> \| [`Float32Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float32Array)\<`ArrayBufferLike`\> \| [`Float64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Float64Array)\<`ArrayBufferLike`\> \| [`Uint8ClampedArray`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)\<`ArrayBufferLike`\> \| [`BigInt64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)\<`ArrayBufferLike`\> \| [`BigUint64Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)\<`ArrayBufferLike`\> | `undefined` | the utf encoded string |
| `_encoding` | [`TextEncoding`](../type-aliases/TextEncoding.md) | `'utf8'` | - |

## Returns

`string`

the decoded strings (which is encoded as UTF-16 by javascript)
