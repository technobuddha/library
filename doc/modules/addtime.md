[@technobuddha/library](../..) / [Modules](../Modules.md) / addTime

# Module: addTime

## Table of contents

### References

- [default](addtime.md#default)

### Type aliases

- [TimeIncrement](addtime.md#timeincrement)

### Functions

- [addTime](addtime.md#addtime)

## References

### default

Renames and exports: [addTime](addtime.md#addtime)

## Type aliases

### TimeIncrement

Ƭ **TimeIncrement**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `days?` | *number* |
| `hours?` | *number* |
| `milliseconds?` | *number* |
| `minutes?` | *number* |
| `months?` | *number* |
| `seconds?` | *number* |
| `years?` | *number* |

Defined in: [addTime.ts:1](../../src/addTime.ts#L1)

## Functions

### addTime

▸ **addTime**(`input`: Date, `__namedParameters?`: [*TimeIncrement*](addtime.md#timeincrement)): Date

Add units of time to a Date

**`remarks`** Negative values will subtract from the Date

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | Date | - | Starting date |
| `__namedParameters` | [*TimeIncrement*](addtime.md#timeincrement) | {} | Amount of time to increment |

**Returns:** Date

Adjusted date.

Defined in: [packages/library/src/addTime.ts:20](../../src/addTime.ts#L20)
