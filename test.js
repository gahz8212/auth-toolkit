let arrs = [
  { id: 1, name: "h2o tx front cover", price: 10 },
  { id: 2, name: "h2o tx back cover", price: 8 },
  { id: 3, name: "h2o tx front button rubber", price: 8 },
  { id: 4, name: "h2o tx front button ring", price: 1 },
  { id: 5, name: "h20 tx screw", price: 2 },
  { id: 6, name: "h2o tx main pcb", price: 18 },
  { id: 7, name: "h2o tx rf module pcb", price: 7 },
  { id: 8, name: "h2o tx lanyard", price: 6 },
  { id: 9, name: "h2o rx front cover", price: 10 },
  { id: 10, name: "h2o rx back cover", price: 8 },
  { id: 11, name: "h2o rx front button rubber", price: 8 },
  { id: 12, name: "h2o rx front button ring", price: 1 },
  { id: 13, name: "h20 rx screw", price: 2 },
  { id: 14, name: "h2o rx main pcb", price: 18 },
  { id: 15, name: "h2o rx rf module pcb", price: 7 },
  { id: 16, name: "h2o rx lanyard", price: 6 },
];

let sources = [
  "h2o tx front cover",
  "h2o tx rf module",
  "h2o1820 tx front cover",
];

// let result = sources.map((string) =>
//   arrs.map((arr) => {
//     let count = 0;
//     const targets = string.split(" ");
//     targets.forEach((target) => {
//       const regex = new RegExp(target);
//       if (regex.exec(arr.name)) {
//         count = (1 / targets.length) * 100 + count;
//       }
//     });
//     return count;
//   })
// );
// console.log(result);
// const result = (arrs[0].name).match(/h2\d/);
// console.log(result);
// let result = /tx/.exec("h2o tx front cover");
// console.log(result.length);

// console.log(/\d{4}/.replace(" 1820"));
const index = "h2o1820".search(/\d{4}/);
const model = "h2o1820".slice(0, index);
const number = "h2o1820".slice(index);
const result = model + " " + number;
console.log(result);
let results=null;
console.log(results|{a:'aaa'})