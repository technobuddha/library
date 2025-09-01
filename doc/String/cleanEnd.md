[@technobuddha/library](../modules.md) / cleanEnd

# Function: cleanEnd()

```ts
function cleanEnd(input: string, characters: 
  | string
  | RegExp
  | (
  | string
  | RegExp)[]): string;
```

Defined in: [src/clean-end.ts:14](https://github.com/technobuddha/library/blob/main/src/clean-end.ts#L14)

Remove all occurrences of characters from the end of the string

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `string` | `undefined` | The string |
| `characters` | \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| ( \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp))[] | `trimEquivalent` | the characters(s) to remove |

## Returns

`string`
