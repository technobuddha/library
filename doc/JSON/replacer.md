<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [JSON](./index.md) / replacer

# Function: replacer()

> **replacer**(`this`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\>, `key`: `string`, `value`: `unknown`): `unknown`

Defined in: [json.ts:25](https://github.com/technobuddha/library/blob/main/src/json.ts#L25)

Used with JSON.stringify to encode a wider range of objects into strings that can later be decoded with [reviver](reviver.md)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> | The raw object being stringified |
| `key` | `string` | The key for the field |
| `value` | `unknown` | The value (may have already been encoded into a string) |

## Returns

`unknown`

the encoded value

## Remarks

Will encode Date, RegExp and BigInt objects.  The numeric values 'Infinity' and 'NaN' are also encoded.

