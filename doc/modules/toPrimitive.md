[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / toPrimitive

# Module: toPrimitive

## Table of contents

### References

- [default](toPrimitive.md#default)

### Functions

- [toPrimitive](toPrimitive.md#toprimitive)

## References

### default

Renames and exports: [toPrimitive](toPrimitive.md#toprimitive)

## Functions

### toPrimitive

▸ **toPrimitive**(`input`, `hint?`): `any`

Convert an object into its primitive (string, number, etc.) value

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `unknown` | `undefined` | the object |
| `hint` | ``"string"`` \| ``"number"`` \| ``"default"`` | `'default'` | A "hint" as to what the type should be.  "string", "number" or "default" |

#### Returns

`any`

primitive value

#### Defined in

[toPrimitive.ts:13](../../src/toPrimitive.ts#L13)
