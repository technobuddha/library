<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / randomPick

# Function: randomPick()

> **randomPick**\<`T`\>(`list`: `T`[], `random`: () => `number`): `T` \| `undefined`

Defined in: [random-pick.ts:11](https://github.com/technobuddha/library/blob/main/src/random-pick.ts#L11)

Pick a random items from a list.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | `unknown` |

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `list` | `T`[] | `undefined` | Array of items to pick from |
| `random` | () => `number` | `Math.random` | Random number generator |

## Returns

`T` \| `undefined`

Randomly selected item

## Default Value

```ts
random  Math.random
```
