<!-- markdownlint-disable -->

[@technobuddha/library](../index.md) / fillTemplate

# Function: fillTemplate()

> **fillTemplate**(`input`: `string`, `values`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `string` \| `undefined`\>, `__namedParameters`: [`FillTemplateOptions`](FillTemplateOptions.md)): `string`

Defined in: [fill-template.ts:26](https://github.com/technobuddha/library/blob/main/src/fill-template.ts#L26)

Fill a template with supplied values

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The template |
| `values` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `string` \| `undefined`\> | A dictionary of name-values used to fill in values in the template |
| `__namedParameters` | [`FillTemplateOptions`](FillTemplateOptions.md) | see [FillTemplateOptions](FillTemplateOptions.md) |

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
