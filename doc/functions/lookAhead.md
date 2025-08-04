<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / lookAhead

# Function: lookAhead()

> **lookAhead**\<`T`\>(`array`: `T`[], `options?`: [`LookAheadOptions`](../type-aliases/LookAheadOptions.md)\<`T`\>): [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<\[`T`, `T`\]\>

Defined in: [look-ahead.ts:46](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L46)

Generates pairs of consecutive elements from the input array, with optional handling for the last element.

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The type of elements in the input array. |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `array` | `T`[] | The array to iterate over. |
| `options?` | [`LookAheadOptions`](../type-aliases/LookAheadOptions.md)\<`T`\> | Optional configuration for handling the last element. |

## Returns

[`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<\[`T`, `T`\]\>

A generator yielding tuples of consecutive elements, and optionally a tuple for the last element as specified by options.

## Example

```typescript
// Basic usage
const arr = [1, 2, 3];
for (const [current, next] of lookAhead(arr)) {
  console.log(current, next);
}
// Output: [1, 2], [2, 3]

// With wrapAround
for (const [current, next] of lookAhead(arr, { wrapAround: true })) {
  console.log(current, next);
}
// Output: [1, 2], [2, 3], [3, 1]

// With last
for (const [current, next] of lookAhead(arr, { last: 0 })) {
  console.log(current, next);
}
// Output: [1, 2], [2, 3], [3, 0]
```
