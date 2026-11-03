/**
 * Merges three sorted integer arrays into one array sorted ascending.
 *
 * Runs in O(n) time and O(n) space, where n is the total number of elements.
 * The input arrays are not modified. Duplicates are kept.
 *
 * @param collection_1 integers sorted from max to min
 * @param collection_2 integers sorted from min (0) to max
 * @param collection_3 integers sorted from min (0) to max
 * @returns all elements of the three arrays, sorted ascending
 */
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[],
): number[] {
  const total = collection_1.length + collection_2.length + collection_3.length;
  const result = new Array<number>(total);

  // collection_1 is descending, so its smallest element is at the end.
  let i = collection_1.length - 1;
  let j = 0;
  let k = 0;

  for (let n = 0; n < total; n++) {
    // An exhausted array reads as Infinity, so it is never the smallest.
    const a = i >= 0 ? collection_1[i] : Infinity;
    const b = j < collection_2.length ? collection_2[j] : Infinity;
    const c = k < collection_3.length ? collection_3[k] : Infinity;

    if (a <= b && a <= c) {
      result[n] = a;
      i--;
    } else if (b <= c) {
      result[n] = b;
      j++;
    } else {
      result[n] = c;
      k++;
    }
  }

  return result;
}
