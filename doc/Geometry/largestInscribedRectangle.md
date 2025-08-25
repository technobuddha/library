<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / largestInscribedRectangle

# Function: largestInscribedRectangle()

## Call Signature

```ts
function largestInscribedRectangle(polygon: Polygon, options?: {
  aligned?: true;
  squareOnly?: boolean;
}): Rect;
```

Defined in: [largest-inscribed-rectangle.ts:64](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L64)

Computes the largest rectangle that can be inscribed within the given polygon.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `polygon` | [`Polygon`](Polygon.md) | The polygon within which to inscribe the rectangle. |
| `options?` | \{ `aligned?`: `true`; `squareOnly?`: `boolean`; \} | Configuration options for the computation. |
| `options.aligned?` | `true` | - |
| `options.squareOnly?` | `boolean` | - |

### Returns

[`Rect`](Rect.md)

The largest inscribed rectangle.

### Throws

`Error` When polygon has fewer than 3 vertices

## Call Signature

```ts
function largestInscribedRectangle(polygon: Polygon, options: {
  aligned: false;
  squareOnly?: boolean;
}): RotatedRect;
```

Defined in: [largest-inscribed-rectangle.ts:68](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L68)

Computes the largest rectangle that can be inscribed within the given polygon.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `polygon` | [`Polygon`](Polygon.md) | The polygon within which to inscribe the rectangle. |
| `options` | \{ `aligned`: `false`; `squareOnly?`: `boolean`; \} | Configuration options for the computation. |
| `options.aligned` | `false` | - |
| `options.squareOnly?` | `boolean` | - |

### Returns

[`RotatedRect`](RotatedRect.md)

The largest inscribed rectangle.

### Throws

`Error` When polygon has fewer than 3 vertices

