[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [fetcher](../modules/fetcher.md) / TimeoutError

# Class: TimeoutError

[fetcher](../modules/fetcher.md).TimeoutError

## Hierarchy

- `Error`

  ↳ **`TimeoutError`**

## Table of contents

### Constructors

- [constructor](fetcher.TimeoutError.md#constructor)

### Properties

- [message](fetcher.TimeoutError.md#message)
- [name](fetcher.TimeoutError.md#name)
- [stack](fetcher.TimeoutError.md#stack)
- [prepareStackTrace](fetcher.TimeoutError.md#preparestacktrace)
- [stackTraceLimit](fetcher.TimeoutError.md#stacktracelimit)

### Methods

- [captureStackTrace](fetcher.TimeoutError.md#capturestacktrace)

## Constructors

### constructor

• **new TimeoutError**()

#### Overrides

Error.constructor

#### Defined in

[fetcher.ts:2](../../src/fetcher.ts#L2)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
