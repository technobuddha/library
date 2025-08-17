<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / cardinal

# Function: cardinal()

> **cardinal**(`input`: `number`, `options`: [`CardinalOptions`](CardinalOptions.md)): `string`

Defined in: [numbering/cardinal.ts:71](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L71)

Convert a number into text (the cardinal number)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | The number |
| `options` | [`CardinalOptions`](CardinalOptions.md) | see [CardinalOptions](CardinalOptions.md) |

## Returns

`string`

The number spelled out

## Remarks

There is no limit to the numbers that can be expressed, however Javascript/Typescript can only represent numbers
up to uncentillions (1e308).
