<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Encoding](./index.md) / escapeHTML

# Function: escapeHTML()

```ts
function escapeHTML(input: string, options: EscapeHtmlOptions): string;
```

Defined in: [escape-html.ts:30](https://github.com/technobuddha/library/blob/main/src/escape-html.ts#L30)

Escape a string for use in HTML

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to escape |
| `options` | [`EscapeHtmlOptions`](EscapeHtmlOptions.md) | see [EscapeHtmlOptions](EscapeHtmlOptions.md) |

## Returns

`string`

## Example

```typescript
console.log(escapeHTML('<div>hello</div>'));
// &lt;div&gt;hello&lt;/div&gt;

console.log(escapeHTML('aáΔ😀', { escapeNonASCII: true }));
// a&#225;&#916;&#128512;
```

