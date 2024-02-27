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
// const arrs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
// const arr1 = { image: { url: "" } };
// const newarr = arrs.map((arr) => ({ ...arr, ...arr1 }));
// console.log(newarr);
// const user = { id: 1, name: "aaa" };
// delete user.name;
// user.name = "bbb";
// console.log(user);
// const date = new Date("Mon Dec 13 2021 09:00:00 GMT+0900 (대한민국 표준시)");
// console.log(date);
const datas = [
  {
    name: "aaa",
    feb: 5,
    march: 99,
    april: 104,
    moq: 10,
    number1: 1,
    number2: 10,
  },
  {
    name: "bbb",
    feb: 90,
    march: 90,
    april: 90,
    moq: 90,
    number1: 1,
    number2: 3,
  },
];
const headers = Object.keys(datas[0]).slice(1, 4);
const newData = [];
for (let data of datas) {
  let obj1 = {};
  let obj2 = {};
  for (let header of headers) {
    if (data[header] - (data[header] % data.moq))
      obj1 = {
        ...obj1,
        ...{
          name: data.name,
          [header]: Math.floor(data[header] - (data[header] % data.moq)),
          number1: data.number1,
          number2: data.number2,
        },
      };
    if (data[header] % data.moq) {
      obj2 = {
        ...obj2,
        ...{
          name: data.name,
          [header]: Math.floor(data[header] % data.moq),
          number1: data.number1,
          number2: datas.length + 100,
        },
      };
    }
  }
  newData.push(obj1, obj2);
}
console.log(newData);
