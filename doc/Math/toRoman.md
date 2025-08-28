<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / toRoman

# Function: toRoman()

```ts
function toRoman(input: number, options: RomanOptions): string;
```

Defined in: [roman-numeral.ts:143](https://github.com/technobuddha/library/blob/main/src/roman-numeral.ts#L143)

Parse number into a roman numeral string

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `number` | The number to turn into a roman numeral |
| `options` | [`RomanOptions`](RomanOptions.md) | see [RomanOptions](RomanOptions.md) |

## Returns

`string`

Converted roman numeral

## Example

```typescript
toRoman(1); // "I"
toRoman(4); // "IV"
toRoman(9); // "IX"
toRoman(2024); // "MMXXIV"
toRoman(49, { format: 'apostrophus' }); // "IL"
```

