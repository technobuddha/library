<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [English](./index.md) / ConjoinOptions

# Type Alias: ConjoinOptions

```ts
type ConjoinOptions = {
  conjunction?: string;
  oxford?: boolean;
  separator?: string;
};
```

Defined in: [conjoin.ts:10](https://github.com/technobuddha/library/blob/main/src/conjoin.ts#L10)

Options for creating a coordinated list with [conjoin](conjoin.md)

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="conjunction"></a> `conjunction?` | `string` | `'and'` | Conjunction to insert in the last position | [conjoin.ts:15](https://github.com/technobuddha/library/blob/main/src/conjoin.ts#L15) |
| <a id="oxford"></a> `oxford?` | `boolean` | `true` | If true, use the oxford comma | [conjoin.ts:20](https://github.com/technobuddha/library/blob/main/src/conjoin.ts#L20) |
| <a id="separator"></a> `separator?` | `string` | `','` | String used to separate values | [conjoin.ts:25](https://github.com/technobuddha/library/blob/main/src/conjoin.ts#L25) |

