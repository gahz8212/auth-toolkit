let prev = { type: 1, category: 1, name: -1 };
let next = { type: 1, category: 0, name: 0 };
let array = ["type", "category", "name"];
let i = 1;

const func = (arr) => {
  if (prev[arr] === next[arr]) {
    return func(array[i++]);
  } else {
    return prev[arr] + next[arr];
  }
};
const result = func("type");
console.log(result);
