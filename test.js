// const target = { a: 1, b: 2, c: { z: 0 } };
// const source = { b: { z: 100 }, c: 4 };
// const result = Object.assign({ ...target, ...source });
// console.log(result, target);
// console.log(result === target);

// const friends = [
//   {
//     name: "kim",
//     age: 10,
//   },
//   {
//     name: "kim",
//     age: 20,
//   },
//   {
//     name: "kim",
//     age: 10,
//   },
//   {
//     name: "kim",
//     age: 30,
//   },
// ];
// console.log(friends.map((friend) => friend.name));
// const result = friends.reduce(
//   (acc, friend) => {
//     if (friend.age > 20) {
//       acc[0]++;
//     } else {
//       acc[1]++;
//     }
//     return acc;
//   },
//   [0, 0]
// );
// console.log(result);
// type;
// const arr1 = { a: 1, b: 2, c: 3, d: 4 };
// const arr2 = { b: 3, a: 1, c: 3, d: 5 };
// console.log(JSON.stringify(arr1) === JSON.stringify(arr2));
// const keys = Object.keys(arr1);
// for (let key of keys) {
//   if (arr1[key] !== arr2[key]) {
//     console.log(arr2[key]);
//   }
// }
// const arr1_sort = Object.keys(arr1)
//   .sort()
//   .reduce((obj, key) => ((obj[key] = arr1[key]), obj), {});

// console.log(arr1_sort);
// let array = [];
// for (let key of Object.keys(arr2)) {
//   if (arr1[key] !== arr2[key]) {
//     array.push(key);
//   }
// }
// const arr1 = { name: "kim", age: 30 };
// const arr2 = { name: "choi", age: 30 };
// // arr.names = arr.name;
// // delete arr.name;

// // console.log(arr[1]);
// const newarr = {};
// for (let key of Object.keys(arr2)) {
//   if (arr1[key] !== arr2[key]) {
//     newarr[key] = arr2[key];
//   }
// }
// console.log(newarr);
// const arrs = [1, 2, 3, 4];
// const newarrs = arrs.splice(2, 1, 100);
// console.log(arrs);
const arrs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const arr1 = { image: { url: "" } };
const newarr = arrs.map((arr) => ({ ...arr, ...arr1 }));
console.log(newarr);
