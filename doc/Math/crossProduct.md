<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / crossProduct

# Function: crossProduct()

```ts
function crossProduct(
   a: Cartesian, 
   b: Cartesian, 
   o: Cartesian): number;
```

Defined in: [cross-product.ts:18](https://github.com/technobuddha/library/blob/main/src/cross-product.ts#L18)

Calculates the cross product of vectors OA and OB, where O, A, and B are points in 2D Cartesian space.
The result is positive if the sequence OAB makes a counter-clockwise turn,
negative for a clockwise turn, and zero if the points are collinear.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | [`Cartesian`](../Geometry/Cartesian.md) | The endpoint of the first vector (OA). |
| `b` | [`Cartesian`](../Geometry/Cartesian.md) | The endpoint of the second vector (OB). |
| `o` | [`Cartesian`](../Geometry/Cartesian.md) | The origin point (O) from which both vectors originate. |

## Returns

`number`

The scalar cross product of vectors OA and OB.

## See

[Calculate on which side of a straight line is a given point located](https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located|)

