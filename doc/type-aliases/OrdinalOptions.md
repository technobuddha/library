<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / OrdinalOptions

# Type Alias: OrdinalOptions

> **OrdinalOptions** = \{ `and?`: `Numbering`\[`"and"`\]; `denominators?`: `Numbering`\[`"denominators"`\]; `hyphen?`: `Numbering`\[`"hyphen"`\]; `ordinal?`: `Numbering`\[`"ordinal"`\]; `output?`: `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| `Numbering`\[`"output"`\]; `precision?`: `Numbering`\[`"precision"`\]; `tolerance?`: `Numbering`\[`"tolerance"`\]; \}

Defined in: [numbering/ordinal.ts:12](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L12)

Options for formatting ordinal numbers.

## Properties

### and?

> `optional` **and**: `Numbering`\[`"and"`\]

Defined in: [numbering/ordinal.ts:23](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L23)

Text to use for "and" in compound numbers (e.g., "one hundred and one").

#### Default Value

```ts
'' (empty string)
```

***

### denominators?

> `optional` **denominators**: `Numbering`\[`"denominators"`\]

Defined in: [numbering/ordinal.ts:41](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L41)

Type of denominators to use when expressing fractions.

#### Default Value

```ts
'common'
```

***

### hyphen?

> `optional` **hyphen**: `Numbering`\[`"hyphen"`\]

Defined in: [numbering/ordinal.ts:29](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L29)

Text to use for hyphens in compound numbers (e.g., "twenty-one").

#### Default Value

```ts
' ' (space)
```

***

### ordinal?

> `optional` **ordinal**: `Numbering`\[`"ordinal"`\]

Defined in: [numbering/ordinal.ts:53](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L53)

Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.

#### Default Value

```ts
false
```

***

### output?

> `optional` **output**: `"suffix"` \| `"numeric"` \| `"alphabetic"` \| `"hybrid"` \| `Numbering`\[`"output"`\]

Defined in: [numbering/ordinal.ts:17](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L17)

Output format for the number representation.

#### Default Value

```ts
'alphabetic'
```

***

### precision?

> `optional` **precision**: `Numbering`\[`"precision"`\]

Defined in: [numbering/ordinal.ts:47](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L47)

Precision for decimal/fraction conversion.

#### Default Value

```ts
9
```

***

### tolerance?

> `optional` **tolerance**: `Numbering`\[`"tolerance"`\]

Defined in: [numbering/ordinal.ts:35](https://github.com/technobuddha/library/blob/main/src/numbering/ordinal.ts#L35)

Tolerance for floating-point comparison when converting decimals to fractions.

#### Default Value

```ts
0.01
```
