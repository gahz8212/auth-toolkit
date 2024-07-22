let prev = { type: 1, category: 1, name: -1 };
let next = { type: 1, category: 1, name: -1 };
let array = ["type", "category", "name"];
let i = 1;

const func = (arr) => {
  if (i < 4) {
    if (prev[arr] === next[arr]) {
      return func(array[i++]);
    } else {
      return prev[arr] + next[arr];
    }
  } else {
    return 0;
  }
};
const result = func("type");
console.log(result);
