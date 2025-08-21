<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / isRect

# Function: isRect()

> **isRect**(`object`: `unknown`): `object is Rect`

Defined in: [is-rect.ts:15](https://github.com/technobuddha/library/blob/main/src/is-rect.ts#L15)

Determines if the provided value is a Rectangle.

A value is considered a rectangle if it is a non-null object
that contains numeric `x`, `y`, 'width', and 'height' properties.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `object` | `unknown` | The value to test for Rectangle structure. |

## Returns

`object is Rect`

`true` if the value is a Rectangle, otherwise `false`.
