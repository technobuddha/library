<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / toBoolean

# Function: toBoolean()

> **toBoolean**(`input`: `string`, `__namedParameters`: [`ToBooleanOptions`](ToBooleanOptions.md)): `undefined` \| `boolean`

Defined in: [to-boolean.ts:27](https://github.com/technobuddha/library/blob/main/src/to-boolean.ts#L27)

Convert a string to a boolean value

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to convert |
| `__namedParameters` | [`ToBooleanOptions`](ToBooleanOptions.md) | see [ToBooleanOptions](ToBooleanOptions.md) |

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
