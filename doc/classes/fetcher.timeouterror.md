[@technobuddha/library](../..) / [Modules](../Modules.md) / [fetcher](../modules/fetcher.md) / TimeoutError

# Class: TimeoutError

[fetcher](../modules/fetcher.md).TimeoutError

## Hierarchy

- *Error*

  ↳ **TimeoutError**

## Table of contents

### Constructors

- [constructor](fetcher.timeouterror.md#constructor)

### Properties

- [message](fetcher.timeouterror.md#message)
- [name](fetcher.timeouterror.md#name)
- [stack](fetcher.timeouterror.md#stack)
- [prepareStackTrace](fetcher.timeouterror.md#preparestacktrace)
- [stackTraceLimit](fetcher.timeouterror.md#stacktracelimit)

### Methods

- [captureStackTrace](fetcher.timeouterror.md#capturestacktrace)

## Constructors

### constructor

\+ **new TimeoutError**(): [*TimeoutError*](fetcher.timeouterror.md)

**Returns:** [*TimeoutError*](fetcher.timeouterror.md)

Overrides: Error.constructor

Defined in: [fetcher.ts:1](../../src/fetcher.ts#L1)

## Properties

### message

• **message**: *string*

Inherited from: Error.message

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Inherited from: Error.name

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: Error.stack

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | Error |
| `stackTraces` | CallSite[] |

**Returns:** *any*

Inherited from: Error.prepareStackTrace

Defined in: packages/library/node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: Error.stackTraceLimit

Defined in: packages/library/node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | *object* |
| `constructorOpt?` | Function |

**Returns:** *void*

Inherited from: Error.captureStackTrace

Defined in: packages/library/node_modules/@types/node/globals.d.ts:4
