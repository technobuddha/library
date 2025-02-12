<!-- markdownlint-disable -->

[@technobuddha/library](../INDEX.md) / fillTemplate

# Function: fillTemplate()

> **fillTemplate**(`input`: `string`, `values`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `undefined` \| `string`\>, `__namedParameters`: [`FillTemplateOptions`](../type-aliases/FillTemplateOptions.md)): `string`

Defined in: [fill-template.ts:26](https://github.com/technobuddha/library/blob/main/src/fill-template.ts#L26)

Fill a template with supplied values

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The template |
| `values` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `undefined` \| `string`\> | A dictionary of name-values used to fill in values in the template |
| `__namedParameters` | [`FillTemplateOptions`](../type-aliases/FillTemplateOptions.md) | see [FillTemplateOptions](../type-aliases/FillTemplateOptions.md) |

## Returns

`string`

template with values replaced

## Default Value

```ts
open '{{'
```

## Default Value

```ts
close '}}'
```
