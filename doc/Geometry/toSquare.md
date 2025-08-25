<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / toSquare

# Function: toSquare()

```ts
function toSquare(rect: Rect): Rect;
```

Defined in: [to-square.ts:14](https://github.com/technobuddha/library/blob/main/src/to-square.ts#L14)

Converts a given rectangle to the largest possible square that fits within it,
centered along the longer dimension. If the rectangle is already a square,
it returns the original rectangle.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rect` | [`Rect`](Rect.md) | The rectangle to convert, with properties `x`, `y`, `width`, and `height`. |

## Returns

[`Rect`](Rect.md)

A new `Rect` object representing the largest centered square within the original rectangle.

