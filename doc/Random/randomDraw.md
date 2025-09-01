[@technobuddha/library](../modules.md) / randomDraw

# Function: randomDraw()

```ts
function randomDraw<T>(list: readonly T[], random: () => number): 
  | undefined
  | {
  draw: T;
  list: T[];
};
```

Defined in: [src/random-draw.ts:15](https://github.com/technobuddha/library/blob/main/src/random-draw.ts#L15)

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

`undefined`

```ts
{
  draw: T;
  list: T[];
}
```

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `draw` | `T` | The item that was randomly drawn from the list | [src/random-draw.ts:21](https://github.com/technobuddha/library/blob/main/src/random-draw.ts#L21) |
| `list` | `T`[] | The list with the drawn item removed | [src/random-draw.ts:23](https://github.com/technobuddha/library/blob/main/src/random-draw.ts#L23) |

Randomly selected item & the list without the drawn item

## Example

```typescript
const items = ['a', 'b', 'c'];
randomDraw(items, () => 0.5); // deterministic for example
// { draw: 'b', list: ['a', 'c'] }
```
