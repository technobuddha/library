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

[regexp.ts:66](../../src/regexp.ts#L66)

___

### email

• `Const` **email**: `RegExp`

#### Defined in

[regexp.ts:73](../../src/regexp.ts#L73)

___

### ipV4

• `Const` **ipV4**: `RegExp`

validate an IPv4 address

#### Defined in

[regexp.ts:38](../../src/regexp.ts#L38)

___

### ipV4Local

• `Const` **ipV4Local**: `RegExp`

determine if Ipv4 address is local

#### Defined in

[regexp.ts:44](../../src/regexp.ts#L44)

___

### isoDate

• `Const` **isoDate**: `RegExp`

#### Defined in

[regexp.ts:59](../../src/regexp.ts#L59)

___

### numeric

• `Const` **numeric**: `RegExp`

validate a valid number

#### Defined in

[regexp.ts:62](../../src/regexp.ts#L62)

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

[regexp.ts:8](../../src/regexp.ts#L8)
