<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Array](./index.md) / Collapsible

# Type Alias: Collapsible\<T\>

```ts
type Collapsible<T> = 
  | CollapsibleValue<T>
| () => CollapsibleValue<T>;
```

Defined in: [collapse.ts:49](https://github.com/technobuddha/library/blob/main/src/collapse.ts#L49)

Represents a value that can be "collapsed" into a flat sequence of values of type `T`.

A `Collapsible<T>` can be:
- A single value of type `T`
- `null` or `undefined`
- An array of values (and/or `null`/`undefined`)
- A function returning any of the above
- An iterable or generator yielding values (and/or `null`/`undefined`)

This type is useful for APIs that accept flexible input forms, such as single values,
arrays, lazy generators, or functions producing values, and need to process them uniformly.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`CollapsiblePrimitive`](CollapsiblePrimitive.md) | The primitive type that can be collapsed. |

