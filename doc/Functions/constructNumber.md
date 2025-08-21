<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / constructNumber

# Function: constructNumber()

> **constructNumber**(`deconstructed`: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`DeconstructedNumber`](../Math/DeconstructedNumber.md), `"value"`\>): `number`

Defined in: [construct-number.ts:9](https://github.com/technobuddha/library/blob/main/src/construct-number.ts#L9)

Reconstructs a number from its deconstructed representation.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deconstructed` | [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`DeconstructedNumber`](../Math/DeconstructedNumber.md), `"value"`\> | An object containing the sign, mantissa, and exponent of the number. |

## Returns

`number`

The reconstructed number.
