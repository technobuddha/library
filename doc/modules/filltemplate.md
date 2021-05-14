[@technobuddha/library](../..) / [Modules](../Modules.md) / fillTemplate

# Module: fillTemplate

## Table of contents

### References

- [default](filltemplate.md#default)

### Functions

- [fillTemplate](filltemplate.md#filltemplate)

## References

### default

Renames and exports: [fillTemplate](filltemplate.md#filltemplate)

## Functions

### fillTemplate

▸ **fillTemplate**(`input`: *string*, `values`: *Record*<string, string \| undefined\>, `__namedParameters?`: Options): *string*

Fill a template with supplies values

**`default`** open '{{'

**`default`** close (default '}}')

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The template |
| `values` | *Record*<string, string \| undefined\> | - | A dictionary of name-values used to fill in values in the template |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** *string*

template with values replaced

Defined in: [src/fillTemplate.ts:20](../../src/fillTemplate.ts#L20)
