<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Utility](./index.md) / isFunction

# Function: isFunction()

```ts
function isFunction(value: unknown): value is Function;
```

Defined in: [is-function.ts:16](https://github.com/technobuddha/library/blob/main/src/is-function.ts#L16)

Determines whether the provided value is a function.

This includes regular functions, generator functions, async functions, and proxies
that behave like functions. It uses both `typeof` and `Object.prototype.toString`
checks to ensure accurate detection.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `value` | `unknown` | The value to test. |

## Returns

`value is Function`

True if the value is a function, otherwise false.

