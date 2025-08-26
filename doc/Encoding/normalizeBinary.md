<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / normalizeBinary

# Function: normalizeBinary()

```ts
function normalizeBinary(input: BinaryObject): Uint8Array;
```

Defined in: [binary-object.ts:33](https://github.com/technobuddha/library/blob/main/src/binary-object.ts#L33)

Normalizes various binary object types to a `Uint8Array`.

Accepts an input of type `Uint8Array`, `ArrayBuffer`, or any ArrayBuffer view (e.g., `DataView`, `Int8Array`, etc.),
and returns a `Uint8Array` representation of the input. Throws a `TypeError` if the input is not a supported binary object type.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`BinaryObject`](BinaryObject.md) | The binary object to normalize. Can be a `Uint8Array`, `ArrayBuffer`, or any ArrayBuffer view. |

## Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

A `Uint8Array` representing the binary data.

## Throws

`TypeError` If the input is not a supported binary object type.

