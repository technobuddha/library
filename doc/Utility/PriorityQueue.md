<!-- markdownlint-disable -->
Technobuddha Library
---

[Library](../index.md) / [Utility](./index.md) / PriorityQueue

# Class: PriorityQueue\<T\>

Defined in: [priority-queue.ts:6](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L6)

A simple priority queue

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Constructors

### Constructor

> **new PriorityQueue**\<`T`\>(`comparator`: (`a`: `T`, `b`: `T`) => `number`, `contents?`: [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\>): `PriorityQueue`\<`T`\>

Defined in: [priority-queue.ts:12](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L12)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `comparator` | (`a`: `T`, `b`: `T`) => `number` | Function to compare two elements and puts them in priority order. Takes two elements as arguments and returns a number greater, less then or equal to zero. |
| `contents?` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`T`, `any`, `any`\> | Initial contents of the queue |

#### Returns

`PriorityQueue`\<`T`\>

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [priority-queue.ts:66](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L66)

Determine the number of items in the queue

##### Returns

`number`

number of element in the queue

## Methods

### \[iterator\]()

> **\[iterator\]**(): [`Iterator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator)\<`T`\>

Defined in: [priority-queue.ts:54](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L54)

Iterate through all elements in the queue

#### Returns

[`Iterator`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Iterator)\<`T`\>

generator function

***

### map()

> **map**\<`S`\>(`f`: (`value`: `T`, `index`: `number`, `array`: `T`[]) => `S`): `S`[]

Defined in: [priority-queue.ts:76](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L76)

Transform all elements in the queue

#### Type Parameters

| Type Parameter |
| ------ |
| `S` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `f` | (`value`: `T`, `index`: `number`, `array`: `T`[]) => `S` | Function to transform each element of the queue |

#### Returns

`S`[]

array of transformed queue elements

***

### pop()

> **pop**(): `undefined` \| `T`

Defined in: [priority-queue.ts:42](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L42)

Return and remove the highest priority item from the queue

#### Returns

`undefined` \| `T`

queue element

***

### push()

> **push**(...`o`: `T`[]): `void`

Defined in: [priority-queue.ts:32](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L32)

Add an element to the queue

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`o` | `T`[] | element to be added |

#### Returns

`void`

***

### reorder()

> **reorder**(`newComparator`: (`a`: `T`, `b`: `T`) => `number`): `void`

Defined in: [priority-queue.ts:88](https://github.com/technobuddha/library/blob/main/src/priority-queue.ts#L88)

Change the function used to order the queue

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `newComparator` | (`a`: `T`, `b`: `T`) => `number` | function to compare elements of the queue |

#### Returns

`void`

