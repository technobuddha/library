[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / build

# Module: build

## Table of contents

### References

- [default](build.md#default)

### Functions

- [build](build.md#build)

## References

### default

Renames and exports: [build](build.md#build)

## Functions

### build

▸ **build**(...`args`): `string`

Concatenates strings and/or arrays of strings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | (`stringy` \| `Generator`<`stringy`\> \| () => `stringy`)[] | Concatenates a list of strings, string arrays, or functions that return a string or string array. |

#### Returns

`string`

The concatenation of *args*.

#### Defined in

[build.ts:14](../../src/build.ts#L14)
