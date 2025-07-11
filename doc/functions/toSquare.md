<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / toSquare

# Function: toSquare()

> **toSquare**(`rect`: [`Rect`](../type-aliases/Rect.md)): [`Rect`](../type-aliases/Rect.md)

Defined in: to-square.ts:11

Converts a given rectangle to the largest possible square that fits within it,
centered along the longer dimension. If the rectangle is already a square,
it returns the original rectangle.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rect` | [`Rect`](../type-aliases/Rect.md) | The rectangle to convert, with properties `x`, `y`, `width`, and `height`. |

## Returns

[`Rect`](../type-aliases/Rect.md)

A new `Rect` object representing the largest centered square within the original rectangle.
