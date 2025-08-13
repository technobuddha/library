<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / Numbering

# Type Alias: Numbering

> **Numbering** = \{ `and`: `string`; `denominators`: `"common"` \| `"wrench"` \| `number`[]; `digits`: `boolean`; `hyphen`: `string`; `ordinal?`: `boolean`; `output`: \{ `fraction`: `"numeric"` \| `"alphabetic"`; `integer`: `"numeric"` \| `"alphabetic"`; \}; `precision`: `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9`; `tolerance`: `number`; \}

Defined in: [numbering/numbering.ts:10](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L10)

## Properties

### and

> **and**: `string`

Defined in: [numbering/numbering.ts:19](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L19)

Word to place after the hundreds.  "one hundred and one" vs. "one hundred one"

***

### denominators

> **denominators**: `"common"` \| `"wrench"` \| `number`[]

Defined in: [numbering/numbering.ts:24](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L24)

***

### digits

> **digits**: `boolean`

Defined in: [numbering/numbering.ts:17](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L17)

Use numbers instead of words for the group value, the group name is still output as text

***

### hyphen

> **hyphen**: `string`

Defined in: [numbering/numbering.ts:21](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L21)

Character to place between the tens units and the ones units.  "twenty-one" vs. "twenty one"

***

### ordinal?

> `optional` **ordinal**: `boolean`

Defined in: [numbering/numbering.ts:26](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L26)

***

### output

> **output**: \{ `fraction`: `"numeric"` \| `"alphabetic"`; `integer`: `"numeric"` \| `"alphabetic"`; \}

Defined in: [numbering/numbering.ts:11](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L11)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `fraction` | `"numeric"` \| `"alphabetic"` | [numbering/numbering.ts:13](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L13) |
| `integer` | `"numeric"` \| `"alphabetic"` | [numbering/numbering.ts:12](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L12) |

***

### precision

> **precision**: `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9`

Defined in: [numbering/numbering.ts:25](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L25)

***

### tolerance

> **tolerance**: `number`

Defined in: [numbering/numbering.ts:23](https://github.com/technobuddha/library/blob/main/src/numbering/numbering.ts#L23)
