
declare module "freshman" {

    /**
     * A special placeholder value used to specify "gaps" within curried functions,
     * allowing partial application of any combination of arguments, regardless of their positions.
     */
    interface placeholder {}

    interface ListIterator<T, TResult> {
        (value: T, index: number, list: T[]): TResult;
    }

    interface ObjectIterator<T, TResult> {
        (element: T, key: string, obj: Dictionary<T>): Dictionary<TResult>;
    }
    interface KeyValuePair<K, V> extends Array<K | V> { 0 : K; 1 : V; }

    interface ArrayLike {
        nodeType: number;
    }

    interface Arity0Fn {
        (): any
    }

    interface Arity1Fn {
        (a: any): any
    }

    interface Arity2Fn {
        (a: any, b: any): any
    }

    interface ObjFunc {
        [index:string]: Function;
    }

    interface ObjFunc2 {
        [index:string]: (x: any, y: any) => boolean;
    }

    interface Pred {
        (...a: any[]): boolean;
    }

    interface ObjPred {
        (value: any, key: string): boolean;
    }

    interface Dictionary<T> {
        [index: string]: T;
    }

    interface CharList extends String {
        push(x: string): void;
    }

    interface Lens {
        <T,U>(obj: T): U;
        set<T,U>(str: string, obj: T): U;
    }


    // @see https://gist.github.com/donnut/fd56232da58d25ceecf1, comment by @albrow
    interface CurriedFunction2<T1, T2, R> {
        (t1: T1): (t2: T2) => R;
        (t1: T1, t2: T2): R;
    }

    interface CurriedFunction3<T1, T2, T3, R> {
        (t1: T1): CurriedFunction2<T2, T3, R>;
        (t1: T1, t2: T2): (t3: T3) => R;
        (t1: T1, t2: T2, t3: T3): R;
    }

    interface CurriedFunction4<T1, T2, T3, T4, R> {
        (t1: T1): CurriedFunction3<T2, T3, T4, R>;
        (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
        (t1: T1, t2: T2, t3: T3): (t4: T4) => R;
        (t1: T1, t2: T2, t3: T3, t4: T4): R;
    }

    interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
        (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
        (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
        (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
        (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R;
        (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
    }

    interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
        (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>;
        (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>;
        (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>;
        (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>;
        (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R;
        (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
    }

    /*
     * List category
     */


    /**
     * Applies a function to the value at the given index of an array, returning a new copy of the array with the element at the given index replaced with the result of the function application.
     */
    export function adjust<T>(fn: (a: T) => T, index: number, list: T[]): T[];
    export function adjust<T>(fn: (a: T) => T, index: number): (list: T[]) => T[];

    /**
     * Returns true if all elements of the list match the predicate, false if there are any that don't.
     */
    export function all<T>(fn: (a: T) => boolean, list: T[]): boolean;
    export function all<T>(fn: (a: T) => boolean): (list: T[]) => boolean;

    /**
     * Returns true if at least one of elements of the list match the predicate, false otherwise.
     */
    export function any<T>(fn: (a: T) => boolean, list: T[]): boolean;
    export function any<T>(fn: (a: T) => boolean): (list: T[]) => boolean;

    /**
     * Returns a new list, composed of n-tuples of consecutive elements If n is greater than the length of the list, an empty list is returned.
     */
    export function aperture<T>(n: number, list: T): T[][];
    export function aperture<T>(n: number): (list: T) => T[][];

    /**
     * Returns a new list containing the contents of the given list, followed by the given element.
     */
    // note U is required (instead of just T) to allow appending an element of a different type than the array is.
    export function append<T>(el: T, list: T[]): T[];
    export function append<T>(el: T): (list: T[]) => T[];
    export function append<T, U>(el: U, list: T[]): (T & U)[];
    export function append<T, U>(el: U): (list: T[]) => (T & U)[];

    /**
     * `chain` maps a function over a list and concatenates the results.
     * This implementation is compatible with the Fantasy-land Chain spec
     */
    export function chain<T, U>(fn: (n: T) => U[], list: T[]): U[];
    export function chain<T, U>(fn: (n: T) => U[]): (list: T[]) => U[];

    /**
     * Turns a list of Functors into a Functor of a list.
     */
    export function commute<T, U>(of: (x: T) => U, list: U[]): U;
    export function commute<T, U>(of: (x: T) => U): (list: U[]) => U;
    export function commute<T, U>(of: (x: T) => T[], list: U[]): U[]
    export function commute<T, U>(of: (x: T) => T[]): (list: U[]) => U[]
    /*
     * Turns a list of Functors into a Functor of a list, applying a mapping function to the elements of the list along the way.
     */
    export function commuteMap<T, U>(fn: (list: T[]) => U[], of: (x: T[]) => U[][], list: T[][]): U[][];
    export function commuteMap<T, U>(fn: (list: T[]) => U[]): (of: (x: T[]) => U[][], list: T[][]) => U[][];
    export function commuteMap<T, U>(fn: (list: T[]) => U[], of: (x: T[]) => U[][]): (list: T[][]) => U[][];

    /**
     * Returns a new list consisting of the elements of the first list followed by the elements
     * of the second.
     */
    export function concat<T>(list1: T[], list2: T[]): T[];
    export function concat<T>(list1: T[]): (list2: T[]) => T[];
    export function concat<T>(list1: string, list2: string): string;
    export function concat<T>(list1: string): (list2: string) => string;

    /**
     * Returns `true` if the specified item is somewhere in the list, `false` otherwise.
     * Equivalent to `indexOf(a)(list) > -1`. Uses strict (`===`) equality checking.
     */
    export function contains(a: string, list: string): boolean;
    export function contains<T>(a: T, list: T[]): boolean;
    export function contains(a: string): (list: string) => boolean;
    export function contains<T>(a: T): (list: T[]) => boolean;

    /**
     * Returns `true` if the `x` is found in the `list`, using `pred` as an
     * equality predicate for `x`.
     */
    export function containsWith<T>(pred: (a: T, b: T) => boolean, x: T, list: T[]): boolean;
    export function containsWith<T>(pred: (a: T, b: T) => boolean, x: T): (list: T[]) => boolean;

    /**
     * Returns a new list containing all but the first n elements of the given list.
     */
    export function drop<T>(n: number, list: T[]): T[];
    export function drop<T>(n: number): (list: T[]) => T[];

    /**
     * Returns a new list containing the last n elements of a given list, passing each value to the supplied
     * predicate function, skipping elements while the predicate function returns true.
     */
    export function dropWhile<T>(fn: (a: T) => boolean, list: T[]): T[];
    export function dropWhile<T>(fn: (a: T) => boolean): (list: T[]) => T[];

    /**
     * Returns a new list containing only those items that match a given predicate function. The predicate function is passed one argument: (value).
     */
    export function filter<T>(fn: (value: T) => boolean): (list: T[]) => T[];
    export function filter<T>(fn: (value: T) => boolean, list: T[]): T[];

    /**
     * Like filter, but passes additional parameters to the predicate function. The predicate function is passed three arguments: (value, index, list).
     */
    export function filterIndexed<T>(fn: (value: T, index: number, list: T[]) => boolean): (list: T[]) => T[];
    export function filterIndexed<T>(fn: (value: T, index: number, list: T[]) => boolean, list: T[]): T[];

    /**
     * Returns the first element of the list which matches the predicate, or `undefined` if no
     * element matches.
     */
    export function find<T>(fn: (a: T) => boolean, list: T[]): T;
    export function find<T>(fn: (a: T) => boolean): (list: T[]) => T;


    /**
     * Returns the index of the first element of the list which matches the predicate, or `-1`
     * if no element matches.
     */
    export function findIndex<T>(fn: (a: T) => boolean, list: T[]): number;
    export function findIndex<T>(fn: (a: T) => boolean): (list: T[]) => number;

    /**
     * Returns the last element of the list which matches the predicate, or `undefined` if no
     * element matches.
     */
    export function findLast<T>(fn: (a: T) => boolean, list: T[]): T;
    export function findLast<T>(fn: (a: T) => boolean): (list: T[]) => T;

    /**
     * Returns the index of the last element of the list which matches the predicate, or
     * `-1` if no element matches.
     */
    export function findLastIndex<T>(fn: (a: T) => boolean, list: T[]): number;
    export function findLastIndex<T>(fn: (a: T) => boolean): (list: T[]) => number;

    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
     * them in a new array, depth-first.
     */
    export function flatten<T>(x: T[]): T[];

    /**
     * Iterate over an input list, calling a provided function fn for each element in the list.
     */
    export function forEach<T>(fn: (x: T) => void, list: T[]): T[];
    export function forEach<T>(fn: (x: T) => void): (list: T[]) => T[];

    /**
     * Like forEach, but but passes additional parameters to the predicate function.
     */
    export function forEachIndexed<T>(fn: (x: T, idx?: number, list?: T[]) => void, list: T[]): T[];
    export function forEachIndexed<T>(fn: (x: T, idx?: number, list?: T[]) => void): (list: T[]) => T[];

    /**
     * Creates a new object out of a list key-value pairs.
     */
    export function fromPairs<V>(pairs: KeyValuePair<string, V>[]): {[index: string]: V};
    export function fromPairs<V>(pairs: KeyValuePair<number, V>[]): {[index: number]: V};


    /**
     * Splits a list into sublists stored in an object, based on the result of
     * calling a String-returning function
     * on each element, and grouping the results according to values returned.
     */
    export function groupBy<T>(fn: (a: T) => string, list: T[]): {[index: string]: T[]}
    export function groupBy<T>(fn: (a: T) => string): <T>(list: T[]) => {[index: string]: T[]}

    /**
     * Returns the first element in a list.
     * In some libraries this function is named `first`.
     */
    export function head<T>(list: T[]): T;

    /**
     * Returns the position of the first occurrence of an item in an array
     * (by strict equality),
     * or -1 if the item is not included in the array.
     */
    export function indexOf<T>(target: T, list: T[]): number;
    export function indexOf<T>(target: T): (list: T[]) => number;

    /**
     * Returns all but the last element of a list.
     */
    export function init<T>(list: T[]): T[];

    /**
     * Inserts the supplied element into the list, at index index. Note that
     * this is not destructive: it returns a copy of the list with the changes.
     */
    export function insert(index: number, elt: any, list: any[]): any[];
    export function insert(index: number): (elt: any, list: any[]) => any[];
    export function insert(index: number, elt: any): (list: any[]) => any[];

    /**
     * Inserts the sub-list into the list, at index `index`.  _Note  that this
     * is not destructive_: it returns a copy of the list with the changes.
     */
    export function insertAll(index: number, elts: any[], list: any[]): any[];
    export function insertAll(index: number): (elts: any[], list: any[]) => any[];
    export function insertAll(index: number, elts: any[]): (list: any[]) => any[];

    /**
     * Transforms the items of the list with the transducer and appends the transformed items to the accumulator
     * using an appropriate iterator function based on the accumulator type.
     */
    export function into<T>(acc: any, xf: Function, list: T[]): T[];
    export function into<T>(acc: any, xf: Function): (list: T[]) => T[];
    export function into<T>(acc: any): (xf: Function, list: T[]) => T[];


    /**
     * Returns `true` if all elements are unique, otherwise `false`.
     * Uniqueness is determined using strict equality (`===`).
     */
    export function isSet(list: any[]): boolean;

    /**
     * Returns a string made by inserting the `separator` between each
     * element and concatenating all the elements into a single string.
     */
    export function join(x: string, xs: any[]): string;
    export function join(x: string): (xs: any[]) => string;

    /**
     * Returns the last element from a list.
     */
    export function last<T>(list: T[]): T;

    /**
     * Returns the position of the last occurrence of an item (by strict equality) in
     * an array, or -1 if the item is not included in the array.
     */
    export function lastIndexOf<T>(target: T, list: T[]): number;

    /**
     * Returns the number of elements in the array by returning list.length.
     */
    export function length(list: any[]): number;


    /**
     * Returns a new list, constructed by applying the supplied function to every element of the supplied list.
     */
    export function map<T, U>(fn: (x: T) => U, list: T[]): U[];
    export function map<T, U>(fn: (x: T) => U, obj: any): any; // used in functors
    export function map<T, U>(fn: (x: T) => U): (list: T[]) => U[];

    /**
     * The mapAccum function behaves like a combination of map and reduce.
     */
    export function mapAccum<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult], acc: U, list: T[]): [U, TResult[]];
    export function mapAccum<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult]): (acc: U, list: T[]) => [U, TResult[]];
    export function mapAccum<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult], acc: U): (list: T[]) => [U, TResult[]];

    /**
     * The mapAccumRight function behaves like a combination of map and reduce.
     */
    export function mapAccumRight<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult], acc: U, list: T[]): [U, TResult[]];
    export function mapAccumRight<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult]): (acc: U, list: T[]) => [U, TResult[]];
    export function mapAccumRight<T, U, TResult>(fn: (acc: U, value: T) => [U, TResult], acc: U): (list: T[]) => [U, TResult[]];

