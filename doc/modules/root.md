[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / root

# Module: root

## Table of contents

### References

- [default](root.md#default)

### Type aliases

- [Options](root.md#options)

### Functions

- [root](root.md#root)

## References

### default

Renames and exports: [root](root.md#root)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `prefix?` | *string* | The refix string to remove |
| `suffix?` | *string* | The suffix string to remove |

Defined in: [root.ts:3](../../src/root.ts#L3)

## Functions

### root

▸ **root**(`input`: *string*, `__namedParameters?`: [*Options*](root.md#options)): *string*

Extract the root word, removing a prefix and/or suffix

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The word, which might have {@code prefix} before it, and {@code suffix} after it. |
| `__namedParameters` | [*Options*](root.md#options) | {} | see [Options](root.md#options) |

**Returns:** *string*

The root word

Defined in: [root.ts:17](../../src/root.ts#L17)
