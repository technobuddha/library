<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / WordwrapOptions

# Type Alias: WordwrapOptions

```ts
type WordwrapOptions = {
  cut?: boolean;
  separator?: string;
  trailingSpaces?: boolean;
  width?: number;
};
```

Defined in: [wordwrap.ts:10](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L10)

Options for the [wordwrap](wordwrap.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cut"></a> `cut?` | `boolean` | If true, don't limit breaks to word boundaries | [wordwrap.ts:16](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L16) |
| <a id="separator"></a> `separator?` | `string` | Line separator | [wordwrap.ts:14](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L14) |
| <a id="trailingspaces"></a> `trailingSpaces?` | `boolean` | If true, spaces are added to the end of each line to make all lines equal width, ignored if cut or preserveSpaces is true | [wordwrap.ts:18](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L18) |
| <a id="width"></a> `width?` | `number` | The width to wrap to | [wordwrap.ts:12](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L12) |

