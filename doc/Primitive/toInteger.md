<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Primitive](./index.md) / toInteger

# Function: toInteger()

```ts
function toInteger(entity: unknown): number;
```

Defined in: [to-integer.ts:12](https://github.com/technobuddha/library/blob/main/src/to-integer.ts#L12)

Convert an entity to a integer number.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entity` | `unknown` | The entity to convert, the entity will attempt to be converted as a number, a boolean or a string |

## Returns

`number`

The entity as a number, or NaN if it cannot be converted

