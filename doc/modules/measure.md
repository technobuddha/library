[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / measure

# Module: measure

## Table of contents

### References

- [default](measure.md#default)

### Type aliases

- [Size](measure.md#size)

### Functions

- [getScrollbarSize](measure.md#getscrollbarsize)
- [measure](measure.md#measure)
- [measureWindow](measure.md#measurewindow)

## References

### default

Renames and exports: [measure](measure.md#measure)

## Type aliases

### Size

Ƭ **Size**: `ScrollbarSize` & { `height`: `number` ; `width`: `number`  }

#### Defined in

[measure.ts:1](../../src/measure.ts#L1)

## Functions

### getScrollbarSize

▸ **getScrollbarSize**(): `ScrollbarSize`

#### Returns

`ScrollbarSize`

#### Defined in

[measure.ts:12](../../src/measure.ts#L12)

___

### measure

▸ **measure**(`element`): [`Size`](measure.md#size)

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `HTMLElement` |

#### Returns

[`Size`](measure.md#size)

#### Defined in

[measure.ts:26](../../src/measure.ts#L26)

___

### measureWindow

▸ **measureWindow**(): [`Size`](measure.md#size)

#### Returns

[`Size`](measure.md#size)

#### Defined in

[measure.ts:30](../../src/measure.ts#L30)
