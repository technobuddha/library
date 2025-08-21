<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / DeconstructedNumber

# Type Alias: DeconstructedNumber

> **DeconstructedNumber** = \{ `exponent`: `number`; `mantissa`: `string`; `sign`: `1` \| `-1`; `value`: `number`; \}

Defined in: [@types/deconstructed-number.ts:7](https://github.com/technobuddha/library/blob/main/src/@types/deconstructed-number.ts#L7)

Represents a number that has been deconstructed into its mathematical components.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="exponent"></a> `exponent` | `number` | The exponent part of the number, indicating the power of 10 by which the mantissa is multiplied. | [@types/deconstructed-number.ts:15](https://github.com/technobuddha/library/blob/main/src/@types/deconstructed-number.ts#L15) |
| <a id="mantissa"></a> `mantissa` | `string` | The mantissa (or significand) part of the number, represented as a string. | [@types/deconstructed-number.ts:13](https://github.com/technobuddha/library/blob/main/src/@types/deconstructed-number.ts#L13) |
| <a id="sign"></a> `sign` | `1` \| `-1` | The sign of the number, where 1 indicates positive and -1 indicates negative. | [@types/deconstructed-number.ts:11](https://github.com/technobuddha/library/blob/main/src/@types/deconstructed-number.ts#L11) |
| <a id="value"></a> `value` | `number` | The original numeric value, rounded to the specified precision | [@types/deconstructed-number.ts:9](https://github.com/technobuddha/library/blob/main/src/@types/deconstructed-number.ts#L9) |
