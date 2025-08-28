<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / wordwrap

# Function: wordwrap()

```ts
function wordwrap(input: string, options: WordwrapOptions): string;
```

Defined in: [wordwrap.ts:34](https://github.com/technobuddha/library/blob/main/src/wordwrap.ts#L34)

Wrap text so that it fits within a area of fixed width

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | the text to wrap |
| `options` | [`WordwrapOptions`](WordwrapOptions.md) | see [WordwrapOptions](WordwrapOptions.md) |

## Returns

`string`

wrapped text

## Default Value

```ts
width 75
```

## Default Value

```ts
separator \\n
```

## Default Value

```ts
cut default false
```

## Default Value

```ts
trailingSpaces false
```

