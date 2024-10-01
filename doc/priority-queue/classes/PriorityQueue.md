[**@technobuddha/library**](../../README.md) • **Docs**

***

[@technobuddha/library](../../README.md) / [priority-queue](../README.md) / PriorityQueue

# Class: PriorityQueue\<T\>

A simple priority queue

## Type Parameters

• **T**

## Constructors

### new PriorityQueue()

> **new PriorityQueue**\<`T`\>(`comparator`, `contents`?): [`PriorityQueue`](PriorityQueue.md)\<`T`\>

#### Parameters

• **comparator**

Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less
then or equal to zero.

• **contents?**: `Iterable`\<`T`, `any`, `any`\>

Initial contents of the queue

#### Returns

[`PriorityQueue`](PriorityQueue.md)\<`T`\>

#### Defined in

[priority-queue.ts:10](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L10)

## Accessors

### size

> `get` **size**(): `number`

Determine the number of items in the queue

#### Returns

`number`

number of element in the queue

#### Defined in

[priority-queue.ts:60](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L60)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `any`\>

Iterate through all elements in the queue

#### Returns

`Iterator`\<`T`, `any`, `any`\>

generator function

#### Defined in

[priority-queue.ts:50](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L50)

***

### map()

> **map**\<`S`\>(`f`): `S`[]

Transform all elements in the queue

#### Type Parameters

• **S**

#### Parameters

• **f**

Function to transforme each element of the queue

#### Returns

`S`[]

array of transformed queue elements

#### Defined in

[priority-queue.ts:70](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L70)

***

### pop()

> **pop**(): `undefined` \| `T`

Return and remove the highest priority item from the queue

#### Returns

`undefined` \| `T`

queue element

#### Defined in

[priority-queue.ts:40](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L40)

***

### push()

> **push**(...`o`): `void`

Add an element to the queue

#### Parameters

• ...**o**: `T`[]

element to be added

#### Returns

`void`

#### Defined in

[priority-queue.ts:30](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L30)

***

### reorder()

> **reorder**(`newComparator`): `void`

Change the function used to order the queue

#### Parameters

• **newComparator**

function to compare elements of the queue

#### Returns

`void`

#### Defined in

[priority-queue.ts:81](https://github.com/technobuddha/library/blob/e196c53540c549b7602e5a5a9440d53c6db662cf/src/priority-queue.ts#L81)
