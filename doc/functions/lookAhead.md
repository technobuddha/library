<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / lookAhead

# Function: lookAhead()

> **lookAhead**\<`T`\>(`array`: `T`[], `options?`: [`LookAheadOptions`](../type-aliases/LookAheadOptions.md)\<`T`\>): [`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<\[`T`, `T`, `number`\]\>

Defined in: [look-ahead.ts:56](https://github.com/technobuddha/library/blob/main/src/look-ahead.ts#L56)

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

[`Generator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Generator)\<\[`T`, `T`, `number`\]\>

A generator yielding tuples of consecutive elements, and optionally a tuple for the last element as specified by options.

## Example

Basic usage
```typescript
const arr = [1, 2, 3];
for (const [current, next] of lookAhead(arr)) {
  console.log(current, next);
}
```
Output: [1, 2], [2, 3]

With wrapAround
```typescript
for (const [current, next] of lookAhead(arr, { wrapAround: true })) {
  console.log(current, next);
}
```
Output: [1, 2], [2, 3], [3, 1]

With last
```typescript
for (const [current, next] of lookAhead(arr, { last: 0 })) {
  console.log(current, next);
}
```
Output: [1, 2], [2, 3], [3, 0]
