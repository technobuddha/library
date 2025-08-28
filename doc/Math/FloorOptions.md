<!-- markdownlint-disable -->
<!-- cspell: disable -->
Technobuddha Library
---

[Library](../index.md) / [Math](./index.md) / FloorOptions

# Type Alias: FloorOptions

```ts
type FloorOptions = {
  precision?: number;
  tolerance?: number;
};
```

Defined in: [floor.ts:10](https://github.com/technobuddha/library/blob/main/src/floor.ts#L10)

Options for the [floor](floor.md) function

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="precision"></a> `precision?` | `number` | The number of decimal places to consider when applying the ceiling. Defaults to 0. | [floor.ts:14](https://github.com/technobuddha/library/blob/main/src/floor.ts#L14) |
| <a id="tolerance"></a> `tolerance?` | `number` | A small value to add to the input before applying the floor, useful for floating-point tolerance. Defaults to 0. | [floor.ts:12](https://github.com/technobuddha/library/blob/main/src/floor.ts#L12) |

