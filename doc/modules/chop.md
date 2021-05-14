[@technobuddha/library](../..) / [Modules](../Modules.md) / chop

# Module: chop

## Table of contents

### References

- [default](chop.md#default)

### Type aliases

- [Options](chop.md#options)

### Functions

- [chop](chop.md#chop)

## References

### default

Renames and exports: [chop](chop.md#chop)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `truncate?` | *boolean* | If true, the last block will be omitted if has insufficient characters |

Defined in: [chop.ts:4](../../src/chop.ts#L4)

## Functions

### chop

▸ **chop**(`input`: *string*, `length`: *number*, `__namedParameters?`: [*Options*](chop.md#options)): *string*[]

Break a string into equal sized segments of characters

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The string to break apart |
| `length` | *number* | - | The length of each segment |
| `__namedParameters` | [*Options*](chop.md#options) | {} | - |

**Returns:** *string*[]

Array of segments

Defined in: [packages/library/src/chop.ts:16](../../src/chop.ts#L16)
