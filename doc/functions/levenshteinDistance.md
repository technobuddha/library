<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / levenshteinDistance

# Function: levenshteinDistance()

> **levenshteinDistance**(`input`: `string`, `comparedTo`: `string`, `__namedParameters`: [`LevenshteinDistanceOptions`](../type-aliases/LevenshteinDistanceOptions.md)): `number`

Defined in: [levenshtein-distance.ts:23](https://github.com/technobuddha/library/blob/main/src/levenshtein-distance.ts#L23)

Compute the levenshtein distance between two strings (similarity)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string |
| `comparedTo` | `string` | The string to compare to |
| `__namedParameters` | [`LevenshteinDistanceOptions`](../type-aliases/LevenshteinDistanceOptions.md) | see [LevenshteinDistanceOptions](../type-aliases/LevenshteinDistanceOptions.md) |

## Returns

`number`

the levenshteinDistance between the two strings (0 for no similarity through 1 for equal)

## Default Value

```ts
caseInsensitive true
```