    /**
     * Like map, but but passes additional parameters to the mapping function.
     */
    export function mapIndexed<T, U>(fn: (val: T, key: number, list: T[]) => U, list: T[]): U[];
    export function mapIndexed<T, U>(fn: (val: T, key: number, list: T[]) => U): (list: T[]) => U[];


    /**
     * Like mapObj, but but passes additional arguments to the predicate function.
     */
    export function mergeAll(list: any[]): any;

    /**
     * Returns true if no elements of the list match the predicate, false otherwise.
     */
    export function none<T>(fn: (a: T) => boolean, list: T[]): boolean;
    export function none<T>(fn: (a: T) => boolean): (list: T[]) => boolean;

    /**
     * Returns the nth element in a list.
     */
    export function nth<T>(n: number, list: T[]): T;
    export function nth<T>(n: number): (list: T[]) => T;

    /**
     * Takes a predicate and a list and returns the pair of lists of elements
     * which do and do not satisfy the predicate, respectively.
     */
    export function partition(fn: (a: string) => boolean, list: string[]): string[][];
    export function partition<T>(fn: (a: T) => boolean, list: T[]): T[][];
    export function partition<T>(fn: (a: T) => boolean): (list: T[]) => T[][];
    export function partition(fn: (a: string) => boolean): (list: string[]) => string[][];

    /**
     * Returns a new list by plucking the same named property off all objects in the list supplied.
     */
    export function pluck<T>(p: string|number, list: any[]): T[];
    export function pluck<T>(p: string|number): (list: any[]) => T[];
    export function pluck(p: string|number, list: any[]): any[];
    export function pluck(p: string|number): (list: any[]) => any[];

    /**
     * Returns a new list with the given element at the front, followed by the contents of the
     * list.
     */
    export function prepend<T>(el: T, list: T[]): T[];
    export function prepend<T>(el: T): (list: T[]) => T[];

