<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / rotate

# Function: rotate()

## Call Signature

> **rotate**(`point`: [`Cartesian`](Cartesian.md), `angle`: `number`, `origin?`: [`Cartesian`](Cartesian.md)): [`Cartesian`](Cartesian.md)

Defined in: [rotate.ts:35](https://github.com/technobuddha/library/blob/main/src/rotate.ts#L35)

Rotates a point or an array of points around a given origin by a specified angle.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](Cartesian.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` | The angle in radians to rotate the point(s) by. Positive values rotate counterclockwise. |
| `origin?` | [`Cartesian`](Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](Cartesian.md)

The rotated point or array of rotated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const rotated = rotate(point, Math.PI / 2); // { x: 0, y: 1 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = rotate(points, Math.PI / 2, { x: 0, y: 0 });
// [{ x: 0, y: 1 }, { x: -1, y: 0 }]
```

## Call Signature

> **rotate**(`point`: [`Polygon`](Polygon.md), `angle`: `number`, `origin?`: [`Cartesian`](Cartesian.md)): [`Polygon`](Polygon.md)

Defined in: [rotate.ts:36](https://github.com/technobuddha/library/blob/main/src/rotate.ts#L36)

Rotates a point or an array of points around a given origin by a specified angle.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Polygon`](Polygon.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` | The angle in radians to rotate the point(s) by. Positive values rotate counterclockwise. |
| `origin?` | [`Cartesian`](Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Polygon`](Polygon.md)

The rotated point or array of rotated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const rotated = rotate(point, Math.PI / 2); // { x: 0, y: 1 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = rotate(points, Math.PI / 2, { x: 0, y: 0 });
// [{ x: 0, y: 1 }, { x: -1, y: 0 }]
```
