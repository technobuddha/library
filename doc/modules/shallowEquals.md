[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / shallowEquals

# Module: shallowEquals

## Table of contents

### References

- [default](shallowEquals.md#default)

### Functions

- [shallowEquals](shallowEquals.md#shallowequals)

## References

### default

Renames and exports: [shallowEquals](shallowEquals.md#shallowequals)

## Functions

### shallowEquals

▸ **shallowEquals**(`objA`, `objB`, `exclude?`): `boolean`

Compare two object for equality.  Testing goes one level deep.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `objA` | `Record`<`string`, `unknown`\> \| ``null`` \| `undefined` | `undefined` | First object to compare |
| `objB` | `Record`<`string`, `unknown`\> \| ``null`` \| `undefined` | `undefined` | Second object to compare |
| `exclude` | `string`[] | `[]` | Array of key names to exclude from the comparison |

#### Returns

`boolean`

true if the two objects have the same members

#### Defined in

[shallowEquals.ts:16](../../src/shallowEquals.ts#L16)
