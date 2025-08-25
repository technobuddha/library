<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / modulo

# Function: modulo()

> **modulo**(`dividend`: `number`, `divisor`: `number`): `number`

Defined in: [modulo.ts:17](https://github.com/technobuddha/library/blob/main/src/modulo.ts#L17)

The % operator in JavaScript returns the remainder of a / b, but differs from
some other languages in that the result will have the same sign as the
dividend. For example, -1 % 8 == -1, whereas in some other languages
(such as Python) the result would be 7. This function emulates the more
correct modulo behavior, which is useful for certain applications such as
calculating an offset index in a circular list.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dividend` | `number` | The dividend. |
| `divisor` | `number` | The divisor. |

## Returns

`number`

a % b where the result is between 0 and b (either 0 \<= x \< b
or b \< x \<= 0, depending on the sign of b).

