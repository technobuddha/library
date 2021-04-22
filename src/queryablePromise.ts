//TODO
// export class QueryablePromise<T> extends Promise<T>
// {
//     public isPending = true;
//     public isRejected = false;
//     public isFulfilled = false;

//     constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
//         super(executor);
//         this.then(
//             v => {
//                 this.isFulfilled = true;
//                 this.isPending = false;
//                 return v;
//             },
//             e => {
//                 this.isRejected = true;
//                 this.isPending = false;
//                 throw e;
//             }
//         );
//     }

//     public static all = Promise.all;
//     public static race = Promise.race;
//     public static reject = async () => new QueryablePromise((_resolve, reject) => { reject(); });
//     public static resolve = async () => new QueryablePromise((resolve, _reject) => { resolve(); Promise.resolve;
// }

// export default QueryablePromise;
