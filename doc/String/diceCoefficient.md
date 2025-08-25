<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / diceCoefficient

# Function: diceCoefficient()

> **diceCoefficient**(`input`: `string`, `compareTo`: `string`, `__nameParameters`: [`DiceCoefficientOptions`](DiceCoefficientOptions.md)): `number`

Defined in: [dice-coefficient.ts:24](https://github.com/technobuddha/library/blob/main/src/dice-coefficient.ts#L24)

Compute the dice coefficient measure of similarity between two strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The first string |
| `compareTo` | `string` | The second string |
| `__nameParameters` | [`DiceCoefficientOptions`](DiceCoefficientOptions.md) | see [DiceCoefficientOptions](DiceCoefficientOptions.md) |

## Returns

`number`

a number from 0 (not similar) to 1 (equal) measuring the similarity

