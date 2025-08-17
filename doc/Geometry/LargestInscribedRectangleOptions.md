<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / LargestInscribedRectangleOptions

# Type Alias: LargestInscribedRectangleOptions

> **LargestInscribedRectangleOptions** = \{ `aligned?`: `boolean`; `squareOnly?`: `boolean`; \}

Defined in: [largest-inscribed-rectangle.ts:30](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L30)

Configuration options for the largest inscribed rectangle algorithm.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="aligned"></a> `aligned?` | `boolean` | `true` | If true, only consider axis-aligned rectangles. If false, considers rectangles at all orientations. | [largest-inscribed-rectangle.ts:36](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L36) |
| <a id="squareonly"></a> `squareOnly?` | `boolean` | `false` | If true, only consider squares (rectangles where width equals height). If false, considers rectangles of any aspect ratio. | [largest-inscribed-rectangle.ts:43](https://github.com/technobuddha/library/blob/main/src/largest-inscribed-rectangle.ts#L43) |
