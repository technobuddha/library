[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / dataURL

# Module: dataURL

## Table of contents

### References

- [default](dataURL.md#default)

### Type aliases

- [BinaryObject](dataURL.md#binaryobject)

### Functions

- [dataURL](dataURL.md#dataurl)

## References

### default

Renames and exports: [dataURL](dataURL.md#dataurl)

## Type aliases

### BinaryObject

Ƭ **BinaryObject**: `ArrayBuffer` \| `DataView` \| `Int8Array` \| `Uint8Array` \| `Uint8ClampedArray` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array`

#### Defined in

[dataURL.ts:4](../../src/dataURL.ts#L4)

## Functions

### dataURL

▸ **dataURL**(`input`, `mimeType`): `string`

Convert any binary object into a data URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`BinaryObject`](dataURL.md#binaryobject) | The binary object |
| `mimeType` | `string` | The MIME type for the URL |

#### Returns

`string`

The data URL

#### Defined in

[dataURL.ts:24](../../src/dataURL.ts#L24)
