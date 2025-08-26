<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Array](./index.md) / LookAheadOptions

# Type Alias: LookAheadOptions\<T\>

```ts
type LookAheadOptions<T> = 
  | {
  last: T;
}
  | {
  wrapAround: boolean;
};
```

Defined in: [look-ahead.ts:8](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L8)

Options for [lookAhead](lookAhead.md) operations.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of the items in the sequence. |

## Type declaration

```ts
{
  last: T;
}
```

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `last` | `T` | Specifies the last item in the sequence. | [look-ahead.ts:13](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L13) |

```ts
{
  wrapAround: boolean;
}
```

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `wrapAround` | `boolean` | Determines whether the look-ahead should wrap around to the beginning when reaching the end. | [look-ahead.ts:19](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L19) |

