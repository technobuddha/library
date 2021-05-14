[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / compareStrings

# Module: compareStrings

## Table of contents

### References

- [default](comparestrings.md#default)

### Functions

- [compareStrings](comparestrings.md#comparestrings)

## References

### default

Renames and exports: [compareStrings](comparestrings.md#comparestrings)

## Functions

### compareStrings

▸ **compareStrings**(`text1`: *string* \| ``null``, `text2`: *string* \| ``null``, `__namedParameters?`: Options): ``-1`` \| ``0`` \| ``1``

Compare two strings

**`default`** caseInsensitive false

**`default`** natural false

**`default`** version false

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `text1` | *string* \| ``null`` | - |
| `text2` | *string* \| ``null`` | - |
| `__namedParameters` | Options | {} |

**Returns:** ``-1`` \| ``0`` \| ``1``

0 if a == b; -1 if a < b; 1 if a > b

Defined in: [compareStrings.ts:26](../../src/compareStrings.ts#L26)
