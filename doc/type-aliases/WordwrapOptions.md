<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / WordwrapOptions

# Type Alias: WordwrapOptions

> **WordwrapOptions** = \{ `cut?`: `boolean`; `separator?`: `string`; `trailingSpaces?`: `boolean`; `width?`: `number`; \}

Defined in: [wordwrap.ts:8](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L8)

## Properties

### cut?

> `optional` **cut**: `boolean`

Defined in: [wordwrap.ts:14](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L14)

If true, don't limit breaks to word boundaries

***

### separator?

> `optional` **separator**: `string`

Defined in: [wordwrap.ts:12](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L12)

Line separator

***

### trailingSpaces?

> `optional` **trailingSpaces**: `boolean`

Defined in: [wordwrap.ts:16](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L16)

If true, spaces are added to the end of each line to make all lines equal width, ignored if cut or preserveSpaces is true

***

### width?

> `optional` **width**: `number`

Defined in: [wordwrap.ts:10](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L10)

The width to wrap to
