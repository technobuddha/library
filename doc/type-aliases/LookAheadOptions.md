<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / LookAheadOptions

# Type Alias: LookAheadOptions\<T\>

> **LookAheadOptions**\<`T`\> = \{ `last`: `T`; \} \| \{ `wrapAround`: `boolean`; \}

Defined in: [look-ahead.ts:6](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L6)

Options for look-ahead operations.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the sequence. |

## Type declaration

\{ `last`: `T`; \}

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `last` | `T` | specifies the last item in the sequence. | [look-ahead.ts:9](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L9) |

\{ `wrapAround`: `boolean`; \}

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `wrapAround` | `boolean` | determines whether the look-ahead should wrap around to the beginning when reaching the end. | [look-ahead.ts:13](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L13) |
