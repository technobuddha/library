<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / unescapeHTML

# Function: unescapeHTML()

```ts
function unescapeHTML(input: string): string;
```

Defined in: [unescape-html.ts:17](https://github.com/technobuddha/library/blob/main/src/unescape-html.ts#L17)

Unescape a string encoded in HTML

| Escape Sequence    | Character                |
| ------------------ | ------------------------ |
| &#n…;              | Numeric character        |
| &#xn…;             | Hexadecimal character    |
| &xc…;              | Named entity

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to unescape |

## Returns

`string`

the string with escapes resolved

