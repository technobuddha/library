<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / CardinalOptions

# Type Alias: CardinalOptions

> **CardinalOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `shift?`: [`Numbering`](Numbering.md)\[`"shift"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/cardinal.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L11)

Configuration options for cardinal number conversion.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="and"></a> `and?` | [`Numbering`](Numbering.md)\[`"and"`\] | `(empty string)` | Text to use for "and" in compound numbers (e.g., "one hundred and one"). | [numbering/cardinal.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L22) |
| <a id="denominators"></a> `denominators?` | [`Numbering`](Numbering.md)\[`"denominators"`\] | `'common'` | Type of denominators to use when expressing fractions. | [numbering/cardinal.ts:40](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L40) |
| <a id="hyphen"></a> `hyphen?` | [`Numbering`](Numbering.md)\[`"hyphen"`\] | `' ' (space)` | Text to use for hyphens in compound numbers (e.g., "twenty-one"). | [numbering/cardinal.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L28) |
| <a id="ordinal"></a> `ordinal?` | [`Numbering`](Numbering.md)\[`"ordinal"`\] | `false` | Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers. | [numbering/cardinal.ts:52](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L52) |
| <a id="output"></a> `output?` | `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\] | `'alphabetic'` | Output format for the number representation. | [numbering/cardinal.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L16) |
| <a id="precision"></a> `precision?` | [`Numbering`](Numbering.md)\[`"precision"`\] | `9` | Precision for decimal/fraction conversion. | [numbering/cardinal.ts:46](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L46) |
| <a id="shift"></a> `shift?` | [`Numbering`](Numbering.md)\[`"shift"`\] | `undefined` | Whether to shift the fractional part of the number. | [numbering/cardinal.ts:57](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L57) |
| <a id="tolerance"></a> `tolerance?` | [`Numbering`](Numbering.md)\[`"tolerance"`\] | `0.01` | Tolerance for floating-point comparison when converting decimals to fractions. | [numbering/cardinal.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L34) |

