[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / clean

# Module: clean

## Table of contents

### References

- [default](clean.md#default)

### Functions

- [clean](clean.md#clean)
- [cleanEnd](clean.md#cleanend)
- [cleanStart](clean.md#cleanstart)

## References

### default

Renames and exports: [clean](clean.md#clean)

## Functions

### clean

▸ **clean**(`input`, `characters?`): `string`

Remove all occurrences of characters from the beginning and end of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string |
| `characters` | `string` \| `RegExp` \| (`string` \| `RegExp`)[] | The characters(s) to remove |

#### Returns

`string`

#### Defined in

[clean.ts:15](../../src/clean.ts#L15)

___

### cleanEnd

▸ **cleanEnd**(`input`, `characters?`): `string`

Remove all occurrences of characters from the end of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string |
| `characters` | `string` \| `RegExp` \| (`string` \| `RegExp`)[] | he characters(s) to remove |

#### Returns

`string`

#### Defined in

[clean.ts:33](../../src/clean.ts#L33)

___

### cleanStart

▸ **cleanStart**(`input`, `characters?`): `string`

Remove all occurrences of characters from the start of the string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` | The string |
| `characters` | `string` \| `RegExp` \| (`string` \| `RegExp`)[] | The characters(s) to remove |

#### Returns

`string`

#### Defined in

[clean.ts:51](../../src/clean.ts#L51)
