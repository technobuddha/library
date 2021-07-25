[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / regexp

# Module: regexp

## Table of contents

### Properties

- [default](regexp.md#default)

### Variables

- [domain](regexp.md#domain)
- [email](regexp.md#email)
- [ipV4](regexp.md#ipv4)
- [ipV4Local](regexp.md#ipv4local)
- [isoDate](regexp.md#isodate)
- [numeric](regexp.md#numeric)

### Functions

- [re](regexp.md#re)

## Properties

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `domain` | `RegExp` |
| `email` | `RegExp` |
| `ipV4` | `RegExp` |
| `ipV4Local` | `RegExp` |
| `isoDate` | `RegExp` |
| `numeric` | `RegExp` |

## Variables

### domain

• `Const` **domain**: `RegExp`

#### Defined in

[regexp.ts:67](../../src/regexp.ts#L67)

___

### email

• `Const` **email**: `RegExp`

#### Defined in

[regexp.ts:74](../../src/regexp.ts#L74)

___

### ipV4

• `Const` **ipV4**: `RegExp`

validate an IPv4 address

#### Defined in

[regexp.ts:39](../../src/regexp.ts#L39)

___

### ipV4Local

• `Const` **ipV4Local**: `RegExp`

determine if Ipv4 address is local

#### Defined in

[regexp.ts:45](../../src/regexp.ts#L45)

___

### isoDate

• `Const` **isoDate**: `RegExp`

#### Defined in

[regexp.ts:60](../../src/regexp.ts#L60)

___

### numeric

• `Const` **numeric**: `RegExp`

validate a valid number

#### Defined in

[regexp.ts:63](../../src/regexp.ts#L63)

## Functions

### re

▸ **re**(`template`, ...`args`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `template` | `TemplateStringsArray` |
| `...args` | `RegExp`[] |

#### Returns

`RegExp`

#### Defined in

[regexp.ts:9](../../src/regexp.ts#L9)
