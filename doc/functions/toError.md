<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / toError

# Function: toError()

> **toError**(`entity`: `unknown`): [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

Defined in: [to-error.ts:12](https://github.com/technobuddha/library/blob/main/src/to-error.ts#L12)

Convert the entity to an Error object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entity` | `unknown` | The entity to convert, if it is already an error ir will be returned otherwise a new Error object will be created. |

## Returns

[`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

The entity as an Error object.
