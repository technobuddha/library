[@technobuddha/library](../..) / [Modules](../Modules.md) / lerp

# Module: lerp

## Table of contents

### References

- [default](lerp.md#default)

### Functions

- [lerp](lerp.md#lerp)

## References

### default

Renames and exports: [lerp](lerp.md#lerp)

## Functions

### lerp

▸ **lerp**(`a`: *number*, `b`: *number*, `proportion`: *number*): *number*

Performs linear interpolation between values a and b. Returns the value
between a and b proportional to x (when x is between 0 and 1. When x is
outside this range, the return value is a linear extrapolation).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | *number* | A number. |
| `b` | *number* | A number. |
| `proportion` | *number* | The proportion between a and b. |

**Returns:** *number*

The interpolated value between a and b.

Defined in: [lerp.ts:11](../../src/lerp.ts#L11)
