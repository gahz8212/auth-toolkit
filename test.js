const length = [3, 1, 2, 0, 1];
const arrs = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 0 }];
const result = arrs.sort((a,b) => length[a.a]-length[b.a])
console.log(result);

// const length=[3,1,2,0,1]
// const arrs = [{a:1}, {a:2}, {a:3}, {a:4}, {a:5}].sort((a,b)=>b.a-a.a);
// console.log(arrs)
