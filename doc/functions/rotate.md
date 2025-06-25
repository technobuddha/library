<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / rotate

# Function: rotate()

## Call Signature

> **rotate**(`point`: [`Cartesian`](../type-aliases/Cartesian.md), `angle`: `number`, `origin?`: [`Cartesian`](../type-aliases/Cartesian.md)): [`Cartesian`](../type-aliases/Cartesian.md)

Defined in: [rotate.ts:35](https://github.com/technobuddha/library/blob/main/src/rotate.ts#L35)

Rotates a point or an array of points around a given origin by a specified angle.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](../type-aliases/Cartesian.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` | The angle in radians to rotate the point(s) by. Positive values rotate counterclockwise. |
| `origin?` | [`Cartesian`](../type-aliases/Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](../type-aliases/Cartesian.md)

The rotated point or array of rotated points.

### Examples

```typescript
const point = { x: 1, y: 0 };
const rotated = rotate(point, Math.PI / 2); // { x: 0, y: 1 }
```

```typescript
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = rotate(points, Math.PI / 2, { x: 0, y: 0 });
// [{ x: 0, y: 1 }, { x: -1, y: 0 }]
```

## Call Signature

> **rotate**(`point`: [`Polygon`](../type-aliases/Polygon.md), `angle`: `number`, `origin?`: [`Cartesian`](../type-aliases/Cartesian.md)): [`Polygon`](../type-aliases/Polygon.md)

Defined in: [rotate.ts:36](https://github.com/technobuddha/library/blob/main/src/rotate.ts#L36)

Rotates a point or an array of points around a given origin by a specified angle.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Polygon`](../type-aliases/Polygon.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` | The angle in radians to rotate the point(s) by. Positive values rotate counterclockwise. |
| `origin?` | [`Cartesian`](../type-aliases/Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Polygon`](../type-aliases/Polygon.md)

The rotated point or array of rotated points.

### Examples

```typescript
const point = { x: 1, y: 0 };
const rotated = rotate(point, Math.PI / 2); // { x: 0, y: 1 }
```

```typescript
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = rotate(points, Math.PI / 2, { x: 0, y: 0 });
// [{ x: 0, y: 1 }, { x: -1, y: 0 }]
```
