<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Utility](./index.md) / isString

# Function: isString()

```ts
function isString(value: unknown): value is string;
```

Defined in: [is-string.ts:12](https://github.com/technobuddha/library/blob/main/src/is-string.ts#L12)

Determines whether the provided value is a string.

This function checks if the value is a primitive string or a String object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to check. |

## Returns

`value is string`

True if the value is a string or a String object, otherwise false.

