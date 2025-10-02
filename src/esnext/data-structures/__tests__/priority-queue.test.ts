import { compareNumbers } from '../../comparison/compare-numbers.ts';

import { PriorityQueue } from '../priority-queue.ts';

describe('PriorityQueue', () => {
  test('should create an empty queue', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    expect(q.size).toBe(0);
    expect(q.dequeue()).toBeUndefined();
    expect(q.peek()).toBeUndefined();
  });

  test('should create a queue with initial contents', () => {
    const q = new PriorityQueue<number>(compareNumbers, [5, 2, 8, 1]);
    expect(q.size).toBe(4);
    expect(q.toArray()).toEqual([1, 2, 5, 8]);
  });

  test('should enqueue and dequeue elements in priority order', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(1, 3, 2);
    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.dequeue()).toBeUndefined();
  });

  test('should enqueue multiple elements at once', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(5, 1, 3);
    q.enqueue(4, 2);
    expect(q.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('should peek without removing elements', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(3, 1, 2);
    expect(q.peek()).toBe(1);
    expect(q.peek()).toBe(1);
    expect(q.size).toBe(3);
  });

  test('should clear the queue', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(1, 3, 2);
    expect(q.size).toBe(3);
    q.clear();
    expect(q.size).toBe(0);
    expect(q.peek()).toBeUndefined();
    expect(q.toArray()).toEqual([]);
  });

  test('should convert to array in priority order', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(5, 1, 9, 3, 7);
    expect(q.toArray()).toEqual([1, 3, 5, 7, 9]);
    // toArray should not modify the queue
    expect(q.size).toBe(5);
  });

  test('should iterate in priority order', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(1, 3, 2);
    const result: number[] = [];
    for (const pq of q) {
      result.push(pq);
    }
    expect(result).toEqual([1, 2, 3]);

    // iterating should not change contents
    const result2: number[] = [];
    for (const pq of q) {
      result2.push(pq);
    }
    expect(result2).toEqual([1, 2, 3]);
  });

  test('should return correct size', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    expect(q.size).toBe(0);
    q.enqueue(1);
    expect(q.size).toBe(1);
    q.enqueue(3, 2);
    expect(q.size).toBe(3);
    q.dequeue();
    expect(q.size).toBe(2);
  });

  test('should map over queue elements', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(1, 3, 2);
    expect(q.map((f) => f * 2)).toEqual([2, 4, 6]);
    // mapping should not change contents
    expect(q.map((f) => f * 2)).toEqual([2, 4, 6]);
    expect(q.size).toBe(3);
  });

  test('should map with index parameter', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(5, 3, 7);
    expect(q.map((value, index) => `${index}:${value}`)).toEqual(['0:3', '1:5', '2:7']);
  });

  test('should reorder the queue with new comparator', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(1, 3, 2);

    q.reorder((a, b) => compareNumbers(b, a));

    expect(q.dequeue()).toBe(3);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(1);
  });

  test('should work with custom object types', () => {
    type Task = { priority: number; name: string };
    const taskComparator = (a: Task, b: Task): number => compareNumbers(a.priority, b.priority);

    const q = new PriorityQueue<Task>(taskComparator);
    q.enqueue(
      { priority: 3, name: 'low' },
      { priority: 1, name: 'high' },
      { priority: 2, name: 'medium' },
    );

    expect(q.dequeue()?.name).toBe('high');
    expect(q.dequeue()?.name).toBe('medium');
    expect(q.dequeue()?.name).toBe('low');
  });

  test('should maintain priority after multiple operations', () => {
    const q = new PriorityQueue<number>(compareNumbers);
    q.enqueue(5);
    q.enqueue(1);
    expect(q.dequeue()).toBe(1);
    q.enqueue(3);
    q.enqueue(2);
    expect(q.peek()).toBe(2);
    expect(q.toArray()).toEqual([2, 3, 5]);
  });
});
