<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / edgeAngles

# Function: edgeAngles()

> **edgeAngles**(`polygon`: [`Polygon`](../type-aliases/Polygon.md), `normalizeTo`: `number`): [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<`number`\>

Defined in: [edge-angles.ts:13](https://github.com/technobuddha/library/blob/main/src/edge-angles.ts#L13)

Generate normalized edge angles from polygon edges.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `polygon` | [`Polygon`](../type-aliases/Polygon.md) | The polygon to extract edge angles from |
| `normalizeTo` | `number` | Angle to normalize to (e.g., Math.PI * 2 for full rotation, Math.PI / 2 for quadrant) |

## Returns

[`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<`number`\>

Generator that yields edge angles, normalized to the specified range
