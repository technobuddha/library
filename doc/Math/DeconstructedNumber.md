<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / DeconstructedNumber

# Type Alias: DeconstructedNumber

> **DeconstructedNumber** = \{ `exponent`: `number`; `mantissa`: `string`; `sign`: `1` \| `-1`; `value`: `number`; \}

Defined in: [deconstruct-number.ts:10](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L10)

Represents a number that has been deconstructed into its mathematical components.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="exponent"></a> `exponent` | `number` | The exponent part of the number, indicating the power of 10 by which the mantissa is multiplied. | [deconstruct-number.ts:18](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L18) |
| <a id="mantissa"></a> `mantissa` | `string` | The mantissa (or significand) part of the number, represented as a string. | [deconstruct-number.ts:16](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L16) |
| <a id="sign"></a> `sign` | `1` \| `-1` | The sign of the number, where 1 indicates positive and -1 indicates negative. | [deconstruct-number.ts:14](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L14) |
| <a id="value"></a> `value` | `number` | The original numeric value, rounded to the specified precision | [deconstruct-number.ts:12](https://github.com/technobuddha/library/blob/main/src/deconstruct-number.ts#L12) |
