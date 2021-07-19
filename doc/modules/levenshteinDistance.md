[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / levenshteinDistance

# Module: levenshteinDistance

## Table of contents

### References

- [default](levenshteinDistance.md#default)

### Functions

- [levenshteinDistance](levenshteinDistance.md#levenshteindistance)

## References

### default

Renames and exports: [levenshteinDistance](levenshteinDistance.md#levenshteindistance)

## Functions

### levenshteinDistance

▸ **levenshteinDistance**(`input`, `comparedTo`, `__namedParameters?`): `number`

Compute the levenshtein distance between two strings (similarity)

**`default`** caseInsensitive true

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string |
| `comparedTo` | `string` | The string to compare to |
| `__namedParameters` | `Options` | see [Options](almostEquals.md#options) |

#### Returns

`number`

the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)

#### Defined in

[levenshteinDistance.ts:17](../../src/levenshteinDistance.ts#L17)
