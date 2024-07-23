const array = [
  { id: 1, name: "kim nam jin", age: 49 },
  { id: 2, name: "choi mi ri", age: 49 },
  { id: 3, name: "lee jun", age: 49 },
  { id: 4, name: "park min young", age: 49 },
];
const result = array.map((arr) => arr.name.match(/kim/));
console.log(result[0].index);
