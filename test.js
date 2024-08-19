const objArr = [
  { id: 1, name: "aaa", amount: 10, moq: 10, price: 10 },
  { id: 2, name: "bbb", amount: 11, moq: 10, price: 9 },
  { id: 3, name: "ccc", amount: 12, moq: 10, price: 8 },
  { id: 4, name: "ddd", amount: 6, moq: 10, price: 9 },
];
const newObjArr = [...objArr];
newObjArr.forEach((obj) => {
  if (obj.amount % obj.moq) {
    if (obj.amount % obj.moq === obj.amount) {
      if ((obj.amount / obj.moq) * 100 > 50) {
      } else {
        const idx = objArr.findIndex((newobj) => newobj.name === obj.name);

        objArr.splice(idx, 1);
        objArr.push({
          id: obj.id,
          name: obj.name,
          amount: obj.amount % obj.moq,
          moq: obj.moq,
          price: obj.price,
        });
      }
    } else {
      const idx = objArr.findIndex((newobj) => newobj.name === obj.name);
      const newObj = {
        id: obj.id,
        name: obj.name,
        amount: obj.amount - (obj.amount % obj.moq),
        moq: obj.moq,
        price: obj.price,
      };
      objArr.splice(idx, 1, newObj);
      objArr.push({
        id: obj.id,
        name: obj.name,
        amount: obj.amount % obj.moq,
        moq: obj.moq,
        price: obj.price,
      });
    }
  }
});
console.log(objArr);
// const sortRef = ["EDT", "NB", "DL"];
// const invoiceDate = { EDT: [], NB: [], DL: [] };
// const objArray = [
//   { category: "NB", itemName: "1125", price: 70 },
//   { category: "EDT", itemName: "H2O", price: 100 },
//   { category: "NB", itemName: "1145", price: 72 },
//   { category: "DL", itemName: "DUMMY LAUNCHER", price: 60 },
//   { category: "EDT", itemName: "SPR", price: 90 },
// ];
// const categories = objArray.reduce((acc, curr) => {
//   acc[curr.category].push({ name: curr.itemName, price: curr.price });
//   return acc;
// }, invoiceDate);
// // .sort((a, b) => {
// //   const next = sortRef.findIndex((sort) => sort === a);
// //   const prev = sortRef.findIndex((sort) => sort === b);
// //   return next - prev;
// // });
// // console.log(Object.entries(categories)[0]);

// const keys = Object.keys(categories);
// const result = keys.map((key, index) => Object.entries(categories)[index]);
// console.log(result);
// let rowCounts = result.length;
// // rowCounts += result.map((res) => res[1].length);
// console.log("rowCount", rowCounts);
// let row = 0;

// for (let i = 0; i < result.length; i++) {
//   const category = result[i][0];
//   const items = result[i][1];
//   row++;
//   console.log(row, category);

//   // eslint-disable-next-line no-loop-func
//   items.map((item) => {
//     row += 1;
//     return console.log(row, item.name, item.price);
//   });
// }

// const result = categories.map((category) => Object.keys(category));
// console.log(result);
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
