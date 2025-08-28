<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Random](./index.md) / randomPick

# Function: randomPick()

```ts
function randomPick<T>(list: readonly T[], random: () => number): undefined | T;
```

Defined in: [random-pick.ts:10](https://github.com/technobuddha/library/blob/main/src/random-pick.ts#L10)

Pick a random items from a list.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `list` | readonly `T`[] | `undefined` | Array of items to pick from |
| `random` | () => `number` | `Math.random` | Random number generator |

## Returns

`undefined` \| `T`

Randomly selected item

## Default Value

```ts
random  Math.random
```

