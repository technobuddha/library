<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / cardinal

# Function: cardinal()

> **cardinal**(`input`: `number`, `__namedParameters`: [`CardinalOptions`](../type-aliases/CardinalOptions.md)): `string`

Defined in: [cardinal.ts:80](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L80)

Convert a number into text (the cardinal number)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | The number |
| `__namedParameters` | [`CardinalOptions`](../type-aliases/CardinalOptions.md) | see [CardinalOptions](../type-aliases/CardinalOptions.md) |

## Returns

`string`

The number spelled out

## Remarks

There is no limit to the numbers that can be expressed, however Javascript/Typescript can only represent numbers
up to uncentillions (1e308).

## Default Value

```ts
groups Infinity
```

## Default Value

```ts
digits false
```

## Default Value

```ts
and (empty)
```

## Default Value

```ts
hyphen (space)
```
