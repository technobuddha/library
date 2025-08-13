<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / largestInscribedRectangle

# Function: largestInscribedRectangle()

## Call Signature

> **largestInscribedRectangle**(`polygon`: [`Polygon`](../type-aliases/Polygon.md), `options?`: \{ `aligned?`: `true`; `squareOnly?`: `boolean`; \}): [`Rect`](../type-aliases/Rect.md)

Defined in: [largest-inscribed-rectangle.ts:58](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L58)

Computes the largest rectangle that can be inscribed within the given polygon.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon within which to inscribe the rectangle. |
| `options?` | \{ `aligned?`: `true`; `squareOnly?`: `boolean`; \} | Configuration options for the computation. |
| `options.aligned?` | `true` | - |
| `options.squareOnly?` | `boolean` | - |

### Returns

[`Rect`](../type-aliases/Rect.md)

The largest inscribed rectangle.

### Throws

`Error` When polygon has fewer than 3 vertices

## Call Signature

> **largestInscribedRectangle**(`polygon`: [`Polygon`](../type-aliases/Polygon.md), `options`: \{ `aligned`: `false`; `squareOnly?`: `boolean`; \}): [`RotatedRect`](../type-aliases/RotatedRect.md)

Defined in: [largest-inscribed-rectangle.ts:62](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L62)

Computes the largest rectangle that can be inscribed within the given polygon.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon within which to inscribe the rectangle. |
| `options` | \{ `aligned`: `false`; `squareOnly?`: `boolean`; \} | Configuration options for the computation. |
| `options.aligned` | `false` | - |
| `options.squareOnly?` | `boolean` | - |

### Returns

[`RotatedRect`](../type-aliases/RotatedRect.md)

The largest inscribed rectangle.

### Throws

`Error` When polygon has fewer than 3 vertices
