[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / levenshteinDistance

# Function: levenshteinDistance()

> **levenshteinDistance**(`input`, `comparedTo`, `__namedParameters`): `number`

Defined in: [levenshtein-distance.ts:17](https://github.com/technobuddha/library/blob/main/src/levenshtein-distance.ts#L17)

Compute the levenshtein distance between two strings (similarity)

## Parameters

### input

`string`

The string

### comparedTo

`string`

The string to compare to

### \_\_namedParameters

[`LevenshteinDistanceOptions`](../type-aliases/LevenshteinDistanceOptions.md) = `{}`

see [LevenshteinDistanceOptions](../type-aliases/LevenshteinDistanceOptions.md)

## Returns

`number`

the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)

## Default Value

```ts
caseInsensitive true
```
