<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / diceCoefficient

# Function: diceCoefficient()

> **diceCoefficient**(`input`: `string`, `compareTo`: `string`, `__nameParameters`: [`DiceCoefficientOptions`](../type-aliases/DiceCoefficientOptions.md)): `number`

Defined in: [dice-coefficient.ts:22](https://github.com/technobuddha/library/blob/main/src/dice-coefficient.ts#L22)

Compute the dice coefficient measure of similarity between two strings

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The first string |
| `compareTo` | `string` | The second string |
| `__nameParameters` | [`DiceCoefficientOptions`](../type-aliases/DiceCoefficientOptions.md) | see [DiceCoefficientOptions](../type-aliases/DiceCoefficientOptions.md) |

## Returns

`number`

a number from 0 (not similar) to 1 (equal) measuring the similarity
