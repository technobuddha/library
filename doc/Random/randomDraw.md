<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Random](./index.md) / randomDraw

# Function: randomDraw()

> **randomDraw**\<`T`\>(`list`: readonly `T`[], `random`: () => `number`): `undefined` \| \{ `draw`: `T`; `list`: `T`[]; \}

Defined in: [random-draw.ts:11](https://github.com/technobuddha/library/blob/main/src/random-draw.ts#L11)

Draw a random item from a list.  Returning both the item and the list without the drawn item.

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

`undefined` \| \{ `draw`: `T`; `list`: `T`[]; \}

Randomly selected item & the list without the drawn item

## Default Value

```ts
random  Math.random
```

