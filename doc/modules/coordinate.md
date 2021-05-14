[@technobuddha/library](../..) / [Modules](../Modules.md) / coordinate

# Module: coordinate

## Table of contents

### References

- [default](coordinate.md#default)

### Type aliases

- [Options](coordinate.md#options)

### Functions

- [coordinate](coordinate.md#coordinate)

## References

### default

Renames and exports: [coordinate](coordinate.md#coordinate)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `conjunction?` | *string* | Conjunction to insert in the last position (default 'and') |
| `oxford?` | *boolean* | If true, use the oxford comma |
| `separator?` | *string* | String used to separate values (default ',') |

Defined in: [src/coordinate.ts:4](../src/coordinate.ts#L4)

## Functions

### coordinate

▸ **coordinate**<T\>(`input`: *ArrayLike*<T\>, `__namedParameters?`: [*Options*](coordinate.md#options)): *string*

Create a string from an array, separating values and inserting a conjunction

#### Type parameters

| Name | Default |
| :------ | :------ |
| `T` | *unknown* |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *ArrayLike*<T\> | - | Array of values |
| `__namedParameters` | [*Options*](coordinate.md#options) | {} | see [Options](coordinate.md#options) |

**Returns:** *string*

Defined in: [src/coordinate.ts:19](../src/coordinate.ts#L19)
