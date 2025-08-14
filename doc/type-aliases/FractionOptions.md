<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / FractionOptions

# Type Alias: FractionOptions

> **FractionOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/fraction.ts:5](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L5)

## Properties

### and?

> `optional` **and**: [`Numbering`](Numbering.md)\[`"and"`\]

Defined in: [numbering/fraction.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L16)

Text to use for "and" in compound numbers (e.g., "one hundred and one").

#### Default Value

```ts
'' (empty string)
```

***

### denominators?

> `optional` **denominators**: [`Numbering`](Numbering.md)\[`"denominators"`\]

Defined in: [numbering/fraction.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L34)

Type of denominators to use when expressing fractions.

#### Default Value

```ts
'common'
```

***

### hyphen?

> `optional` **hyphen**: [`Numbering`](Numbering.md)\[`"hyphen"`\]

Defined in: [numbering/fraction.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L22)

Text to use for hyphens in compound numbers (e.g., "twenty-one").

#### Default Value

```ts
' ' (space)
```

***

### ordinal?

> `optional` **ordinal**: [`Numbering`](Numbering.md)\[`"ordinal"`\]

Defined in: [numbering/fraction.ts:46](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L46)

Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.

#### Default Value

```ts
false
```

***

### output?

> `optional` **output**: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]

Defined in: [numbering/fraction.ts:10](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L10)

Output format for the number representation.

#### Default Value

```ts
'alphabetic'
```

***

### precision?

> `optional` **precision**: [`Numbering`](Numbering.md)\[`"precision"`\]

Defined in: [numbering/fraction.ts:40](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L40)

Precision for decimal/fraction conversion.

#### Default Value

```ts
9
```

***

### tolerance?

> `optional` **tolerance**: [`Numbering`](Numbering.md)\[`"tolerance"`\]

Defined in: [numbering/fraction.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L28)

Tolerance for floating-point comparison when converting decimals to fractions.

#### Default Value

```ts
0.01
```
