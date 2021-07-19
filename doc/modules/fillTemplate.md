[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / fillTemplate

# Module: fillTemplate

## Table of contents

### References

- [default](fillTemplate.md#default)

### Functions

- [fillTemplate](fillTemplate.md#filltemplate)

## References

### default

Renames and exports: [fillTemplate](fillTemplate.md#filltemplate)

## Functions

### fillTemplate

▸ **fillTemplate**(`input`, `values`, `__namedParameters?`): `string`

Fill a template with supplies values

**`default`** open '{{'

**`default`** close (default '}}')

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The template |
| `values` | `Record`<`string`, `string` \| `undefined`\> | A dictionary of name-values used to fill in values in the template |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`string`

template with values replaced

#### Defined in

[fillTemplate.ts:20](../../src/fillTemplate.ts#L20)
