[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / clearObject

# Module: clearObject

## Table of contents

### References

- [default](clearObject.md#default)

### Functions

- [clearObject](clearObject.md#clearobject)

## References

### default

Renames and exports: [clearObject](clearObject.md#clearobject)

## Functions

### clearObject

▸ **clearObject**<`T`\>(`input`): `Record`<`string` \| `number` \| `symbol`, `T`\>

Delete all own enumerable string properties from an object

**`remark`** The input argument is mutated in place

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `unknown` | Type of values within the object |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Record`<`string` \| `number` \| `symbol`, `T`\> | Object to clear all properties |

#### Returns

`Record`<`string` \| `number` \| `symbol`, `T`\>

Original {@code input} with all properties deleted.

#### Defined in

[clearObject.ts:10](../../src/clearObject.ts#L10)
