<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / bounds

# Function: bounds()

> **bounds**(`vertices`: [`Polygon`](../type-aliases/Polygon.md)): [`Rect`](../type-aliases/Rect.md)

Defined in: [bounds.ts:13](https://github.com/technobuddha/library/blob/main/src/bounds.ts#L13)

Calculates the axis-aligned bounding rectangle for a given polygon.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `vertices` | [`Polygon`](../type-aliases/Polygon.md) | An array of points representing the vertices of the polygon. Each vertex should have `x` and `y` properties. |

## Returns

[`Rect`](../type-aliases/Rect.md)

A `Rect` object representing the smallest rectangle that contains all the vertices of the polygon.

## Throws

TypeError If the polygon has fewer than three vertices.
