<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / OrdinalOptions

# Type Alias: OrdinalOptions

```ts
type OrdinalOptions = {
  and?: Numbering["and"];
  denominators?: Numbering["denominators"];
  hyphen?: Numbering["hyphen"];
  ordinal?: Numbering["ordinal"];
  output?:   | "suffix"
     | "numeric"
     | "alphabetic"
     | "hybrid"
     | Numbering["output"];
  precision?: Numbering["precision"];
  shift?: Numbering["shift"];
  tolerance?: Numbering["tolerance"];
};
```

Defined in: ordinal.ts:10

Options for formatting ordinal numbers.

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="and"></a> `and?` | [`Numbering`](Numbering.md)\[`"and"`\] | `(empty string)` | Text to use for "and" in compound numbers (e.g., "one hundred and one"). | ordinal.ts:21 |
| <a id="denominators"></a> `denominators?` | [`Numbering`](Numbering.md)\[`"denominators"`\] | `'common'` | Type of denominators to use when expressing fractions. | ordinal.ts:39 |
| <a id="hyphen"></a> `hyphen?` | [`Numbering`](Numbering.md)\[`"hyphen"`\] | `' ' (space)` | Text to use for hyphens in compound numbers (e.g., "twenty-one"). | ordinal.ts:27 |
| <a id="ordinal"></a> `ordinal?` | [`Numbering`](Numbering.md)\[`"ordinal"`\] | `false` | Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers. | ordinal.ts:51 |
| <a id="output"></a> `output?` | \| `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\] | `'alphabetic'` | Output format for the number representation. | ordinal.ts:15 |
| <a id="precision"></a> `precision?` | [`Numbering`](Numbering.md)\[`"precision"`\] | `9` | Precision for decimal/fraction conversion. | ordinal.ts:45 |
| <a id="shift"></a> `shift?` | [`Numbering`](Numbering.md)\[`"shift"`\] | `undefined` | Whether to shift the fractional part of the number. | ordinal.ts:56 |
| <a id="tolerance"></a> `tolerance?` | [`Numbering`](Numbering.md)\[`"tolerance"`\] | `0.01` | Tolerance for floating-point comparison when converting decimals to fractions. | ordinal.ts:33 |

