/**
 * A simple priority queue
 */
export class PriorityQueue<T> {
    /**
     * @param comparator Function to compare two elements and puts them in priority order.  Takes two elements as arguments and returns a number greater, less
     * then or equal to zero.
     * @param contents Initial contents of the queue
     */
    constructor(private comparator: ((a: T, b: T) => number), contents?: Iterable<T>) {
        this.contents = Array.from<T>(contents ?? []);
        this.sorted   = false;
    }

    private readonly contents:   T[];
    private sorted:  boolean;

    private sort() {
        this.contents.sort(this.comparator);
        this.sorted = true;
    }

    /**
     * Add an element to the queue
     * @param o element to be added
     */
    public push(o: T) {
        this.contents.push(o);
        this.sorted = false;
    }

    /**
     * Return and remove the highest priority item from the queue
     *
     * @returns queue element
     */
    public pop() {
        if(!this.sorted) this.sort();
        return this.contents.shift();
    }

    /**
     * Iterate through all elements in the queue
     *
     * @returns generator function
     */
    public *[Symbol.iterator]() {
        if(!this.sorted) this.sort();
        yield *this.contents;
    }

    /**
     * Determine the number of items in the queue
     *
     * @returns number of element in the queue
     */
    public get size() {
        return this.contents.length;
    }

    /**
     * Transform all elements in the queue
     *
     * @param f Function to transforme each element of the queue
     * @returns array of transformed queue elements
     */
    public map<S>(f: (value: T, index: number, array: T[]) => S) {
        if(!this.sorted) this.sort();
        return this.contents.map(f);
    }

    /**
     * Change the function used to order the queue
     *
     * @param newComparator function to compare elements of the queue
     */
    public reorder(newComparator: (a: T, b: T) => number) {
        this.comparator = newComparator;
        this.sorted = false;
    }
}

export default PriorityQueue;
