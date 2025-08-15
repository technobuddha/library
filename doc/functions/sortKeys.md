<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / sortKeys

# Function: sortKeys()

> **sortKeys**\<`T`\>(`object`: `T`): `T`

Defined in: sort-keys.ts:15

Recursively sorts the keys of an object in lexicographical order.

If the input is a primitive value or an array, it is returned as-is.
For objects, all keys are sorted, and the function is applied recursively to all values.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* `JsonValue` | The type of the input value, extending JsonValue. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `T` | The object or value whose keys should be sorted. |

## Returns

`T`

A new object with keys sorted, or the original value if it is a primitive or array.
