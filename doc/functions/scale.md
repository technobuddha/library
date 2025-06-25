<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / scale

# Function: scale()

## Call Signature

> **scale**(`point`: [`Cartesian`](../type-aliases/Cartesian.md), `amount`: `number` \| [`Cartesian`](../type-aliases/Cartesian.md), `origin?`: [`Cartesian`](../type-aliases/Cartesian.md)): [`Cartesian`](../type-aliases/Cartesian.md)

Defined in: [scale.ts:39](https://github.com/technobuddha/library/blob/main/src/scale.ts#L39)

Scales a point or a polygon of points around a given origin by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](../type-aliases/Cartesian.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `amount` | `number` \| [`Cartesian`](../type-aliases/Cartesian.md) | The amount to scale the point(s) by. This can be a number (uniform scaling) or a Cartesian object (non-uniform scaling). |
| `origin?` | [`Cartesian`](../type-aliases/Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](../type-aliases/Cartesian.md)

The rotated point or array of rotated points.

### Examples

```typescript
const point = { x: 1, y: 0 };
const rotated = scale(point, 2); // { x: 2, y: 0 }
```

```typescript
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = scale(points, 2);
// [{ x: 2, y: 0 }, { x: 0, y: 2 }]
```

## Call Signature

> **scale**(`point`: [`Polygon`](../type-aliases/Polygon.md), `angle`: `number` \| [`Cartesian`](../type-aliases/Cartesian.md), `origin?`: [`Cartesian`](../type-aliases/Cartesian.md)): [`Cartesian`](../type-aliases/Cartesian.md)[]

Defined in: [scale.ts:40](https://github.com/technobuddha/library/blob/main/src/scale.ts#L40)

Scales a point or a polygon of points around a given origin by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Polygon`](../type-aliases/Polygon.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` \| [`Cartesian`](../type-aliases/Cartesian.md) | - |
| `origin?` | [`Cartesian`](../type-aliases/Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](../type-aliases/Cartesian.md)[]

The rotated point or array of rotated points.

### Examples

```typescript
const point = { x: 1, y: 0 };
const rotated = scale(point, 2); // { x: 2, y: 0 }
```

```typescript
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = scale(points, 2);
// [{ x: 2, y: 0 }, { x: 0, y: 2 }]
```
