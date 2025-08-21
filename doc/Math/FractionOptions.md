<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / FractionOptions

# Type Alias: FractionOptions

> **FractionOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `shift?`: [`Numbering`](Numbering.md)\[`"shift"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/fraction.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L11)

Options for customizing the output and behavior of fraction number representations.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="and"></a> `and?` | [`Numbering`](Numbering.md)\[`"and"`\] | `(empty string)` | Text to use for "and" in compound numbers (e.g., "one hundred and one"). | [numbering/fraction.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L22) |
| <a id="denominators"></a> `denominators?` | [`Numbering`](Numbering.md)\[`"denominators"`\] | `'common'` | Type of denominators to use when expressing fractions. | [numbering/fraction.ts:40](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L40) |
| <a id="hyphen"></a> `hyphen?` | [`Numbering`](Numbering.md)\[`"hyphen"`\] | `' ' (space)` | Text to use for hyphens in compound numbers (e.g., "twenty-one"). | [numbering/fraction.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L28) |
| <a id="ordinal"></a> `ordinal?` | [`Numbering`](Numbering.md)\[`"ordinal"`\] | `false` | Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers. | [numbering/fraction.ts:52](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L52) |
| <a id="output"></a> `output?` | `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\] | `'alphabetic'` | Output format for the number representation. | [numbering/fraction.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L16) |
| <a id="precision"></a> `precision?` | [`Numbering`](Numbering.md)\[`"precision"`\] | `9` | Precision for decimal/fraction conversion. | [numbering/fraction.ts:46](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L46) |
| <a id="shift"></a> `shift?` | [`Numbering`](Numbering.md)\[`"shift"`\] | `undefined` | Whether to shift the fractional part of the number. | [numbering/fraction.ts:58](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L58) |
| <a id="tolerance"></a> `tolerance?` | [`Numbering`](Numbering.md)\[`"tolerance"`\] | `0.01` | Tolerance for floating-point comparison when converting decimals to fractions. | [numbering/fraction.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L34) |
