<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Primitive](./index.md) / isPrimitive

# Function: isPrimitive()

```ts
function isPrimitive(input: unknown): input is undefined | null | string | number | bigint | boolean | symbol;
```

Defined in: [is-primitive.ts:8](https://github.com/technobuddha/library/blob/main/src/is-primitive.ts#L8)

Check to see if an object is a primitive

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `unknown` | object to test |

## Returns

input is undefined \| null \| string \| number \| bigint \| boolean \| symbol

true, if the object is a primitive

