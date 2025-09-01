[@technobuddha/library](../modules.md) / cleanStart

# Function: cleanStart()

```ts
function cleanStart(input: string, characters: 
  | string
  | RegExp
  | (
  | string
  | RegExp)[]): string;
```

Defined in: [src/clean-start.ts:14](https://github.com/technobuddha/library/blob/main/src/clean-start.ts#L14)

Remove all occurrences of characters from the start of the string

## Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `input` | `string` | `undefined` | The string |
| `characters` | \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| ( \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp))[] | `trimEquivalent` | The characters(s) to remove |

## Returns

`string`
