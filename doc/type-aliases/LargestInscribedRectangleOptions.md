<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / LargestInscribedRectangleOptions

# Type Alias: LargestInscribedRectangleOptions

> **LargestInscribedRectangleOptions** = \{ `aligned?`: `boolean`; `squareOnly?`: `boolean`; \}

Defined in: [largest-inscribed-rectangle.ts:15](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L15)

Configuration options for the largest inscribed rectangle algorithm.

## Properties

### aligned?

> `optional` **aligned**: `boolean`

Defined in: [largest-inscribed-rectangle.ts:21](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L21)

If true, only consider axis-aligned rectangles.
If false, considers rectangles at all orientations.

#### Default Value

```ts
true
```

***

### squareOnly?

> `optional` **squareOnly**: `boolean`

Defined in: [largest-inscribed-rectangle.ts:28](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L28)

If true, only consider squares (rectangles where width equals height).
If false, considers rectangles of any aspect ratio.

#### Default Value

```ts
false
```
