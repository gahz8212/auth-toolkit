let extraTop = 0;
for (let i = 0; i < 20; i++) {
  const extraLeft = i % 3;
  if (extraLeft === 0) {
    extraTop += 1;
  }
  console.log(extraLeft, extraTop);
}
