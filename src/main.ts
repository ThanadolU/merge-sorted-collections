import { merge } from "./merge";

const collection_1 = [9, 7, 5, 3, 1];
const collection_2 = [0, 2, 4, 6];
const collection_3 = [0, 3, 8, 10];

console.log("collection_1:", collection_1);
console.log("collection_2:", collection_2);
console.log("collection_3:", collection_3);
console.log("merged:      ", merge(collection_1, collection_2, collection_3));
