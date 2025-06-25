<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / LargestInscribedRectangleOptions

# Type Alias: LargestInscribedRectangleOptions

> **LargestInscribedRectangleOptions** = \{ `aligned?`: `boolean`; `squareOnly?`: `boolean`; \}

Defined in: [largest-inscribed-rectangle.ts:14](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L14)

Configuration options for the largest inscribed rectangle algorithm.

## Properties

### aligned?

> `optional` **aligned**: `boolean`

Defined in: [largest-inscribed-rectangle.ts:20](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L20)

If true, only consider axis-aligned rectangles.
If false, considers rectangles at all orientations.

#### Default Value

```ts
true
```

***

### squareOnly?

> `optional` **squareOnly**: `boolean`

Defined in: [largest-inscribed-rectangle.ts:27](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L27)

If true, only consider squares (rectangles where width equals height).
If false, considers rectangles of any aspect ratio.

#### Default Value

```ts
false
```
