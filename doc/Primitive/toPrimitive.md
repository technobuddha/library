<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Primitive](./index.md) / toPrimitive

# Function: toPrimitive()

> **toPrimitive**(`input`: `unknown`, `hint`: `"string"` \| `"number"` \| `"default"`): `unknown`

Defined in: [to-primitive.ts:13](https://github.com/technobuddha/library/blob/main/src/to-primitive.ts#L13)

Convert an object into its primitive (string, number, etc.) value

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `unknown` | `undefined` | the object |
| `hint` | `"string"` \| `"number"` \| `"default"` | `'default'` | A "hint" as to what the type should be. "string", "number" or "default" |

## Returns

`unknown`

primitive value

