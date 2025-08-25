<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Geometry](./index.md) / scale

# Function: scale()

## Call Signature

```ts
function scale(
   point: Cartesian, 
   amount: number | Cartesian, 
   origin?: Cartesian): Cartesian;
```

Defined in: [scale.ts:39](https://github.com/technobuddha/library/blob/main/src/scale.ts#L39)

Scales a point or a polygon of points around a given origin by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](Cartesian.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `amount` | `number` \| [`Cartesian`](Cartesian.md) | The amount to scale the point(s) by. This can be a number (uniform scaling) or a Cartesian object (non-uniform scaling). |
| `origin?` | [`Cartesian`](Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](Cartesian.md)

The rotated point or array of rotated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const rotated = scale(point, 2); // { x: 2, y: 0 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = scale(points, 2);
// [{ x: 2, y: 0 }, { x: 0, y: 2 }]
```

## Call Signature

```ts
function scale(
   point: Polygon, 
   angle: number | Cartesian, 
   origin?: Cartesian): Cartesian[];
```

Defined in: [scale.ts:40](https://github.com/technobuddha/library/blob/main/src/scale.ts#L40)

Scales a point or a polygon of points around a given origin by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Polygon`](Polygon.md) | The point or array of points to rotate. Each point should be an object with `x` and `y` properties. |
| `angle` | `number` \| [`Cartesian`](Cartesian.md) | - |
| `origin?` | [`Cartesian`](Cartesian.md) | (Optional) The origin to rotate around. Defaults to `{ x: 0, y: 0 }` if not provided. |

### Returns

[`Cartesian`](Cartesian.md)[]

The rotated point or array of rotated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const rotated = scale(point, 2); // { x: 2, y: 0 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const rotated = scale(points, 2);
// [{ x: 2, y: 0 }, { x: 0, y: 2 }]
```

