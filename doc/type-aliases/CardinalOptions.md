<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / CardinalOptions

# Type Alias: CardinalOptions

> **CardinalOptions** = \{ `and?`: `string`; `digits?`: `boolean`; `groups?`: `number`; `hyphen?`: `string`; \}

Defined in: [cardinal.ts:18](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L18)

## Properties

### and?

> `optional` **and**: `string`

Defined in: [cardinal.ts:24](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L24)

Word to place after the hundreds.  "one hundred and one" vs. "one hundred one"

***

### digits?

> `optional` **digits**: `boolean`

Defined in: [cardinal.ts:22](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L22)

Use numbers instead of words for the group value, the group name is still output as text

***

### groups?

> `optional` **groups**: `number`

Defined in: [cardinal.ts:20](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L20)

The number of groups to output, each group consists of three digits.

***

### hyphen?

> `optional` **hyphen**: `string`

Defined in: [cardinal.ts:26](https://github.com/technobuddha/library/blob/main/src/cardinal.ts#L26)

Character to place between the tens units and the ones units.  "twenty-one" vs. "twenty one"
