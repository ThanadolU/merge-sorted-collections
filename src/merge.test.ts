import { describe, expect, it } from "vitest";
import { merge } from "./merge";

describe("merge", () => {
  it("merges one descending and two ascending arrays into ascending order", () => {
    expect(merge([9, 7, 5, 3, 1], [0, 2, 4, 6], [0, 3, 8, 10])).toEqual([
      0, 0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  describe("empty arrays", () => {
    it("returns an empty array when all inputs are empty", () => {
      expect(merge([], [], [])).toEqual([]);
    });

    it("reverses collection_1 when it is the only non-empty input", () => {
      expect(merge([5, 3, 1], [], [])).toEqual([1, 3, 5]);
    });

    it("returns collection_2 when it is the only non-empty input", () => {
      expect(merge([], [1, 3, 5], [])).toEqual([1, 3, 5]);
    });

    it("returns collection_3 when it is the only non-empty input", () => {
      expect(merge([], [], [1, 3, 5])).toEqual([1, 3, 5]);
    });

    it("merges two inputs when the third is empty", () => {
      expect(merge([4, 2], [1, 3], [])).toEqual([1, 2, 3, 4]);
      expect(merge([4, 2], [], [1, 3])).toEqual([1, 2, 3, 4]);
      expect(merge([], [2, 4], [1, 3])).toEqual([1, 2, 3, 4]);
    });
  });

  describe("duplicates", () => {
    it("keeps duplicates across arrays", () => {
      expect(merge([2, 1], [1, 2], [1, 2])).toEqual([1, 1, 1, 2, 2, 2]);
    });

    it("keeps duplicates within an array", () => {
      expect(merge([3, 3, 3], [1, 1], [2, 2])).toEqual([1, 1, 2, 2, 3, 3, 3]);
    });

    it("handles all zeros", () => {
      expect(merge([0, 0], [0], [0, 0, 0])).toEqual([0, 0, 0, 0, 0, 0]);
    });
  });

  describe("array ranges", () => {
    it("handles single-element arrays", () => {
      expect(merge([2], [3], [1])).toEqual([1, 2, 3]);
    });

    it.each([
      ["collection_1 lowest", [2, 1], [3, 4], [5, 6]],
      ["collection_2 lowest", [4, 3], [1, 2], [5, 6]],
      ["collection_3 lowest", [6, 5], [3, 4], [1, 2]],
    ])("handles non-overlapping ranges with %s", (_name, a, b, c) => {
      expect(merge(a, b, c)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("handles arrays of very different lengths", () => {
      expect(merge([100], [0, 1, 2, 3, 4, 5], [50])).toEqual([
        0, 1, 2, 3, 4, 5, 50, 100,
      ]);
    });
  });

  it("does not modify the input arrays", () => {
    const a = [5, 3, 1];
    const b = [0, 2];
    const c = [4, 6];

    merge(a, b, c);

    expect(a).toEqual([5, 3, 1]);
    expect(b).toEqual([0, 2]);
    expect(c).toEqual([4, 6]);
  });

  it("returns a new array rather than an input array", () => {
    const b = [1, 2, 3];

    expect(merge([], b, [])).not.toBe(b);
  });

  it("matches a built-in sort on random inputs", () => {
    // A small fixed-seed generator keeps failures reproducible.
    let seed = 42;
    const nextInt = (max: number) => {
      seed = (seed * 1664525 + 1013904223) % 2 ** 32;
      return seed % max;
    };
    const randomArray = () =>
      Array.from({ length: nextInt(50) }, () => nextInt(100));
    const ascending = (x: number, y: number) => x - y;

    for (let run = 0; run < 200; run++) {
      const a = randomArray().sort((x, y) => y - x);
      const b = randomArray().sort(ascending);
      const c = randomArray().sort(ascending);

      expect(merge(a, b, c)).toEqual([...a, ...b, ...c].sort(ascending));
    }
  });
});
