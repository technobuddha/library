[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / randomPick

# Module: randomPick

## Table of contents

### References

- [default](randomPick.md#default)

### Functions

- [randomPick](randomPick.md#randompick)

## References

### default

Renames and exports: [randomPick](randomPick.md#randompick)

## Functions

### randomPick

▸ **randomPick**<`T`\>(`list`, `random?`): `T` \| `undefined`

Pick a random items from a list.

**`default`** random  Math.random

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `list` | `T`[] | Array of items to pick from |
| `random` | () => `number` | Random number generator |

#### Returns

`T` \| `undefined`

Randomly selected item

#### Defined in

[randomPick.ts:9](../../src/randomPick.ts#L9)
