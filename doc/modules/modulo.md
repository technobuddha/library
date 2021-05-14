[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / modulo

# Module: modulo

## Table of contents

### References

- [default](modulo.md#default)

### Functions

- [modulo](modulo.md#modulo)

## References

### default

Renames and exports: [modulo](modulo.md#modulo)

## Functions

### modulo

▸ **modulo**(`dividend`: *number*, `divisor`: *number*): *number*

The % operator in JavaScript returns the remainder of a / b, but differs from
some other languages in that the result will have the same sign as the
dividend. For example, -1 % 8 == -1, whereas in some other languages
(such as Python) the result would be 7. This function emulates the more
correct modulo behavior, which is useful for certain applications such as
calculating an offset index in a circular list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dividend` | *number* |
| `divisor` | *number* |

**Returns:** *number*

a % b where the result is between 0 and b (either 0 <= x < b
or b < x <= 0, depending on the sign of b).

Defined in: [src/modulo.ts:14](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/modulo.ts#L14)
