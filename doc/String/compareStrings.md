<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / compareStrings

# Function: compareStrings()

> **compareStrings**(`a`: `null` \| `string`, `b`: `null` \| `string`, `caseInsensitive`: [`CompareStringsOptions`](CompareStringsOptions.md)): `-1` \| `0` \| `1`

Defined in: [compare-strings.ts:33](https://github.com/technobuddha/library/blob/main/src/compare-strings.ts#L33)

Compare two strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `null` \| `string` | First string |
| `b` | `null` \| `string` | Second string |
| `caseInsensitive` | [`CompareStringsOptions`](CompareStringsOptions.md) | True if strings are to be compared case insensitive (default false) |

## Returns

`-1` \| `0` \| `1`

0 if a == b; -1 if a \< b; 1 if a \> b

## Default Value

```ts
caseInsensitive false
```

## Default Value

```ts
natural false
```

## Default Value

```ts
version false
```
