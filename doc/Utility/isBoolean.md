<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Utility](./index.md) / isBoolean

# Function: isBoolean()

```ts
function isBoolean(value: unknown): value is boolean;
```

Defined in: [is-boolean.ts:9](https://github.com/technobuddha/library/blob/main/src/is-boolean.ts#L9)

Determines whether the provided value is a boolean or a Boolean object.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to test. |

## Returns

`value is boolean`

True if the value is a primitive boolean or a Boolean object; otherwise, false.

