[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / diceCoefficient

# Module: diceCoefficient

## Table of contents

### References

- [default](dicecoefficient.md#default)

### Functions

- [diceCoefficient](dicecoefficient.md#dicecoefficient)

## References

### default

Renames and exports: [diceCoefficient](dicecoefficient.md#dicecoefficient)

## Functions

### diceCoefficient

▸ **diceCoefficient**(`input`: *string*, `compareTo`: *string*, `__namedParameters?`: Options): *number*

Compute the dice coefficient measure of similarity between two strings

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *string* | - | The first string |
| `compareTo` | *string* | - | The second string |
| `__namedParameters` | Options | {} | - |

**Returns:** *number*

a number from 0 (not similar) to 1 (equal) measuring the similarity

Defined in: [src/diceCoefficient.ts:16](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/diceCoefficient.ts#L16)
