<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / toBoolean

# Function: toBoolean()

```ts
function toBoolean(input: string, options: BooleanOptions): undefined | boolean;
```

Defined in: [to-boolean.ts:29](https://github.com/technobuddha/library/blob/main/src/to-boolean.ts#L29)

Convert a string to a boolean value

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to convert |
| `options` | [`BooleanOptions`](BooleanOptions.md) | see [BooleanOptions](BooleanOptions.md) |

## Returns

`undefined` \| `boolean`

## Default Value

```ts
trueValues 'true', 'yes', 'y', 'on', or '1'
```

## Default Value

```ts
falseValues 'false', 'no', 'n', 'off', '0'
```

