[@technobuddha/library](../../README.md) / [Modules](../Modules.md) / [priority-queue](../modules/priority_queue.md) / PriorityQueue

# Class: PriorityQueue<T\>

[priority-queue](../modules/priority_queue.md).PriorityQueue

A simple priority queue

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](priority_queue.PriorityQueue.md#constructor)

### Accessors

- [size](priority_queue.PriorityQueue.md#size)

### Methods

- [[iterator]](priority_queue.PriorityQueue.md#[iterator])
- [map](priority_queue.PriorityQueue.md#map)
- [pop](priority_queue.PriorityQueue.md#pop)
- [push](priority_queue.PriorityQueue.md#push)
- [reorder](priority_queue.PriorityQueue.md#reorder)

## Constructors

### constructor

• **new PriorityQueue**<`T`\>(`comparator`, `contents?`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comparator` | (`a`: `T`, `b`: `T`) => `number` | Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less then or equal to zero. |
| `contents?` | `Iterable`<`T`\> | Initial contents of the queue |

#### Defined in

[priority-queue.ts:10](../../src/priority-queue.ts#L10)

## Accessors

### size

• `get` **size**(): `number`

Determine the number of items in the queue

#### Returns

`number`

number of element in the queue

#### Defined in

[priority-queue.ts:57](../../src/priority-queue.ts#L57)

## Methods

### [iterator]

▸ **[iterator]**(): `Iterator`<`T`, `any`, `undefined`\>

Iterate through all elements in the queue

#### Returns

`Iterator`<`T`, `any`, `undefined`\>

generator function

#### Defined in

[priority-queue.ts:47](../../src/priority-queue.ts#L47)

___

### map

▸ **map**<`S`\>(`f`): `S`[]

Transform all elements in the queue

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `S` | Function to transforme each element of the queue |

#### Returns

`S`[]

array of transformed queue elements

#### Defined in

[priority-queue.ts:67](../../src/priority-queue.ts#L67)

___

### pop

▸ **pop**(): `undefined` \| `T`

Return and remove the highest priority item from the queue

#### Returns

`undefined` \| `T`

queue element

#### Defined in

[priority-queue.ts:37](../../src/priority-queue.ts#L37)

___

### push

▸ **push**(...`o`): `void`

Add an element to the queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...o` | `T`[] | element to be added |

#### Returns

`void`

#### Defined in

[priority-queue.ts:27](../../src/priority-queue.ts#L27)

___

### reorder

▸ **reorder**(`newComparator`): `void`

Change the function used to order the queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newComparator` | (`a`: `T`, `b`: `T`) => `number` | function to compare elements of the queue |

#### Returns

`void`

#### Defined in

[priority-queue.ts:78](../../src/priority-queue.ts#L78)
