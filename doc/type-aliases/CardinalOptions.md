<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / CardinalOptions

# Type Alias: CardinalOptions

> **CardinalOptions** = \{ `and?`: [`Numbering`](Numbering.md)\[`"and"`\]; `denominators?`: [`Numbering`](Numbering.md)\[`"denominators"`\]; `digits?`: [`Numbering`](Numbering.md)\[`"digits"`\]; `hyphen?`: [`Numbering`](Numbering.md)\[`"hyphen"`\]; `ordinal?`: [`Numbering`](Numbering.md)\[`"ordinal"`\]; `output?`: `"numeric"` \| `"alphabetic"` \| [`Numbering`](Numbering.md)\[`"output"`\]; `precision?`: [`Numbering`](Numbering.md)\[`"precision"`\]; `tolerance?`: [`Numbering`](Numbering.md)\[`"tolerance"`\]; \}

Defined in: [numbering/cardinal.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L11)

Configuration options for cardinal number conversion.

## Properties

### and?

> `optional` **and**: [`Numbering`](Numbering.md)\[`"and"`\]

Defined in: [numbering/cardinal.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L28)

Text to use for "and" in compound numbers (e.g., "one hundred and one").

#### Default Value

```ts
'' (empty string)
```

***

### denominators?

> `optional` **denominators**: [`Numbering`](Numbering.md)\[`"denominators"`\]

Defined in: [numbering/cardinal.ts:46](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L46)

Type of denominators to use when expressing fractions.

#### Default Value

```ts
'common'
```

***

### digits?

> `optional` **digits**: [`Numbering`](Numbering.md)\[`"digits"`\]

Defined in: [numbering/cardinal.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L22)

Whether to output individual digits instead of number words.

#### Default Value

```ts
false
```

***

### hyphen?

> `optional` **hyphen**: [`Numbering`](Numbering.md)\[`"hyphen"`\]

Defined in: [numbering/cardinal.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L34)

Text to use for hyphens in compound numbers (e.g., "twenty-one").

#### Default Value

```ts
' ' (space)
```

***

### ordinal?

> `optional` **ordinal**: [`Numbering`](Numbering.md)\[`"ordinal"`\]

Defined in: [numbering/cardinal.ts:58](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L58)

Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.

#### Default Value

```ts
false
```

***

### output?

> `optional` **output**: `"numeric"` \| `"alphabetic"` \| [`Numbering`](Numbering.md)\[`"output"`\]

Defined in: [numbering/cardinal.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L16)

Output format for the number representation.

#### Default Value

```ts
'alphabetic'
```

***

### precision?

> `optional` **precision**: [`Numbering`](Numbering.md)\[`"precision"`\]

Defined in: [numbering/cardinal.ts:52](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L52)

Precision for decimal/fraction conversion.

#### Default Value

```ts
9
```

***

### tolerance?

> `optional` **tolerance**: [`Numbering`](Numbering.md)\[`"tolerance"`\]

Defined in: [numbering/cardinal.ts:40](https://github.com/technobuddha/library/blob/main/src/numbering/cardinal.ts#L40)

Tolerance for floating-point comparison when converting decimals to fractions.

#### Default Value

```ts
0.01
```
