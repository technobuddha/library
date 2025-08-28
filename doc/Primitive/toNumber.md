<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Primitive](./index.md) / toNumber

# Function: toNumber()

```ts
function toNumber(entity: unknown): number;
```

Defined in: [to-number.ts:13](https://github.com/technobuddha/library/blob/main/src/to-number.ts#L13)

Convert an entity to a number.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `entity` | `unknown` | The entity to convert, the entity will attempt to be converted as a number, a boolean or a string |

## Returns

`number`

The entity as a number, or NaN if it cannot be converted

