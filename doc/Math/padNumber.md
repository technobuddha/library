<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / padNumber

# Function: padNumber()

```ts
function padNumber(input: number, length: number): string;
```

Defined in: [pad-number.ts:17](https://github.com/technobuddha/library/blob/main/src/pad-number.ts#L17)

Add leading zeros to a number to ensure a string of a minimum length

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `number` | `undefined` | The number to pad |
| `length` | `number` | `2` | The minimum length of the resulting string |

## Returns

`string`

number as a string with leading zeros as needed

## Example

```typescript
padNumber(5); // "05"
padNumber(42, 4); // "0042"
padNumber(-7, 3); // "-07"
padNumber(NaN, 4); // " NaN"
padNumber(Infinity, 6); // "Infinity"
```

