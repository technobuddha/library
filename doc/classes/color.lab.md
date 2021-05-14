[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [color](../modules/color.md) / LAB

# Class: LAB

[color](../modules/color.md).LAB

## Table of contents

### Constructors

- [constructor](color.lab.md#constructor)

### Properties

- [a](color.lab.md#a)
- [b](color.lab.md#b)
- [l](color.lab.md#l)

### Methods

- [compareTo](color.lab.md#compareto)
- [deltaE](color.lab.md#deltae)
- [deltaE1994](color.lab.md#deltae1994)
- [deltaE2000](color.lab.md#deltae2000)
- [toXYZ](color.lab.md#toxyz)

## Constructors

### constructor

\+ **new LAB**(`l`: *number*, `a`: *number*, `b`: *number*): [*LAB*](color.lab.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | *number* |
| `a` | *number* |
| `b` | *number* |

**Returns:** [*LAB*](color.lab.md)

Defined in: [src/color.ts:201](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L201)

## Properties

### a

• **a**: *number*

___

### b

• **b**: *number*

___

### l

• **l**: *number*

## Methods

### compareTo

▸ **compareTo**(`that`: [*LAB*](color.lab.md)): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [*LAB*](color.lab.md) |

**Returns:** *number*

Defined in: [src/color.ts:216](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L216)

___

### deltaE

▸ **deltaE**(`that`: [*LAB*](color.lab.md)): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [*LAB*](color.lab.md) |

**Returns:** *number*

Defined in: [src/color.ts:231](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L231)

___

### deltaE1994

▸ **deltaE1994**(`that`: [*LAB*](color.lab.md)): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [*LAB*](color.lab.md) |

**Returns:** *number*

Defined in: [src/color.ts:235](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L235)

___

### deltaE2000

▸ **deltaE2000**(`that`: [*LAB*](color.lab.md)): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [*LAB*](color.lab.md) |

**Returns:** *number*

Defined in: [src/color.ts:258](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L258)

___

### toXYZ

▸ **toXYZ**(): [*XYZ*](color.xyz.md)

**Returns:** [*XYZ*](color.xyz.md)

Defined in: [src/color.ts:397](https://github.com/technobuddha/hill.software/blob/65b5e5d/packages/library/src/color.ts#L397)
