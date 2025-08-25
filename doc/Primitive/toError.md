<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Primitive](./index.md) / toError

# Function: toError()

```ts
function toError(entity: unknown): Error;
```

Defined in: [to-error.ts:12](https://github.com/technobuddha/library/blob/main/src/to-error.ts#L12)

Convert the entity to an Error object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entity` | `unknown` | The entity to convert, if it is already an error ir will be returned otherwise a new Error object will be created. |

## Returns

[`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

The entity as an Error object.