    /**
     * Returns a list of numbers from `from` (inclusive) to `to`
     * (exclusive). In mathematical terms, `range(a, b)` is equivalent to
     * the half-open interval `[a, b)`.
     */
    export function range(from: number, to: number): number[];
    export function range(from: number): (to: number) => number[];

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     */
    export function reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult, list: T[]): TResult;
    export function reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult): (acc: TResult, list: T[]) => TResult;
    export function reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult): (list: T[]) => TResult;

    /**
     * Like `reduce`, but passes additional parameters to the predicate function.
     */
    export function reduceIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: number, list: T[]) => TResult, acc: TResult, list: T[]): TResult;
    export function reduceIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: number, list: T[]) => TResult): (acc: TResult, list: T[]) => TResult;
    export function reduceIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: number, list: T[]) => TResult, acc: TResult): (list: T[]) => TResult;

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     */
    export function reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult, list: T[]): TResult;
    export function reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult): (acc: TResult, list: T[]) => TResult;
    export function reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult): (list: T[]) => TResult;

    /**
     * Like `reduceRight`, but passes additional parameters to the predicate function. Moves through
     * the input list from the right to the left.
     */
    export function reduceRightIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: Number, list: T[]) => TResult, acc: TResult, list: T[]): TResult;
    export function reduceRightIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: Number, list: T[]) => TResult): (acc: TResult, list: T[]) => TResult;
    export function reduceRightIndexed<T, TResult>(fn: (acc: TResult, elem: T, idx: Number, list: T[]) => TResult, acc: TResult): (list: T[]) => TResult;

    /**
     * Similar to `filter`, except that it keeps only values for which the given predicate
     * function returns falsy.
     */
    export function reject<T>(fn: (value: T) => boolean, list: T[]): T[];
    export function reject<T>(fn: (value: T) => boolean): (list: T[]) => T[];

    /**
     * Like `reject`, but passes additional parameters to the predicate function.
     */
    export function rejectIndexed<T>(fn: (value: T, index: number, list: T[]) => boolean, list: T[]): T[];
    export function rejectIndexed<T>(fn: (value: T, index: number, list: T[]) => boolean): (list: T[]) => T[];

    /**
     * Removes the sub-list of `list` starting at index `start` and containing `count` elements.
     */
    export function remove<T>(start: number, count: number, list: T[]): T[];
    export function remove<T>(start: number): (count: number, list: T[]) => T[];
    export function remove<T>(start: number, count: number): (list: T[]) => T[];

    /**
     * Returns a fixed list of size n containing a specified identical value.
     */
    export function repeat<T>(a: T, n: number): T[];
    export function repeat<T>(a: T): (n: number) => T[];

    /**
     * Returns a new list with the same elements as the original list, just in the reverse order.
     */
    export function reverse<T>(list: T[]): T[];

    /**
     * Scan is similar to reduce, but returns a list of successively reduced values from the left.
     */
    export function scan<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult, list: T[]): TResult;
    export function scan<T, TResult>(fn: (acc: TResult, elem: T) => TResult): (acc: TResult, list: T[]) => TResult;
    export function scan<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult): (list: T[]) => TResult;

    /**
     * Returns the elements from `xs` starting at `a` and ending at `b - 1`.
     */
    export function slice(a: number, b: number, list: string): string;
    export function slice<T>(a: number, b: number, list: T[]): T[];
    export function slice<T>(a: number, b: number): (list: string|T[]) => string|T[];
    export function slice<T>(a: number): (b: number, list: string|T[]) => string|T[];

    /**
     * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
     * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
     * if they are equal.
     */
    export function sort<T>(fn: (a: T, b: T) => number, list: T[]): T[];
    export function sort<T>(fn: (a: T, b: T) => number): (list: T[]) => T[];

    /**
     * Splits a collection into slices of the specified length.
     */
    export function splitEvery<T>(a: number, list: T[]): T[][];
    export function splitEvery<T>(a: number): (list: T[]) => T[][];

    /**
     * Returns all but the first element of a list.
     */
    export function tail<T>(list: T[]): T[];

    /**
     * Returns a new list containing the first `n` elements of the given list.  If
     * `n > * list.length`, returns a list of `list.length` elements.
     */
    export function take<T>(n: number, list: T[]): T[];
    export function take<T>(n: number): (list: T[]) => T[];

    /**
     * Returns a new list containing the first `n` elements of a given list, passing each value
     * to the supplied predicate function, and terminating when the predicate function returns
     * `false`.
     */
    export function takeWhile<T>(fn: (x: T) => boolean, list: T[]): T[];
    export function takeWhile<T>(fn: (x: T) => boolean): (list: T[]) => T[];

    /**
     * Calls an input function `n` times, returning an array containing the results of those
     * function calls.
     */
    export function times<T>(fn: (i: number) => T, n: number): T[];
    export function times<T>(fn: (i: number) => T): (n: number) => T[];

    /**
     * Initializes a transducer using supplied iterator function. Returns a single item by iterating through the
     * list, successively calling the transformed iterator function and passing it an accumulator value and the
     * current value from the array, and then passing the result to the next call.
     */
    export function transduce<T,U>(xf: (arg: T[]) => T[], fn: (acc: U[], val: U) => U[], acc: T[], list: T[]): U;
    export function transduce<T,U>(xf: (arg: T[]) => T[]): (fn: (acc: U[], val: U) => U[], acc: T[], list: T[]) => U;
    export function transduce<T,U>(xf: (arg: T[]) => T[], fn: (acc: U[], val: U) => U[]): (acc: T[], list: T[]) => U;
    export function transduce<T,U>(xf: (arg: T[]) => T[], fn: (acc: U[], val: U) => U[], acc: T[]): (list: T[]) => U;

    /**
     * Builds a list from a seed value. Accepts an iterator function, which returns either false
     * to stop iteration or an array of length 2 containing the value to add to the resulting
     * list and the seed to be used in the next call to the iterator function.
     */
    export function unfold<T, TResult>(fn: (seed: T) => TResult, seed: T): TResult[];
    export function unfold<T, TResult>(fn: (seed: T) => TResult): (seed: T) => TResult[];

    /**
     * Returns a new list containing only one copy of each element in the original list.
     */
    export function uniq<T>(list: T[]): T[];

    /**
     * Returns a new list containing only one copy of each element in the original list, based upon the value returned by applying the supplied function to each list element. Prefers the first item if the supplied function produces the same value on two items. R.equals is used for comparison.
     */
    export function uniqBy<T,U>(fn: (a: T) => U, list: T[]): T[];
    export function uniqBy<T,U>(fn: (a: T) => U): (list: T[]) => T[];

    /**
     * Returns a new list containing only one copy of each element in the original list, based upon the value
     * returned by applying the supplied predicate to two list elements.
     */
    export function uniqWith<T,U>(pred: (x: T, y: T) => boolean, list: T[]): T[];
    export function uniqWith<T,U>(pred: (x: T, y: T) => boolean): (list: T[]) => T[];

    /**
     * Returns a new list by pulling every item at the first level of nesting out, and putting
     * them in a new array.
     */
    export function unnest<T>(x: T[]): T[];

    /**
     * Returns a new copy of the array with the element at the provided index replaced with the given value.
     */
    export function update<T>(index: number, value: T, list: T[]): T[];
    export function update<T>(index: number, value: T): (list: T[]) => T[];

    /**
     * Creates a new list out of the two supplied by creating each possible pair from the lists.
     */
    export function xprod<K,V>(as: K[], bs: V[]): KeyValuePair<K,V>[];
    export function xprod<K,V>(as: K[]): (bs: V[]) => KeyValuePair<K,V>[];

    /**
     * Creates a new list out of the two supplied by pairing up equally-positioned items from
     * both lists. Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
     */
    export function zip<K,V>(list1: K[], list2: V[]): KeyValuePair<K,V>[];
    export function zip<K,V>(list1: K[]): (list2: V[]) => KeyValuePair<K,V>[];

    /**
     * Creates a new object out of a list of keys and a list of values.
     */
    // TODO: Dictionary<T> as a return value is to specific, any seems to loose
    export function zipObj<T>(keys: string[], values: T[]): {[index:string]: T};
    export function zipObj<T>(keys: string[]): (values: T[]) => {[index:string]: T};

    /**
     * Creates a new list out of the two supplied by applying the function to each
     * equally-positioned pair in the lists.
     */
    export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult, list1: T[], list2: U[]): TResult[];
    export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult, list1: T[]): (list2: U[]) => TResult[];
    export function zipWith<T, U, TResult>(fn: (x: T, y: U) => TResult): (list1: T[], list2: U[]) => TResult[];

    /*
     * Object category
     */

    /**
     * Makes a shallow clone of an object, setting or overriding the specified property with the given value.
     */
    export function assoc(prop: string, val: any, obj: any): any;
    export function assoc(prop: string): (val: any, obj: any) => any;
    export function assoc(prop: string, val: any): (obj: any) => any;

    /**
     * Makes a shallow clone of an object, setting or overriding the nodes required to create the given path, and
     * placing the specific value at the tail end of that path.
     */
    export function assocPath(path: string[], val: any, obj: any): any;
    export function assocPath(path: string[]): (val: any, obj: any) => any;
    export function assocPath(path: string[], val: any): (obj: any) => any;

    // assoc(prop: string, val: placeholder, obj: any): (val: any) => any;
    // assoc(prop: string, val: any, obj: placeholder): (obj: any) => any;
    // assoc(prop: placeholder, val: placeholder, obj: any): (prop:string, val: any) => any;
    // assoc(prop: placeholder, val: any, obj: placeholder): (prop:string, obj: any) => any;
    // assoc(prop: placeholder, val: any, obj: any): (prop:string) => any;


    /**
     * Creates a deep copy of the value which may contain (nested) Arrays and Objects, Numbers, Strings, Booleans and Dates.
     */
    export function clone(value: any): any;
    export function clone(value: any[]): any[];

    /**
     * Creates an object containing a single key:value pair.
     */
    export function createMapEntry<T>(key: string, val: T): {[index: string]: T};
    export function createMapEntry<T>(key: placeholder, val: T): (key: string) => {[index: string]: T};
    export function createMapEntry<T>(key: string): (val: T) => {[index: string]: T};

    /**
     * Returns a new object that does not contain a `prop` property.
     */
    export function dissoc(prop: string, obj: any): any
    export function dissoc(prop: string): (obj: any) => any

    /**
     * Returns a new object that does not contain a prop property.
     */
    export function dissoc(prop: string, obj: any): any;
    export function dissoc(prop: placeholder, obj: any): (prop: string) => any;
    export function dissoc(prop: string): (obj: any) => any;

    /**
     * Makes a shallow clone of an object, omitting the property at the given path.
     */
    export function dissocPath(path: string[], obj: any): any;
    export function dissocPath(path: string[]): (obj: any) => any;

    /**
     * Reports whether two functions have the same value for the specified property.
     */
    export function eqProps(prop: string, obj1: any, obj2: any): boolean;
    export function eqProps(prop: string): (obj1: any, obj2: any) => boolean;
    export function eqProps(prop: string, obj1: any): (obj2: any) => boolean;

    /**
     * Creates a new object by evolving a shallow copy of object, according to the transformation functions.
     */
    export function evolve(transformations: {[index: string]: (value: any) => any}, obj: any): any;

    /**
     * Returns a list of function names of object's own functions
     */
    export function functions(obj: any): string[];

    /**
     * Returns a list of function names of object's own and prototype functions
     */
    export function functionsIn(obj: any): string[];

    /**
     * Returns whether or not an object has an own property with the specified name.
     */
    export function has(s: string, obj: any): boolean;
    export function has(s: string): (obj: any) => boolean;
    export function has(s: placeholder, obj: any): (a: string) => boolean;

    /**
     * Returns whether or not an object or its prototype chain has a property with the specified name
     */
    export function hasIn(s: string, obj: any): boolean;
    export function hasIn(s: string): (obj: any) => boolean;
    export function hasIn(s: placeholder, obj: any): (a: string) => boolean;

    /**
     * Same as R.invertObj, however this accounts for objects with duplicate values by putting the values into an array.
     */
    export function invert(obj: any): {[index:string]: string[]};

    /**
     * Returns a new object with the keys of the given object as values, and the values of the given object as keys.
     */
    export function invertObj(obj: any): {[index:string]: string};
    export function invertObj(obj: {[index: number]: string}): {[index:string]: string};

    /**
     * Returns a list containing the names of all the enumerable own
     * properties of the supplied object.
     */
    export function keys(x: any): string[];

    /**
     * Returns a list containing the names of all the
     * properties of the supplied object, including prototype properties.
     */
    export function keysIn(obj: any): string[];


    /**
     * Returns a lens for the given getter and setter functions. The getter
     * "gets" the value of the focus; the setter "sets" the value of the focus.
     * The setter should not mutate the data structure.
     */
    export function lens<T,U,V>(getter: (s: T) => U, setter: (a: U, s: T) => V): Lens;

    /**
     * Creates a lens that will focus on index n of the source array.
     */
    export function lensIndex(n: number): Lens;

    /**
     * lensProp creates a lens that will focus on property k of the source object.
     */
    export function lensProp(str: string): {
        <T, U>(obj: T): U;
        set<T,U,V>(val: T, obj: U): V;
        /*map<T>(fn: Function, obj: T): T*/
    }

    export function mapObj<T, TResult>(fn: (value: T) => TResult, obj: any): {[index: string]: TResult};
    export function mapObj<T, TResult>(fn: (value: T) => TResult): (obj: any) => {[index: string]: TResult};

    /**
     * Like mapObj, but but passes additional arguments to the predicate function.
     */
    export function mapObjIndexed<T, TResult>(fn: (value: T, key: string, obj?: any) => TResult, obj: any): {[index:string]: TResult};
    export function mapObjIndexed<T, TResult>(fn: (value: T, key: string, obj?: any) => TResult): (obj: any) => {[index:string]: TResult};


    /**
     * Create a new object with the own properties of a
     * merged with the own properties of object b.
     * This function will *not* mutate passed-in objects.
     */
    export function merge(a: any, b: any): any;
    export function merge(a: any): (b: any) => any;

    /**
     * Returns a partial copy of an object omitting the keys specified.
     */
    export function omit<T>(names: string[], obj: T): T;
    export function omit<T>(names: string[]): (obj: T) => T;

    /**
     * Returns the result of "setting" the portion of the given data structure
     * focused by the given lens to the given value.
     */
    export function over<T>(lens: Lens, fn: Arity1Fn, value: T|T[]): T|T[];
    export function over<T>(lens: Lens, fn: Arity1Fn): (value: T|T[]) => T|T[];
    export function over<T>(lens: Lens): (fn: Arity1Fn, value: T|T[]) => T|T[];


    /**
     * Retrieve the value at a given path.
     */
    export function path<T>(path: string[], obj: any): T;
    export function path<T>(path: placeholder, obj: any): (path: string[]) => T;
    export function path<T>(path: string[]): (obj: any) => T;


    /**
     * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
     * property is ignored.
     */
    export function pick<T>(names: string[], obj: T): T;
    export function pick<T>(names: string[]): (obj: T) => T;

    /**
     * Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
     */
    export function pickAll<T, U>(names: string[], obj: T): U;
    export function pickAll<T, U>(names: string[]): (obj: T) => U;

    /**
     * Returns a partial copy of an object containing only the keys that satisfy the supplied predicate.
     */
    export function pickBy<T,U>(pred: ObjPred, obj: T): U;
    export function pickBy<T,U>(pred: ObjPred): (obj: T) => U;

    /**
     * Reasonable analog to SQL `select` statement.
     */
    export function project<T,U>(props: string[], objs: T[]): U[];

    /**
     * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
     */
    export function prop<T>(p: string, obj: any): T;
    export function prop<T>(p: string): (obj: any) => T;

    /**
     * If the given, non-null object has an own property with the specified name, returns the value of that property.
     * Otherwise returns the provided default value.
     */
    export function propOr<T,U,V>(val: T, p: string, obj: U): V;
    export function propOr<T,U,V>(val: T, p: string): (obj: U) => V;
    export function propOr<T,U,V>(val: T): (p: string, obj: U) => V;

    /**
     * Returns the value at the specified property.
     * The only difference from `prop` is the parameter order.
     */
    export function props<T>(ps: string[], obj: Dictionary<T>): T[];
    export function props<T>(ps: string[]): (obj:  Dictionary<T>) => T[];

    /**
     * Returns the result of "setting" the portion of the given data structure focused by the given lens to the
     * given value.
     */
    export function set<T,U>(lens: Lens, a: U, obj: T): T;
    export function set<T,U>(lens: Lens, a: U): (obj: T) => T;
    export function set<T,U>(lens: Lens): (a: U, obj: T) => T;

    /**
     * Converts an object into an array of key, value arrays.
     * Only the object's own properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     */
    export function toPairs(obj: any): any[][];

    /**
     * Converts an object into an array of key, value arrays.
     * The object's own properties and prototype properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     */
    export function toPairsIn(obj: any): any[][];

    /**
     * Returns a list of all the enumerable own properties of the supplied object.
     * Note that the order of the output array is not guaranteed across
     * different JS platforms.
     */
    export function values<T>(obj: {[index: string]: T}): T[];
    export function values(obj: any): any[];

    /**
     * Returns a list of all the properties, including prototype properties, of the supplied
     * object. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.
     */
    export function valuesIn(obj: any): any[];

   /**
    * Returns a "view" of the given data structure, determined by the given lens. The lens's focus determines which
    * portion of the data structure is visible.
    */
    export function view<T,U>(lens: Lens, obj: T): U;

   /**
    * Takes a spec object and a test object and returns true if the test satisfies the spec.
    * Any property on the spec that is not a function is interpreted as an equality
    * relation.
    *
    * If the spec has a property mapped to a function, then `where` evaluates the function, passing in
    * the test object's value for the property in question, as well as the whole test object.
    *
    * `where` is well suited to declarativley expressing constraints for other functions, e.g.,
    * `filter`, `find`, `pickWith`, etc.
    */
    export function where<T,U>(spec: T, testObj: U): boolean;
    export function where<T,U>(spec: T): (testObj: U) => boolean;
    export function where<ObjFunc2,U>(spec: ObjFunc2, testObj: U): boolean;
    export function where<ObjFunc2,U>(spec: ObjFunc2): (testObj: U) => boolean;

   /**
    * Takes a spec object and a test object; returns true if the test satisfies the spec,
    * false otherwise. An object satisfies the spec if, for each of the spec's own properties,
    * accessing that property of the object gives the same value (in R.eq terms) as accessing
    * that property of the spec.
    */
    export function whereEq<T,U>(spec: T, obj: U): boolean;
    export function whereEq<T,U>(spec: T): (obj: U) => boolean;


   /*
    * Function category
    * -----------------
    */

   /**
    * Creates a new list iteration function from an existing one by adding two new parameters to its callback
    * function: the current index, and the entire list.
    */
    export function addIndex<T, U>(fn: (f: (item: T) => U, list: T[]) => U[])
          : CurriedFunction2<(item: T, idx: number, list?: T[]) => U, T[], U[]>;
   /**
    * Returns a function that always returns the given value.
    */
    export function always<T>(val: T): () => T;

    /**
     * ap applies a list of functions to a list of values.
     */
    export function ap<T,U>(fns: ((a: T) => U)[], vs: T[]): U[];
    export function ap<T,U>(fns: ((a: T) => U)[]): (vs: T[]) => U[];

    /**
     * Applies function fn to the argument list args. This is useful for creating a fixed-arity function from
     * a variadic function. fn should be a bound function if context is significant.
     */
    export function apply<T, U, TResult>(fn: (arg0: T, ...args: T[]) => TResult, args: U[]): TResult;
    export function apply<T, U, TResult>(fn: (arg0: T, ...args: T[]) => TResult): (args: U[]) => TResult;

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly 2
     * parameters. Any extraneous parameters will not be passed to the supplied function.
     */
    export function binary(fn: (...args: any[]) => any): Function;

    /**
     * Creates a function that is bound to a context. Note: R.bind does not provide the additional argument-binding
     * capabilities of Function.prototype.bind.
     */
    export function bind<T>(thisObj: T, fn: (...args: any[]) => any): (...args: any[]) => any;

    /**
     * Returns the result of calling its first argument with the remaining arguments. This is occasionally useful
     * as a converging function for R.converge: the left branch can produce a function while the right branch
     * produces a value to be passed to that function as an argument.
     */
    export function call(fn: (...args: any[])=> (...args: any[]) => any, ...args: any[]): any;

    /**
     * Makes a comparator function out of a function that reports whether the first element is less than the second.
     */
    // comparator(pred: (a: any, b: any) => boolean): (x: number, y: number) => number;
    export function comparator<T>(pred: (a: T, b: T) => boolean): (x: T, y: T) => number;

    /**
     * Performs right-to-left function composition. The rightmost function may have any arity; the remaining
     * functions must be unary.
    */
    export function compose<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;
    export function compose<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1;
    export function compose<V0, V1, V2, T1>(fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T1;

    export function compose<V0, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0) => T1): (x0: V0) => T2;
    export function compose<V0, V1, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T2;
    export function compose<V0, V1, V2, T1, T2>(fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T2;

    export function compose<V0, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T3;
    export function compose<V0, V1, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T3;
    export function compose<V0, V1, V2, T1, T2, T3>(fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T3;

    export function compose<V0, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T4;
    export function compose<V0, V1, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T4;
    export function compose<V0, V1, V2, T1, T2, T3, T4>(fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T4;

    export function compose<V0, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T5;
    export function compose<V0, V1, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T5;
    export function compose<V0, V1, V2, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T5;

    export function compose<V0, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x: V0) => T1): (x: V0) => T6;
    export function compose<V0, V1, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T6;
    export function compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6, fn4: (x: T4) => T5, fn3: (x: T3) => T4, fn2: (x: T2) => T3, fn1: (x: T1) => T2, fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T6;

    /**
     * TODO composeK
     */

    /**
     * TODO composeP
     */

    export function ruct(fn: Function): Function;

    export function ructN(n: number, fn: Function): Function;

    /**
     * Accepts a converging function and a list of branching functions and returns a new
     * function. When invoked, this new function is applied to some arguments, each branching
     * function is applied to those same arguments. The results of each branching function
     * are passed as arguments to the converging function to produce the return value.
     */
    export function converge(after: Function, fns: Function[]): Function;

    export function curry<T1, T2, TResult>(fn: (a: T1, b: T2) => TResult): CurriedFunction2<T1,T2, TResult>
    export function curry<T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult): CurriedFunction3<T1,T2, T3, TResult>
    export function curry<T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult): CurriedFunction4<T1,T2, T3, T4, TResult>
    export function curry<T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult): CurriedFunction5<T1,T2, T3, T4, T5, TResult>
    export function curry<T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult): CurriedFunction6<T1,T2, T3, T4, T5, T6, TResult>
    export function curry(fn: Function): Function

    export function curryN(length: number, fn: (...args: any[]) => any): Function;

    /**
     * `empty` wraps any object in an array. This implementation is compatible with the
     * Fantasy-land Monoid spec, and will work with types that implement that spec.
     */
    export function empty(x: any): any[];

    export function F(): boolean;

    /**
     * Returns a new function much like the supplied one, except that the first two arguments'
     * order is reversed.
     */
    export function flip<T,U,TResult>(fn: (arg0: T, arg1: U) => TResult): (arg1: U, arg0?: T) => TResult;
    export function flip<T,U,TResult>(fn: (arg0: T, arg1: U, ...args: any[]) => TResult): (arg1: U, arg0?: T, ...args: any[]) => TResult;

    /**
     * A function that does nothing but return the parameter supplied to it. Good as a default
     * or placeholder function.
     */
    export function identity(a: any): any;

    /**
     * Turns a named method of an object (or object prototype) into a function that can be
     * called directly. Passing the optional `len` parameter restricts the returned function to
     * the initial `len` parameters of the method.
     *
     * The returned function is curried and accepts `len + 1` parameters (or `method.length + 1`
     * when `len` is not specified), and the final parameter is the target object.
     */
    export function invoker(name: string, obj: any, len?: number): Function;


    export function lift(fn: Function, ...args: any[]): any;

    export function liftN(n: number, fn: Function, ...args: any[]): any;


    export function memoize(fn: Function): Function;

    export function nAry(n: number, fn: (...arg: any[]) => any): Function;

    /**
     * TODO nthArg
     */

    export function of<T>(x: T): T[];
    export function of<T>(x: T[]): T[][];

    export function once(fn: Function): Function;


    /**
     * Accepts as its arguments a function and any number of values and returns a function that,
     * when invoked, calls the original function with all of the values prepended to the
     * original function's arguments list. In some libraries this function is named `applyLeft`.
     */
    export function partial(fn: Function, ...args: any[]): Function;

    /**
     * Accepts as its arguments a function and any number of values and returns a function that,
     * when invoked, calls the original function with all of the values appended to the original
     * function's arguments list.
     */
    export function partialRight(fn: Function, ...args: any[]): Function;

    /**
     * Creates a new function that runs each of the functions supplied as parameters in turn,
     * passing the return value of each function invocation to the next function invocation,
     * beginning with whatever arguments were passed to the initial invocation.
     */
    export function pipe<V0, T1>(fn0: (x0: V0) => T1): (x0: V0) => T1;
    export function pipe<V0, V1, T1>(fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T1;
    export function pipe<V0, V1, V2, T1>(fn0: (x0: V0, x1: V1, x2: V2) => T1): (x0: V0, x1: V1, x2: V2) => T1;

    export function pipe<V0, T1, T2>(fn0: (x0: V0) => T1, fn1: (x: T1) => T2): (x0: V0) => T2;
    export function pipe<V0, V1, T1, T2>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2): (x0: V0, x1: V1) => T2;
    export function pipe<V0, V1, V2, T1, T2>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2): (x0: V0, x1: V1, x2: V2) => T2;

    export function pipe<V0, T1, T2, T3>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x: V0) => T3;
    export function pipe<V0, V1, T1, T2, T3>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x0: V0, x1: V1) => T3;
    export function pipe<V0, V1, V2, T1, T2, T3>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3): (x0: V0, x1: V1, x2: V2) => T3;

    export function pipe<V0, T1, T2, T3, T4>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x: V0) => T4;
    export function pipe<V0, V1, T1, T2, T3, T4>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x0: V0, x1: V1) => T4;
    export function pipe<V0, V1, V2, T1, T2, T3, T4>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4): (x0: V0, x1: V1, x2: V2) => T4;

    export function pipe<V0, T1, T2, T3, T4, T5>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x: V0) => T5;
    export function pipe<V0, V1, T1, T2, T3, T4, T5>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x0: V0, x1: V1) => T5;
    export function pipe<V0, V1, V2, T1, T2, T3, T4, T5>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5): (x0: V0, x1: V1, x2: V2) => T5;

    export function pipe<V0, T1, T2, T3, T4, T5, T6>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): (x: V0) => T6;
    export function pipe<V0, V1, T1, T2, T3, T4, T5, T6>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): (x0: V0, x1: V1) => T6;
    export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6): (x0: V0, x1: V1, x2: V2) => T6;

    export function pipe<V0, T1, T2, T3, T4, T5, T6, T7>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn: (x: T6) => T7): (x: V0) => T7;
    export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7): (x0: V0, x1: V1) => T7;
    export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7): (x0: V0, x1: V1, x2: V2) => T7;

    export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8>(fn0: (x: V0) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T6) => T7, fn: (x: T7) => T8): (x: V0) => T8;
    export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(fn0: (x0: V0, x1: V1) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T5) => T6, fn7: (x: T7) => T8): (x0: V0, x1: V1) => T8;
    export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(fn0: (x0: V0, x1: V1, x2: V2) => T1, fn1: (x: T1) => T2, fn2: (x: T2) => T3, fn3: (x: T3) => T4, fn4: (x: T4) => T5, fn5: (x: T5) => T6, fn6: (x: T5) => T6, fn7: (x: T7) => T8): (x0: V0, x1: V1, x2: V2) => T8;

    /**
     * The function to call with x. The return value of fn will be thrown away.
     */
    export function tap<T>(fn: (a: T) => any, value: T): T;
    export function tap<T>(fn: (a: T) => any): (value: T) => T;


    // Object Functions
    // ----------------
    //
    // These functions operate on plain Javascript object, adding simple functions to test properties on these
    // objects.  Many of these are of most use in conjunction with the list functions, operating on lists of
    // objects.


    export function op(fn: (a: any, b: any) => any): Function;

    export function substring(indexA: number, indexB: number, str: string): string;
    export function substringFrom(indexA: number, str: string): string;
    export function substringTo(indexA: number, str: string): string;

    export function isArrayLike(val: any): boolean;

    export function op(fn: Function): Function;



    export function unary<T>(fn: (a: T, ...args: any[]) => any): (a: T) => any




    /**
     * Accepts a function fn and a list of transformer functions and returns a new curried function.
     * When the new function is invoked, it calls the function fn with parameters consisting of the
     * result of calling each supplied handler on successive arguments to the new function.
     *
     * If more arguments are passed to the returned function than transformer functions, those arguments
     * are passed directly to fn as additional parameters. If you expect additional arguments that don't
     * need to be transformed, although you can ignore them, it's best to pass an identity function so
     * that the new function reports the correct arity.
     */
    export function useWith(fn: Function, transformers: Function[]): Function;








    /**
     * Returns a fixed list of size `n` containing a specified identical value.
     */
    export function repeatN<T>(value: T, n: number): T[];


    export function wrap(fn: Function, wrapper: Function): Function;




    /*
     * List category
     * -------------
     */



    // flip<T,U,TResult>(fn: (arg0: T, arg1: U, ...args: any[]) => TResult): (arg1: U, arg0: T) => ((...args: any[]) => TResult);
    // flip<T,U,TResult>(fn: (arg0: T, arg1: U, ...args: any[]) => TResult): (arg1: U) => ((arg0: T, ...args: any[]) => TResult);




    /**
     * `of` wraps any object in an Array. This implementation is compatible with the
     * Fantasy-land Applicative spec, and will work with types that implement that spec.
     * Note this `of` is different from the ES6 `of`; See
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
     */
    export function of(x: any): any[];






    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
     * them in a new array, depth-first.
     */
    // checked
    export function flatten(x: any[]): any[];

    /**
     * Calls the specified function on the supplied object. Any additional arguments
     * after `fn` and `obj` are passed in to `fn`. If no additional arguments are passed to `func`,
     * `fn` is invoked with no arguments.
     */
    export function func(funcName: string , obj: any): any;



    // Miscellaneous Functions
    // -----------------------
    //
    // A few functions in need of a good home.

    // --------

    /**
     * Expose the functions from ramda as properties of another object.
     * If the provided object is the global object then the ramda
     * functions become global functions.
     * Warning: This function *will* mutate the object provided.
     */
    export function installTo(obj: any): any;


    /**
     * See if an object (`val`) is an instance of the supplied constructor.
     * This function will check up the inheritance chain, if any.
     */
    export function is(ctor: any, val: any): boolean;
    export function is(ctor: any): (val: any) => boolean;


    /**
     * Checks if the input value is null or undefined.
     */
    export function isNil(value: any): boolean;


    /**
     * A function that always returns `0`. Any passed in parameters are ignored.
     */
    export function alwaysZero(): number;


    /**
     * A function that always returns `false`. Any passed in parameters are ignored.
     */
    export function alwaysFalse(): boolean;


    /**
     * A function that always returns `true`. Any passed in parameters are ignored.
     */
    export function alwaysTrue(): boolean;

    /**
     * Logic Functions
     * ---------------
     */

    /**
     * Given a list of predicates, returns a new predicate that will be true exactly when all of them are.
     */
    export function allPass(preds: Pred[]): Pred;

    /**
     * A function that returns the first argument if it's falsy otherwise the second argument. Note that this is
     * NOT short-circuited, meaning that if expressions are passed they are both evaluated.
     */
    export function and<T extends {and?: Function;}>(fn1: T, val2: boolean|any): boolean;
    export function and<T extends {and?: Function;}>(fn1: T): (val2: boolean|any) => boolean;

    /**
     * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
     */
    export function anyPass(preds: Pred[]): Pred;

    /**
     * A function wrapping calls to the two functions in an && operation, returning the result of the first function
     * if it is false-y and the result of the second function otherwise. Note that this is short-circuited, meaning
     * that the second function will not be invoked if the first returns a false-y value.
     */
    export function both(pred1: Pred, pred2: Pred): Pred;
    export function both(pred1: Pred): (pred2: Pred) => Pred;

    /**
     * Takes a function f and returns a function g such that:
     * - applying g to zero or more arguments will give true if applying the same arguments to f gives
     *   a logical false value; and
     * - applying g to zero or more arguments will give false if applying the same arguments to f gives
     *   a logical true value.
     */
    export function complement(pred: (...args: any[]) => boolean): (...args: any[]) => boolean

    /**
     * Returns a function, fn, which encapsulates if/else-if/else logic. R.cond takes a list of [predicate, transform] pairs.
     * All of the arguments to fn are applied to each of the predicates in turn until one returns a "truthy" value, at which
     * point fn returns the result of applying its arguments to the corresponding transformer. If none of the predicates
     * matches, fn returns undefined.
     */
    export function cond(fns: [Pred, Function][]): Function;

    /**
     * Returns the second argument if it is not null or undefined. If it is null or undefined, the
     * first (default) argument is returned.
     */
    export function defaultTo<T,U>(a: T, b: U): T|U
    export function defaultTo<T>(a: T): <U>(b: U) => T|U

    /**
     * A function wrapping calls to the two functions in an || operation, returning the result of the first
     * function if it is truth-y and the result of the second function otherwise. Note that this is
     * short-circuited, meaning that the second function will not be invoked if the first returns a truth-y value.
     */
    export function either(pred1: Pred, pred2: Pred): Pred;
    export function either(pred1: Pred): (pred2: Pred) => Pred;

    /**
     * Creates a function that will process either the onTrue or the onFalse function depending upon the result
     * of the condition predicate.
     */
    export function ifElse(fn: Pred, onTrue: Arity1Fn, onFalse: Arity1Fn): Arity1Fn;

    /**
     * Reports whether the list has zero elements.
     */
    export function isEmpty(value: string|any[]): boolean;

    /**
     * A function wrapping a call to the given function in a `!` operation.  It will return `true` when the
     * underlying function would return a false-y value, and `false` when it would return a truth-y one.
     */
    export function not(value: any): boolean;

    /**
     * A function that returns the first truthy of two arguments otherwise the last argument. Note that this is
     * NOT short-circuited, meaning that if expressions are passed they are both evaluated.
     * Dispatches to the or method of the first argument if applicable.
     */
    export function or<T, U>(a: T, b: U): T|U;
    export function or<T>(a: T): <U>(b: U) => T|U;
    export function or<T extends {or?: Function;}, U>(fn1: T, val2: U): T|U;
    export function or<T extends {or?: Function;}>(fn1: T): <U>(val2: U) => T|U;



    /**
     * Math category
     * -------------
     */

    /**
     * Adds two numbers (or strings). Equivalent to a + b but curried.
     */
    export function add(a: number, b: number): number;
    export function add(a: string, b: string): string;
    export function add(a: number): (b: number) => number;
    export function add(a: string): (b: string) => string;

    /**
     * Decrements its argument.
     */
    export function dec(n: number): number;

    /**
     * Divides two numbers. Equivalent to a / b.
     */
    export function divide(a: number, b: number): number;
    export function divide(a: number): (b: number) => number;
    export function divide(a: placeholder, b: number): (b: number) => number;

    /**
     * Returns true if the first parameter is greater than the second.
     */
    export function gt(a: number, b: number): boolean;
    export function gt(a: number): (b: number) => boolean;
    export function gt(a: placeholder, b: number): (b: number) => boolean;

    /**
     * Returns true if the first parameter is greater than or equal to the second.
     */
    export function gte(a: number, b: number): boolean;
    export function gte(a: number): (b: number) => boolean;
    export function gte(a: placeholder, b: number): (b: number) => boolean;

    /**
     * Increments its argument.
     */
    export function inc(n: number): number;

    /**
     * Returns true if the input value is NaN.
     */
    export function isNaN(x: any): boolean;

    /**
     * Returns true if the first parameter is less than the second.
     */
    export function lt(a: number, b: number): boolean;
    export function lt(a: number): (b: number) => boolean;
    export function lt(a: placeholder, b: number): (b: number) => boolean;

    /**
     * Returns true if the first parameter is less than or equal to the second.
     */
    export function lte(a: number, b: number): boolean;
    export function lte(a: number): (b: number) => boolean;
    export function lte(a: placeholder, b: number): (b: number) => boolean;

    /**
     * mathMod behaves like the modulo operator should mathematically, unlike the `%`
     * operator (and by extension, R.modulo). So while "-17 % 5" is -2,
     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
     * when the modulus is zero or negative.
     */
    export function mathMod(a: number, b: number): number;
    export function mathMod(a: number): (b: number) => number;
    export function mathMod(a: placeholder, b: number): (a: number) => number;

    /**
     * Returns the larger of its two arguments.
     */
    export function max(a: number, b: number): number;
    export function max(a: number): (b: number) => number;

    /**
     * Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator.
     */
    export function maxBy<T>(keyFn: (a: T) => number, list: T[]): T;
    export function maxBy<T>(keyFn: (a: T) => number): (list: T[]) => T;

    /**
     * Returns the smaller of its two arguments.
     */
    export function min(a: number, b: number): number;
    export function min(a: number): (b: number) => number;

    /**
     * Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator.
     */
    export function minBy<T>(keyFn: (a: T) => number, list: T[]): T;
    export function minBy<T>(keyFn: (a: T) => number): (list: T[]) => T;

    /**
     * Divides the second parameter by the first and returns the remainder.
     * The flipped version (`moduloBy`) may be more useful curried.
     * Note that this functions preserves the JavaScript-style behavior for
     * modulo. For mathematical modulo see `mathMod`
     */
    export function modulo(a: number, b: number): number;
    export function modulo(a: placeholder, b: number): (a: number) => number;
    export function modulo(a: number): (b: number) => number;

    /**
     * Multiplies two numbers. Equivalent to a * b but curried.
     */
    export function multiply(a: number, b: number): number;
    export function multiply(a: number): (b: number) => number;
    export function multiply(a: placeholder, b: number): (a: number) => number;

    /**
     * Negates its argument.
     */
    export function negate(n: number): number;

    /**
     * Multiplies together all the elements of a list.
     */
    export function product(list: number[]): number;

    /**
     * Subtracts two numbers. Equivalent to `a - b` but curried.
     */
    export function subtract(a: number, b: number): number;
    export function subtract(a: placeholder, b: number): (a: number) => number;
    export function subtract(a: number): (b: number) => number;

    /**
     * Adds together all the elements of a list.
     */
    export function sum(list: number[]): number;

    /*
     * String Functions
     */

    /**
     * Returns a string containing the characters of str from fromIndex (inclusive) to toIndex (exclusive).
     */
    export function substring(indexA: number, indexB: number, str: string): string;
    export function substring(indexA: number): (indexB: number, str: string) => string;
    export function substring(indexA: number, indexB: number): (str: string) => string;


    /**
     * The trailing substring of a String starting with the nth character:
     */
    export function substringFrom(indexA: number, str: string): string;
    export function substringFrom(indexA: number): (str: string) => string;

    /**
     * Replace a substring or regex match in a string with a replacement.
     */
    export function replace(pattern: RegExp, replacement: string, str: string): string;
    export function replace(pattern: RegExp, replacement: string): (str: string) => string;
    export function replace(pattern: RegExp): (replacement: string) => (str: string) => string;
    export function replace(pattern: String, replacement: string, str: string): string;
    export function replace(pattern: String, replacement: string): (str: string) => string;
    export function replace(pattern: String): (replacement: string) => (str: string) => string;

    /**
     * Returns a string containing the first toIndex characters of str.
     */
    export function substringTo(toIndex: number, str: string): string;
    export function substringTo(toIndex: number): (str: string) => string;


    /**
     * Returns the nth character of the given string.
     */
    export function nthChar(index: number, str: string): string;


    /**
     * Returns the character code of the nth character of the given string.
     */
    export function nthCharCode(index: number, str: string): number;


    /**
     * Tests a regular expression agains a String
     */
    export function match(regexp: RegExp, str: string): any[];


    /**
     * Finds the first index of a substring in a string, returning -1 if it's not present
     */
    export function strIndexOf(c: string, str: string): number;


    /**
     * Finds the last index of a substring in a string, returning -1 if it's not present
     */
    export function strLastIndexOf(c: string, str: string): number;


    /**
     * The upper case version of a string.
     */
    export function toUpper(str: string): string;


    /**
     * Removes (strips) whitespace from both ends of the string.
     */
    export function trim(str: string): string;


    /**
     * The lower case version of a string.
     */
    export function toLower(str: string): string;


    /**
     * Splits a string into an array of strings based on the given
     * separator.
     */

    export function split(sep: string): (str: string) => string[];
    export function split(sep: RegExp): (str: string) => string[];
    export function split(sep: string, str: string): string[];
    export function split(sep: RegExp, str: string): string[];



    // Data Analysis and Grouping Functions
    // ------------------------------------
    //
    // Functions performing SQL-like actions on lists of objects.  These do
    // not have any SQL-like optimizations performed on them, however.

    // --------

    /*
     * Relation category
     */

    /**
     * Counts the elements of a list according to how many match each value
     * of a key generated by the supplied function. Returns an object
     * mapping the keys produced by `fn` to the number of occurrences in
     * the list. Note that all keys are coerced to strings because of how
     * JavaScript objects work.
     */
    export function countBy(fn: (a: any) => string|number, list: any[]): any;
    export function countBy(fn: (a: any) => string|number): (list: any[]) => any;

    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     */
    export function difference<T>(list1: T[], list2: T[]): T[];
    export function difference<T>(list1: T[]): (list2: T[]) => T[];


    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     * Duplication is determined according to the value returned by applying the supplied predicate to two list
     * elements.
     */
    export function differenceWith<T>(pred: (a: T, b: T) => boolean, list1: T[], list2: T[]): T[];

    /**
     * Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
     * non-coercing equality for primitives.
     */
    export function eq<T>(a: T, b: T): boolean;
    export function eq<T>(a: T): (b: T) => boolean;

    /**
     * Returns true if its arguments are equivalent, false otherwise. Dispatches to an equals method if present.
     * Handles cyclical data structures.
     */
    export function equals<T>(a: T, b: T): boolean;
    export function equals<T>(a: T): (b: T) => boolean;


    /**
     * Returns true if its arguments are identical, false otherwise. Values are identical if they reference the
     * same memory. NaN is identical to NaN; 0 and -0 are not identical.
     */
    export function identical<T>(a: T, b: T): boolean;
    export function identical<T>(a: T): (b: T) => boolean;


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
     */
    export function intersection<T>(list1: T[], list2: T[]): T[];


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those
     * elements common to both lists.  Duplication is determined according
     * to the value returned by applying the supplied predicate to two list
     * elements.
     */
    export function intersectionWith<T>(pred: (a: T, b: T) => boolean, list1: T[], list2: T[]): T[];

    /**
     * Determines whether a nested path on an object has a specific value,
     * in `R.equals` terms. Most likely used to filter a list.
     */
    export function pathEq(path: string[], val: any, obj: any): boolean;
    export function pathEq(path: string[], val: any): (obj: any) => boolean;
    export function pathEq(path: string[]): (val: any, obj: any) => boolean;
    export function pathEq(path: string[]): (val: any) => (obj: any) => boolean;

    /**
     * Determines whether the given property of an object has a specific
     * value according to strict equality (`===`).  Most likely used to
     * filter a list.
     */
    export function propEq<T>(name: string, val: T, obj: any): boolean;
    export function propEq<T>(name: number, val: T, obj: any): boolean;
    export function propEq<T>(name: string, val: T): (...args: any[]) => boolean;
    export function propEq<T>(name: number, val: T): (...args: any[]) => boolean;
    export function propEq<T>(name: string): (val: T, ...args: any[]) => boolean;
    export function propEq<T>(name: number): (val: T, ...args: any[]) => boolean;




    /**
     * Sorts the list according to a key generated by the supplied function.
     */
    export function sortBy<T>(fn: (a: any) => string, list: T[]): T[];
    export function sortBy<T>(__: placeholder, list: T[]): T[];
    export function sortBy<T>(fn: (a: any) => string): (list: T[]) => T[];


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the
     * elements of each list.
     */
    export function union<T>(as: T[], bs: T[]): T[];


    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
     * determined according to the value returned by applying the supplied predicate to two list elements.
     */
    export function unionWith<T>(pred: (a: T, b: T) => boolean, list1: T[], list2: T[]): T[];


    export function q<T,U>(a: T, b: U): boolean;



    export function T(): boolean;




    // Custom additional methods and constructs

    export interface Monad<T> {
      of<U>(x: U): Monad<U>
      chain<U>(f: (t: T) => Monad<U>): Monad<U>
      map<U>(f: (a: T) => U): Monad<U>
    }

    // ---------------------

    export interface Just<T> extends Maybe<T> {}
    export interface Nothing extends Maybe<void> {}

    export interface Maybe<T> extends Monad<T>{
      Just<T>(x: T): Just<T>
      Nothing(): Nothing
      fromNullable<T>(x: T): Maybe<T>

      // Monad Interface
      of<U>(x: U): Maybe<U>
      chain<U>(f: (t: T) => Maybe<U>): Maybe<U>
      map<U>(f: (a: T) => U): Maybe<U>

      isNothing: boolean
      isJust: boolean
      isEqual<U>(x: Maybe<U>): boolean
      get(): T
      getOrElse(x: T): T
      orElse(f: () => T): T
      cata<U>(x: Maybe<any>): Maybe<U>
      toJSON(): string

      fromEither: any
      fromValidation: any
    }

    export var Maybe: Maybe<any>

    export var Either: any
    export var Task: any
    export var pattern: any
    export var caseOf: any
    export var extract: any
    export var extractOne: any

    export var adt: any
    export var lenses: any


}
