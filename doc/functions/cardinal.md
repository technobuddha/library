[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / cardinal

# Function: cardinal()

> **cardinal**(`input`, `__namedParameters`): `string`

Defined in: [cardinal.ts:64](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L64)

Convert a number into text (the cardinal number)

## Parameters

### input

`number`

The number

### \_\_namedParameters

[`CardinalOptions`](../type-aliases/CardinalOptions.md) = `{}`

see [CardinalOptions](../type-aliases/CardinalOptions.md)

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
