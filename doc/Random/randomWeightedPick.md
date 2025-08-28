<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Random](./index.md) / randomWeightedPick

# Function: randomWeightedPick()

```ts
function randomWeightedPick<T>(list: readonly T[], random: () => number): undefined | T;
```

Defined in: [random-weighted-pick.ts:30](https://github.com/technobuddha/library/blob/main/src/random-weighted-pick.ts#L30)

Selects a random item from a list, where each item has an associated weight that determines its likelihood of being picked.

If the list is empty, it returns `undefined`.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` *extends* [`Weighted`](Weighted.md) | The type of items in the list, extending the `Weighted` interface (must have a `weight` property). |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `list` | readonly `T`[] | `undefined` | The array of weighted items to pick from. |
| `random` | () => `number` | `Math.random` | (Optional) A function that returns a random number between 0 (inclusive) and 1 (exclusive). Defaults to `Math.random`. |

## Returns

`undefined` \| `T`

The randomly selected item based on weights, or `undefined` if the list is empty.

