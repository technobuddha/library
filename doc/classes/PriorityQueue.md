[**@technobuddha/library**](../README.md)

***

[@technobuddha/library](../README.md) / PriorityQueue

# Class: PriorityQueue\<T\>

Defined in: [priority-queue.ts:4](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L4)

A simple priority queue

## Type Parameters

• **T**

## Constructors

### new PriorityQueue()

> **new PriorityQueue**\<`T`\>(`comparator`, `contents`?): [`PriorityQueue`](PriorityQueue.md)\<`T`\>

Defined in: [priority-queue.ts:10](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L10)

#### Parameters

##### comparator

(`a`, `b`) => `number`

Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less
then or equal to zero.

##### contents?

`Iterable`\<`T`\>

Initial contents of the queue

#### Returns

[`PriorityQueue`](PriorityQueue.md)\<`T`\>

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [priority-queue.ts:64](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L64)

Determine the number of items in the queue

##### Returns

`number`

number of element in the queue

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`\>

Defined in: [priority-queue.ts:52](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L52)

Iterate through all elements in the queue

#### Returns

`Iterator`\<`T`\>

generator function

***

### map()

> **map**\<`S`\>(`f`): `S`[]

Defined in: [priority-queue.ts:74](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L74)

Transform all elements in the queue

#### Type Parameters

• **S**

#### Parameters

##### f

(`value`, `index`, `array`) => `S`

Function to transforme each element of the queue

#### Returns

`S`[]

array of transformed queue elements

***

### pop()

> **pop**(): `undefined` \| `T`

Defined in: [priority-queue.ts:40](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L40)

Return and remove the highest priority item from the queue

#### Returns

`undefined` \| `T`

queue element

***

### push()

> **push**(...`o`): `void`

Defined in: [priority-queue.ts:30](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L30)

Add an element to the queue

#### Parameters

##### o

...`T`[]

element to be added

#### Returns

`void`

***

### reorder()

> **reorder**(`newComparator`): `void`

Defined in: [priority-queue.ts:86](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L86)

Change the function used to order the queue

#### Parameters

##### newComparator

(`a`, `b`) => `number`

function to compare elements of the queue

#### Returns

`void`
