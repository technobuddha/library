<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / unescapeJS

# Function: unescapeJS()

```ts
function unescapeJS(input: string): string;
```

Defined in: [unescape-js.ts:26](https://github.com/technobuddha/library/blob/main/src/unescape-js.ts#L26)

Unescape a string encoded in Javascript style

| Escape Sequence      | Character          | Hex                  |
| -------------------- | ------------------ | -------------------- |
| \\b                  | Backspace          | 0x08                 |
| \\t                  | Tab                | 0x09                 |
| \\n                  | Newline            | 0x0a                 |
| \\v                  | Vertical Tab       | 0x0b                 |
| \\f                  | Form Feed          | 0x0c                 |
| \\r                  | Carriage Return    | 0x0d                 |
| \\"                  | Double Quote       | 0x22                 |
| \\'                  | Single Quote       | 0x27                 |
| \\\\                 | Backslash          | 0x5c                 |
| \\n…n[^1]            | Octal Escape       | 0x0000-0x01ff    |
| \\xnn                | Hexadecimal Escape | 0x0000-0x00ff    |
| \\unnnn              | Unicode Escape     | 0x00000-0x00ffff   |
| \\u{n…}            | Code Point Escape  | 0x00000-0x10ffff   |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | the string to unescape |

## Returns

`string`

the string with escapes resolved

