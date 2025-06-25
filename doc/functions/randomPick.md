<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / randomPick

# Function: randomPick()

> **randomPick**\<`T`\>(`list`: readonly `T`[], `random`: () => `number`): `undefined` \| `T`

Defined in: [random-pick.ts:11](https://github.com/technobuddha/library/blob/main/src/random-pick.ts#L11)

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
