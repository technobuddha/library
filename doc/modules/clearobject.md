[@technobuddha/library](../..) / [Modules](../Modules.md) / clearObject

# Module: clearObject

## Table of contents

### References

- [default](clearobject.md#default)

### Functions

- [clearObject](clearobject.md#clearobject)

## References

### default

Renames and exports: [clearObject](clearobject.md#clearobject)

## Functions

### clearObject

▸ **clearObject**<T\>(`input`: *Record*<string \| number \| symbol, T\>): *Record*<string \| number \| symbol, T\>

Delete all own enumerable string properties from an object

**`remark`** The input argument is mutated in place

#### Type parameters

| Name | Default | Description |
| :------ | :------ | :------ |
| `T` | *unknown* | Type of values within the object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *Record*<string \| number \| symbol, T\> | Object to clear all properties |

**Returns:** *Record*<string \| number \| symbol, T\>

Original {@code input} with all properties deleted.

Defined in: [clearObject.ts:10](../../src/clearObject.ts#L10)
