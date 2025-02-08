[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / randomPick

# Function: randomPick()

> **randomPick**\<`T`\>(`list`, `random`): `T` \| `undefined`

Defined in: [random-pick.ts:9](https://github.com/technobuddha/library/blob/main/src/random-pick.ts#L9)

Pick a random items from a list.

## Type Parameters

• **T** = `unknown`

## Parameters

### list

`T`[]

Array of items to pick from

### random

() => `number`

Random number generator

## Returns

`T` \| `undefined`

Randomly selected item

## Default Value

```ts
random  Math.random
```
