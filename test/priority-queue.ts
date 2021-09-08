import expect from '@util/expect';
import PriorityQueue from '../src/priority-queue';
import compareNumbers  from '../src/compareNumbers';

describe(
    'priority-queue',
    () => {
        test(
            'should create a queue',
            () => {
                const q = new PriorityQueue<number>(compareNumbers);
                q.push(1, 3, 2);
                expect(q.pop()).toBe(1);
                expect(q.pop()).toBe(2);
                expect(q.pop()).toBe(3);
            }
        );

        test(
            'should iterate',
            () => {
                const q = new PriorityQueue<number>(compareNumbers);
                q.push(1, 3, 2);
                let i = 0;
                for(const pq of q)
                    expect(pq).toBe(++i);
                // iterating should not change contents
                i = 0;
                for(const pq of q)
                    expect(pq).toBe(++i);
            }
        );

        test(
            'should return size',
            () => {
                const q = new PriorityQueue<number>(compareNumbers);
                q.push(1, 3, 2);
                expect(q.size).toBe(3);
            }
        );

        test(
            'should return map values',
            () => {
                const q = new PriorityQueue<number>(compareNumbers);
                q.push(1, 3, 2);
                expect(q.map(f => f * 2)).toEqual([ 2, 4, 6 ]);
                // mapping should not change contents
                expect(q.map(f => f * 2)).toEqual([ 2, 4, 6 ]);
            }
        );

        test(
            'should reorder the queue',
            () => {
                const q = new PriorityQueue<number>(compareNumbers);
                q.push(1, 3, 2);

                q.reorder((a, b) => compareNumbers(b, a));

                expect(q.pop()).toBe(3);
                expect(q.pop()).toBe(2);
                expect(q.pop()).toBe(1);
            }
        );
    }
);
