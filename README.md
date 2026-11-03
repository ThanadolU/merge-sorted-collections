# merge-sorted-collections

A TypeScript implementation of:

```
merge(int[] collection_1, int[] collection_2, int[] collection_3) : int[]
```

It returns all elements of the three arrays, sorted ascending.

| Input          | Sort order given                |
| -------------- | ------------------------------- |
| `collection_1` | already sorted from max to min  |
| `collection_2` | already sorted from min (0) to max |
| `collection_3` | already sorted from min (0) to max |

## Approach

This is a three-way merge that takes advantage of the existing order, with no call to a sort function:

- `collection_1` is read from its last element to its first, because its smallest value is at the end.
- `collection_2` and `collection_3` are read from first to last.
- Each step copies the smallest of the three current values to the result.

| Complexity | Value | Notes                                    |
| ---------- | ----- | ---------------------------------------- |
| Time       | O(n)  | n is the total number of elements        |
| Space      | O(n)  | for the result; the inputs are not changed |

Duplicates are kept. TypeScript has no `int` type, so the signature uses `number[]`. The function assumes its inputs are integers sorted as described and does not validate them.

## Setup

Requires [Node.js](https://nodejs.org/) 20, 22, or 24 and later, which includes npm.

```bash
git clone https://github.com/ThanadolU/merge-sorted-collections.git
cd merge-sorted-collections
npm install
```

## Run the code

```bash
npm start
```

This compiles the project and runs the example in `src/main.ts`:

```
collection_1: [ 9, 7, 5, 3, 1 ]
collection_2: [ 0, 2, 4, 6 ]
collection_3: [ 0, 3, 8, 10 ]
merged:       [
   0, 0, 1, 2, 3, 3,
   4, 5, 6, 7, 8, 9,
  10
]
```

## Run the unit tests

```bash
npm test               # run once
npm run test:watch     # re-run on file changes
npm run test:coverage  # run once and report coverage
```

## Project structure

```
src/
  merge.ts       the merge function
  merge.test.ts  unit tests (Vitest)
  main.ts        runnable example
```
