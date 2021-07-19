[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / addTime

# Module: addTime

## Table of contents

### References

- [default](addTime.md#default)

### Type aliases

- [TimeIncrement](addTime.md#timeincrement)

### Functions

- [addTime](addTime.md#addtime)

## References

### default

Renames and exports: [addTime](addTime.md#addtime)

## Type aliases

### TimeIncrement

Ƭ **TimeIncrement**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `days?` | `number` |
| `hours?` | `number` |
| `milliseconds?` | `number` |
| `minutes?` | `number` |
| `months?` | `number` |
| `seconds?` | `number` |
| `years?` | `number` |

#### Defined in

[addTime.ts:1](../../src/addTime.ts#L1)

## Functions

### addTime

▸ **addTime**(`input`, `__namedParameters?`): `Date`

Add units of time to a Date

**`remarks`** Negative values will subtract from the Date

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `Date` | Starting date |
| `__namedParameters` | [`TimeIncrement`](addTime.md#timeincrement) | Amount of time to increment |

#### Returns

`Date`

Adjusted date.

#### Defined in

[addTime.ts:20](../../src/addTime.ts#L20)
