<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / OrdinalOptions

# Type Alias: OrdinalOptions

> **OrdinalOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/ordinal.ts:6](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L6)

## Properties

### and?

> `optional` **and**: [`Numbering`](Numbering.md)\[`"and"`\]

Defined in: [numbering/ordinal.ts:17](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L17)

Text to use for "and" in compound numbers (e.g., "one hundred and one").

#### Default Value

```ts
'' (empty string)
```

***

### denominators?

> `optional` **denominators**: [`Numbering`](Numbering.md)\[`"denominators"`\]

Defined in: [numbering/ordinal.ts:35](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L35)

Type of denominators to use when expressing fractions.

#### Default Value

```ts
'common'
```

***

### hyphen?

> `optional` **hyphen**: [`Numbering`](Numbering.md)\[`"hyphen"`\]

Defined in: [numbering/ordinal.ts:23](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L23)

Text to use for hyphens in compound numbers (e.g., "twenty-one").

#### Default Value

```ts
' ' (space)
```

***

### ordinal?

> `optional` **ordinal**: [`Numbering`](Numbering.md)\[`"ordinal"`\]

Defined in: [numbering/ordinal.ts:47](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L47)

Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.

#### Default Value

```ts
false
```

***

### output?

> `optional` **output**: `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| [`Numbering`](Numbering.md)\[`"output"`\]

Defined in: [numbering/ordinal.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L11)

Output format for the number representation.

#### Default Value

```ts
'alphabetic'
```

***

### precision?

> `optional` **precision**: [`Numbering`](Numbering.md)\[`"precision"`\]

Defined in: [numbering/ordinal.ts:41](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L41)

Precision for decimal/fraction conversion.

#### Default Value

```ts
9
```

***

### tolerance?

> `optional` **tolerance**: [`Numbering`](Numbering.md)\[`"tolerance"`\]

Defined in: [numbering/ordinal.ts:29](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L29)

Tolerance for floating-point comparison when converting decimals to fractions.

#### Default Value

```ts
0.01
```
