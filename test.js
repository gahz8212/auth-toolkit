const arrs1 = [
  { id: 1, name: "kim", age: 40 },
  { id: 2, name: "lee", age: 30 },
  { id: 3, name: "park", age: 32 },
  { id: 4, name: "choi", age: 43 },
  { id: 5, name: "yoon", age: 41 },
  { id: 6, name: "song", age: 45 },
];
const arrs2 = [
  { UpperId: 5, point: 3 },
  { UpperId: 6, point: 2 },
  { UpperId: 3, point: 5 },
  { UpperId: 4, point: 0 },
];
let newArray = [];
arrs1.map((arr1) =>
  arrs2.map((arr2) => {
    if (arr2.UpperId === arr1.id) {
      newArray.push({
        id: arr1.id,
        name: arr1.name,
        age: arr1.age,
        point: arr2.point,
      });
      return newArray;
    } else {
      return null;
    }
  })
);
console.log(newArray);
