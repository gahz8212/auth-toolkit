const member = [
  { id: 1, name: "kim", age: 13 },
  { id: 2, name: "lee", age: 13 },
  { id: 3, name: "park", age: 13 },
];
const userImages = [
  { id: 1, url: ["image-1", "image-2"] },
  { id: 3, url: ["image-3", "image-4"] },
];
const result =
member.map((user) => 
 userImages.map((image) =>{
    if (image && user.id === image.id) {
      return { id: user.id, url: image.url };
    }
  })
);
console.log(result);
