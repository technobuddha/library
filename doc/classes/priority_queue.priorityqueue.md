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

- [constructor](priority_queue.priorityqueue.md#constructor)

### Accessors

- [size](priority_queue.priorityqueue.md#size)

### Methods

- [[Symbol.iterator]](priority_queue.priorityqueue.md#[symbol.iterator])
- [map](priority_queue.priorityqueue.md#map)
- [pop](priority_queue.priorityqueue.md#pop)
- [push](priority_queue.priorityqueue.md#push)
- [reorder](priority_queue.priorityqueue.md#reorder)

## Constructors

### constructor

\+ **new PriorityQueue**<T\>(`comparator`: (`a`: T, `b`: T) => *number*, `contents?`: *Iterable*<T\>): [*PriorityQueue*](priority_queue.priorityqueue.md)<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `comparator` | (`a`: T, `b`: T) => *number* | Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less then or equal to zero. |
| `contents?` | *Iterable*<T\> | Initial contents of the queue |

**Returns:** [*PriorityQueue*](priority_queue.priorityqueue.md)<T\>

Defined in: [src/priority-queue.ts:6](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L6)

## Accessors

### size

• get **size**(): *number*

Determine the number of items in the queue

**Returns:** *number*

number of element in the queue

Defined in: [src/priority-queue.ts:59](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L59)

## Methods

### [Symbol.iterator]

▸ **[Symbol.iterator]**(): *Generator*<T, void, undefined\>

Iterate through all elements in the queue

**Returns:** *Generator*<T, void, undefined\>

generator function

Defined in: [src/priority-queue.ts:49](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L49)

___

### map

▸ **map**<S\>(`f`: (`value`: T, `index`: *number*, `array`: T[]) => S): S[]

Transform all elements in the queue

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`value`: T, `index`: *number*, `array`: T[]) => S | Function to transforme each element of the queue |

**Returns:** S[]

array of transformed queue elements

Defined in: [src/priority-queue.ts:69](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L69)

___

### pop

▸ **pop**(): *undefined* \| T

Return and remove the highest priority item from the queue

**Returns:** *undefined* \| T

queue element

Defined in: [src/priority-queue.ts:39](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L39)

___

### push

▸ **push**(`o`: T): *void*

Add an element to the queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o` | T | element to be added |

**Returns:** *void*

Defined in: [src/priority-queue.ts:29](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L29)

___

### reorder

▸ **reorder**(`newComparator`: (`a`: T, `b`: T) => *number*): *void*

Change the function used to order the queue

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newComparator` | (`a`: T, `b`: T) => *number* | function to compare elements of the queue |

**Returns:** *void*

Defined in: [src/priority-queue.ts:79](https://github.com/technobuddha/hill.software/blob/693f679/packages/library/src/priority-queue.ts#L79)
