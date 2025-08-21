<!-- markdownlint-disable -->

[**@technobuddha/library**](../index.md)

***

[@technobuddha/library](../index.md) / OrdinalOptions

# Type Alias: OrdinalOptions

> **OrdinalOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `shift?`: [`Numbering`](Numbering.md)\[`"shift"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/ordinal.ts:12](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L12)

Options for formatting ordinal numbers.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="and"></a> `and?` | [`Numbering`](Numbering.md)\[`"and"`\] | `(empty string)` | Text to use for "and" in compound numbers (e.g., "one hundred and one"). | [numbering/ordinal.ts:23](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L23) |
| <a id="denominators"></a> `denominators?` | [`Numbering`](Numbering.md)\[`"denominators"`\] | `'common'` | Type of denominators to use when expressing fractions. | [numbering/ordinal.ts:41](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L41) |
| <a id="hyphen"></a> `hyphen?` | [`Numbering`](Numbering.md)\[`"hyphen"`\] | `' ' (space)` | Text to use for hyphens in compound numbers (e.g., "twenty-one"). | [numbering/ordinal.ts:29](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L29) |
| <a id="ordinal"></a> `ordinal?` | [`Numbering`](Numbering.md)\[`"ordinal"`\] | `false` | Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers. | [numbering/ordinal.ts:53](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L53) |
| <a id="output"></a> `output?` | `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\] | `'alphabetic'` | Output format for the number representation. | [numbering/ordinal.ts:17](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L17) |
| <a id="precision"></a> `precision?` | [`Numbering`](Numbering.md)\[`"precision"`\] | `9` | Precision for decimal/fraction conversion. | [numbering/ordinal.ts:47](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L47) |
| <a id="shift"></a> `shift?` | [`Numbering`](Numbering.md)\[`"shift"`\] | `undefined` | Whether to shift the fractional part of the number. | [numbering/ordinal.ts:58](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L58) |
| <a id="tolerance"></a> `tolerance?` | [`Numbering`](Numbering.md)\[`"tolerance"`\] | `0.01` | Tolerance for floating-point comparison when converting decimals to fractions. | [numbering/ordinal.ts:35](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L35) |
