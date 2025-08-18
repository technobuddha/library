<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / translate

# Function: translate()

## Call Signature

> **translate**(`point`: [`Cartesian`](Cartesian.md), `amount`: [`Cartesian`](Cartesian.md)): [`Cartesian`](Cartesian.md)

Defined in: [translate.ts:31](https://github.com/technobuddha/library/blob/main/src/translate.ts#L31)

Translate a point or an array of points by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Cartesian`](Cartesian.md) | The point or array of points to translate. Each point should be an object with `x` and `y` properties. |
| `amount` | [`Cartesian`](Cartesian.md) | The amount to move the point(s) by. |

### Returns

[`Cartesian`](Cartesian.md)

The translated point or array of translated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const translated = translate(point, { x: 1, y: 2 }); // { x: 2, y: 2 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const translated = translate(points, { x: 1, y: 2 });
// [{ x: 2, y: 2 }, { x: 2, y: 3 }]
```

## Call Signature

> **translate**(`point`: [`Polygon`](Polygon.md), `amount`: [`Cartesian`](Cartesian.md)): [`Polygon`](Polygon.md)

Defined in: [translate.ts:32](https://github.com/technobuddha/library/blob/main/src/translate.ts#L32)

Translate a point or an array of points by a specified amount.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `point` | [`Polygon`](Polygon.md) | The point or array of points to translate. Each point should be an object with `x` and `y` properties. |
| `amount` | [`Cartesian`](Cartesian.md) | The amount to move the point(s) by. |

### Returns

[`Polygon`](Polygon.md)

The translated point or array of translated points.

### Examples

```ts
const point = { x: 1, y: 0 };
const translated = translate(point, { x: 1, y: 2 }); // { x: 2, y: 2 }
```

```ts
const points = [{ x: 1, y: 0 }, { x: 0, y: 1 }];
const translated = translate(points, { x: 1, y: 2 });
// [{ x: 2, y: 2 }, { x: 2, y: 3 }]
```
