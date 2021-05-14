[@technobuddha/library](../..) / [Modules](../Modules.md) / floor

# Module: floor

## Table of contents

### References

- [default](floor.md#default)

### Functions

- [floor](floor.md#floor)

## References

### default

Renames and exports: [floor](floor.md#floor)

## Functions

### floor

▸ **floor**(`input`: *number*, `__namedParameters?`: Options): *number*

A tweaked variant of {@code Math.floor} which tolerates if the passed number
is infinitesimally smaller than the closest integer. It often happens with
the results of floating point calculations because of the finite precision
of the intermediate results. For example {@code Math.floor(Math.log(1000) /
Math.LN10) == 2}, not 3 as one would expect.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | *number* | - | A number. |
| `__namedParameters` | Options | {} | - |

**Returns:** *number*

The largest integer less than or equal to {@code num}.

Defined in: [src/floor.ts:18](../../src/floor.ts#L18)
