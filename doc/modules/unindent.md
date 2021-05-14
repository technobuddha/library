[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / unindent

# Module: unindent

## Table of contents

### References

- [default](unindent.md#default)

### Type aliases

- [Options](unindent.md#options)

### Functions

- [unindent](unindent.md#unindent)

## References

### default

Renames and exports: [unindent](unindent.md#unindent)

## Type aliases

### Options

Ƭ **Options**: *object*

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `indenter?` | *string* | the indentation character |

Defined in: [src/unindent.ts:5](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/unindent.ts#L5)

## Functions

### unindent

▸ **unindent**(`input`: *string*, `__namedParameters?`: [*Options*](unindent.md#options)): *string*

Remove indentation from text

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The indented text |
| `__namedParameters` | [*Options*](unindent.md#options) | {} | - |

**Returns:** *string*

Defined in: [src/unindent.ts:16](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/unindent.ts#L16)
