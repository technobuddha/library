// TODO this needs unit tests

// Simple priority queue
export class PriorityQueue<T> {
    constructor(private comparator: ((a: T, b: T) => number), contents?: Iterable<T>) {
        this.contents = Array.from<T>(contents ?? []);
        this.sorted   = false;
    }

    private contents:   T[];
    private sorted:     boolean;

    private sort() {
        this.contents.sort(this.comparator);
        this.sorted = true;
    }

    public push(o: T) {
        this.contents.push(o);
        this.sorted = false;
    }

    public pop() {
        if(!this.sorted) this.sort();
        return this.contents.shift();
    }

    public *[Symbol.iterator]() {
        if(!this.sorted) this.sort();
        yield* this.contents;
    } 

    public get size() {
        return this.contents.length;
    }

    public map<S>(f: (value: T, index: number, array: T[]) => S) {
        if(!this.sorted) this.sort();
        return this.contents.map(f);
    }

    public reorder(newComparator: (a: T, b: T) => number) {
        this.comparator = newComparator;
        this.sorted = false;
    }
}

export default PriorityQueue;
