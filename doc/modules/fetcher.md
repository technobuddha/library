[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / fetcher

# Module: fetcher

## Table of contents

### References

- [default](fetcher.md#default)

### Classes

- [TimeoutError](../classes/fetcher.timeouterror.md)

### Type aliases

- [Options](fetcher.md#options)

### Functions

- [fetcher](fetcher.md#fetcher)

## References

### default

Renames and exports: [fetcher](fetcher.md#fetcher)

## Type aliases

### Options

Ƭ **Options**: RequestInit & { `timeout?`: *number*  }

Defined in: [fetcher.ts:8](../../src/fetcher.ts#L8)

## Functions

### fetcher

▸ **fetcher**(`url`: *string*, `__namedParameters?`: [*Options*](fetcher.md#options)): *Promise*<Response\>

Fetch a remote resource

**`see`** https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch

**`see`** https://developer.mozilla.org/en-US/docs/Web/API/Request/Request

**`throws`** TimeoutError when timeout occurs

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | *string* | - | The url of a resource that you wish to fetch |
| `__namedParameters` | [*Options*](fetcher.md#options) | {} | see [Options](fetcher.md#options) |

**Returns:** *Promise*<Response\>

Defined in: [fetcher.ts:23](../../src/fetcher.ts#L23)
