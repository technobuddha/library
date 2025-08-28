<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [JSON](./index.md) / reviver

# Function: reviver()

```ts
function reviver(
   this: unknown, 
   _key: string, 
   value: unknown): unknown;
```

Defined in: [json.ts:50](https://github.com/technobuddha/library/blob/main/src/json.ts#L50)

Used with JSON.parse to decode objected encoded by [replacer](replacer.md)

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `this` | `unknown` | The raw object |
| `_key` | `string` | The key |
| `value` | `unknown` | The value |

## Returns

`unknown`

the decoded value

