<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Array](./index.md) / CollapsibleValue

# Type Alias: CollapsibleValue\<T\>

```ts
type CollapsibleValue<T> = T | null | undefined | (T | null | undefined)[];
```

Defined in: [collapse.ts:20](https://github.com/technobuddha/library/blob/main/src/collapse.ts#L20)

Represents a primitive value including `null` and `undefined`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`CollapsiblePrimitive`](CollapsiblePrimitive.md) | The primitive type that can be collapsed. |

