<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / Numbering

# Type Alias: Numbering

```ts
type Numbering = {
  and: string;
  denominators: "common" | "wrench" | number[];
  hyphen: string;
  ordinal: boolean;
  output: {
     fraction: "numeric" | "alphabetic";
     integer: "numeric" | "alphabetic" | "hybrid";
  };
  precision: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  shift: false | "decimal" | "fraction";
  tolerance: number;
};
```

Defined in: [numbering/numbering.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L16)

Options for controlling how numbers are converted to words or symbols.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="and"></a> `and` | `string` | Word to place after the hundreds. E.g., "one hundred and one" vs. "one hundred one" | [numbering/numbering.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L28) |
| <a id="denominators"></a> `denominators` | `"common"` \| `"wrench"` \| `number`[] | Allowed denominators for fractions. - 'common': typical denominators (2, 3, 4, etc.) - 'wrench': denominators used in wrench sizes - number[]: custom denominators | [numbering/numbering.ts:42](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L42) |
| <a id="hyphen"></a> `hyphen` | `string` | Character to place between the tens and ones units. E.g., "twenty-one" vs. "twenty one" | [numbering/numbering.ts:31](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L31) |
| <a id="ordinal"></a> `ordinal` | `boolean` | Whether to use ordinal form (e.g., "first", "second", "third"). | [numbering/numbering.ts:48](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L48) |
| <a id="output"></a> `output` | \{ `fraction`: `"numeric"` \| `"alphabetic"`; `integer`: `"numeric"` \| `"alphabetic"` \| `"hybrid"`; \} | Output format for integer and fraction parts. - integer: 'numeric' | 'alphabetic' | 'hybrid' - fraction: 'numeric' | 'alphabetic' | [numbering/numbering.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L22) |
| `output.fraction` | `"numeric"` \| `"alphabetic"` | - | [numbering/numbering.ts:24](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L24) |
| `output.integer` | `"numeric"` \| `"alphabetic"` \| `"hybrid"` | - | [numbering/numbering.ts:23](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L23) |
| <a id="precision"></a> `precision` | `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` | Number of decimal places or significant digits to use (1-9). | [numbering/numbering.ts:45](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L45) |
| <a id="shift"></a> `shift` | `false` \| `"decimal"` \| `"fraction"` | Whether to shift the output. - false: no shift - 'decimal': shift decimal part - 'fraction': shift fraction part | [numbering/numbering.ts:56](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L56) |
| <a id="tolerance"></a> `tolerance` | `number` | Maximum allowed difference between the actual and represented value. | [numbering/numbering.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L34) |

