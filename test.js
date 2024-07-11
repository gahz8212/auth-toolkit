const objs = [
  { id: 1, value: 100 },
  { id: 2, value: 100 },
  { id: 3, value: 100 },
  { id: 1, value: 100 },
  { id: 2, value: 100 },
  { id: 1, value: 100 },
  { id: 1, value: 100 },
  { id: 1, value: 100 },

  { id: 1, value: 100 },
];
const result = objs.reduce((acc, curr) => {
  if (acc[curr.id]) {
    acc[curr.id] += curr.value;
  } else {
    acc[curr.id] = curr.value;
  }
  return acc;
}, {});
console.log(result);
