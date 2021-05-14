[@technobuddha/library](../..) / [Modules](../Modules.md) / matchCase

# Module: matchCase

## Table of contents

### References

- [default](matchcase.md#default)

### Functions

- [matchCase](matchcase.md#matchcase)

## References

### default

Renames and exports: [matchCase](matchcase.md#matchcase)

## Functions

### matchCase

▸ **matchCase**(`input`: *string*, `target`: *string*): *string*

Attempt to convert the input string into the same case as the target string

**`remarks`** The best guess is made to try to figure out what case the target is in:
 * lowercase
 * UPPERCASE
 * Capitalcase
 * sMALLCASE

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | *string* | The input string |
| `target` | *string* | The target string |

**Returns:** *string*

The input in the case case as the target string

Defined in: [src/matchCase.ts:19](../src/matchCase.ts#L19)
