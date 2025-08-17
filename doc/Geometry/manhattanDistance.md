<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / manhattanDistance

# Function: manhattanDistance()

> **manhattanDistance**(`a`: [`Cartesian`](Cartesian.md), `b`: [`Cartesian`](Cartesian.md)): `number`

Defined in: [manhattan-distance.ts:23](https://github.com/technobuddha/library/blob/main/src/manhattan-distance.ts#L23)

Calculates the Manhattan distance between two points in Cartesian coordinates.

The Manhattan distance is the sum of the absolute differences of their Cartesian coordinates.
It is often used in grid-based path-finding algorithms.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | [`Cartesian`](Cartesian.md) | The first point with `x` and `y` properties. |
| `b` | [`Cartesian`](Cartesian.md) | The second point with `x` and `y` properties. |

## Returns

`number`

The Manhattan distance between the two points.

## Example

```typescript
const pointA = { x: 1, y: 2 };
const pointB = { x: 4, y: 6 };
const distance = manhattanDistance(pointA, pointB); // 7
```
