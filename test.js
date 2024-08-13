const sortRef = ["EDT", "NB", "DL"];
const invoiceDate = { EDT: [], NB: [], DL: [] };
const objArray = [
  { category: "NB", itemName: "1125", price: 70 },
  { category: "EDT", itemName: "H2O", price: 100 },
  { category: "NB", itemName: "1145", price: 72 },
  { category: "DL", itemName: "DUMMY LAUNCHER", price: 60 },
  { category: "EDT", itemName: "SPR", price: 90 },
];
const categories = objArray.reduce((acc, curr) => {
  acc[curr.category].push(curr.itemName);
  return acc;
}, invoiceDate);
// .sort((a, b) => {
//   const next = sortRef.findIndex((sort) => sort === a);
//   const prev = sortRef.findIndex((sort) => sort === b);
//   return next - prev;
// });
console.log(categories);
// const sortRef = ["FEB", "SEP", "OCT", "JAN"];
// const Qmonths = ["JAN", "OCT"];
// Qmonths.sort((a, b) => {
//   let prev = sortRef.findIndex((month) => month === a);
//   let next = sortRef.findIndex((month) => month === b);

//   return prev - next;
// });
// console.log(Qmonths);
// const objArray = {
//   EDT: ["H2O", "IDT", "RAPT", "SPT"],
//   NB: ["1125", "1145", "190", "BBOSS"],
// };
// if (!objArray["EDT"].includes("SPR")) {
//   objArray["EDT"].push("SPR");
// }
// console.log(objArray);
