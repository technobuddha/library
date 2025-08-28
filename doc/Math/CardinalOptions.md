<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / CardinalOptions

# Type Alias: CardinalOptions

```ts
type CardinalOptions = {
  and?: Numbering["and"];
  denominators?: Numbering["denominators"];
  hyphen?: Numbering["hyphen"];
  ordinal?: Numbering["ordinal"];
  output?:   | "numeric"
     | "alphabetic"
     | "hybrid"
     | Numbering["output"];
  precision?: Numbering["precision"];
  shift?: Numbering["shift"];
  tolerance?: Numbering["tolerance"];
};
```

Defined in: cardinal.ts:9

Configuration options for cardinal number conversion.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="and"></a> `and?` | [`Numbering`](Numbering.md)\[`"and"`\] | `(empty string)` | Text to use for "and" in compound numbers (e.g., "one hundred and one"). | cardinal.ts:20 |
| <a id="denominators"></a> `denominators?` | [`Numbering`](Numbering.md)\[`"denominators"`\] | `'common'` | Type of denominators to use when expressing fractions. | cardinal.ts:38 |
| <a id="hyphen"></a> `hyphen?` | [`Numbering`](Numbering.md)\[`"hyphen"`\] | `' ' (space)` | Text to use for hyphens in compound numbers (e.g., "twenty-one"). | cardinal.ts:26 |
| <a id="ordinal"></a> `ordinal?` | [`Numbering`](Numbering.md)\[`"ordinal"`\] | `false` | Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers. | cardinal.ts:50 |
| <a id="output"></a> `output?` | \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\] | `'alphabetic'` | Output format for the number representation. | cardinal.ts:14 |
| <a id="precision"></a> `precision?` | [`Numbering`](Numbering.md)\[`"precision"`\] | `9` | Precision for decimal/fraction conversion. | cardinal.ts:44 |
| <a id="shift"></a> `shift?` | [`Numbering`](Numbering.md)\[`"shift"`\] | `undefined` | Whether to shift the fractional part of the number. | cardinal.ts:55 |
| <a id="tolerance"></a> `tolerance?` | [`Numbering`](Numbering.md)\[`"tolerance"`\] | `0.01` | Tolerance for floating-point comparison when converting decimals to fractions. | cardinal.ts:32 |

