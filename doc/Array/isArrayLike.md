<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / isArrayLike

# Function: isArrayLike()

> **isArrayLike**(`value`: `unknown`): `value is ArrayLike<unknown>`

Defined in: [is-array-like.ts:20](https://github.com/technobuddha/library/blob/main/src/is-array-like.ts#L20)

Determines whether the provided value is array-like.

A value is considered array-like if it is not null or undefined, is object-like,
is not a function, has a 'length' property, and the length is a valid array length.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to check. |

## Returns

`value is ArrayLike<unknown>`

True if the value is array-like, otherwise false.
