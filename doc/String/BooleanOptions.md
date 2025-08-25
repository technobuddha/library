<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [String](./index.md) / BooleanOptions

# Type Alias: BooleanOptions

```ts
type BooleanOptions = {
  falseValues?: Iterable<
     | string
    | RegExp>;
  trueValues?: Iterable<
     | string
    | RegExp>;
};
```

Defined in: [to-boolean.ts:9](https://github.com/technobuddha/library/blob/main/src/to-boolean.ts#L9)

Options for the [toBoolean](toBoolean.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="falsevalues"></a> `falseValues?` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\< \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)\> | An iterable list of values that are "false" | [to-boolean.ts:13](https://github.com/technobuddha/library/blob/main/src/to-boolean.ts#L13) |
| <a id="truevalues"></a> `trueValues?` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\< \| `string` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)\> | An iterable list of values that are "true" | [to-boolean.ts:11](https://github.com/technobuddha/library/blob/main/src/to-boolean.ts#L11) |

