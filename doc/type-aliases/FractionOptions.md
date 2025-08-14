<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / FractionOptions

# Type Alias: FractionOptions

> **FractionOptions** = \{ `and?`: `Numbering`\[`"and"`\]; `denominators?`: `Numbering`\[`"denominators"`\]; `hyphen?`: `Numbering`\[`"hyphen"`\]; `ordinal?`: `Numbering`\[`"ordinal"`\]; `output?`: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| `Numbering`\[`"output"`\]; `precision?`: `Numbering`\[`"precision"`\]; `tolerance?`: `Numbering`\[`"tolerance"`\]; \}

Defined in: [numbering/fraction.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L11)

Options for customizing the output and behavior of fraction number representations.

## Properties

### and?

> `optional` **and**: `Numbering`\[`"and"`\]

Defined in: [numbering/fraction.ts:22](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L22)

Text to use for "and" in compound numbers (e.g., "one hundred and one").

#### Default Value

```ts
'' (empty string)
```

***

### denominators?

> `optional` **denominators**: `Numbering`\[`"denominators"`\]

Defined in: [numbering/fraction.ts:40](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L40)

Type of denominators to use when expressing fractions.

#### Default Value

```ts
'common'
```

***

### hyphen?

> `optional` **hyphen**: `Numbering`\[`"hyphen"`\]

Defined in: [numbering/fraction.ts:28](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L28)

Text to use for hyphens in compound numbers (e.g., "twenty-one").

#### Default Value

```ts
' ' (space)
```

***

### ordinal?

> `optional` **ordinal**: `Numbering`\[`"ordinal"`\]

Defined in: [numbering/fraction.ts:52](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L52)

Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.

#### Default Value

```ts
false
```

***

### output?

> `optional` **output**: `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| `Numbering`\[`"output"`\]

Defined in: [numbering/fraction.ts:16](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L16)

Output format for the number representation.

#### Default Value

```ts
'alphabetic'
```

***

### precision?

> `optional` **precision**: `Numbering`\[`"precision"`\]

Defined in: [numbering/fraction.ts:46](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L46)

Precision for decimal/fraction conversion.

#### Default Value

```ts
9
```

***

### tolerance?

> `optional` **tolerance**: `Numbering`\[`"tolerance"`\]

Defined in: [numbering/fraction.ts:34](https://github.com/technobuddha/library/blob/main/src/numbering/fraction.ts#L34)

Tolerance for floating-point comparison when converting decimals to fractions.

#### Default Value

```ts
0.01
```
