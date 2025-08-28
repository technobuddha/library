<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / constructNumber

# Function: constructNumber()

```ts
function constructNumber(deconstructed: Omit<DeconstructedNumber, "value">): number;
```

Defined in: [construct-number.ts:11](https://github.com/technobuddha/library/blob/main/src/construct-number.ts#L11)

Reconstructs a number from its deconstructed representation.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `deconstructed` | [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`DeconstructedNumber`](DeconstructedNumber.md), `"value"`\> | An object containing the sign, mantissa, and exponent of the number. |

## Returns

`number`

The reconstructed number.

