[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / levenshteinDistance

# Module: levenshteinDistance

## Table of contents

### References

- [default](levenshteindistance.md#default)

### Functions

- [levenshteinDistance](levenshteindistance.md#levenshteindistance)

## References

### default

Renames and exports: [levenshteinDistance](levenshteindistance.md#levenshteindistance)

## Functions

### levenshteinDistance

▸ **levenshteinDistance**(`input`: *string*, `comparedTo`: *string*, `__namedParameters?`: Options): *number*

Compute the levenshtein distance between two strings (similarity)

**`default`** caseInsensitive true

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The string |
| `comparedTo` | *string* | - | The string to compare to |
| `__namedParameters` | Options | {} | see [Options](almostequals.md#options) |

**Returns:** *number*

the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)

Defined in: [levenshteinDistance.ts:18](../../src/levenshteinDistance.ts#L18)
