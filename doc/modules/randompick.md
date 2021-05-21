[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / randomPick

# Module: randomPick

## Table of contents

### References

- [default](randompick.md#default)

### Functions

- [randomPick](randompick.md#randompick)

## References

### default

Renames and exports: [randomPick](randompick.md#randompick)

## Functions

### randomPick

▸ **randomPick**<T\>(`list`: T[], `random?`: () => *number*): T

Pick a random items from a list.

**`default`** random  Math.random

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | T[] | Array of items to pick from |
| `random` | () => *number* | Random number generator |

**Returns:** T

Randomly selected item

Defined in: [randomPick.ts:9](../../src/randomPick.ts#L9)
