localStorage.setItem(
  "test",
  JSON.stringify([
    {
      id: 1,
      name: "Hello",
    },
  ])
); // stored as the '123' string
console.log(localStorage.getItem("test"));
console.log(JSON.parse(localStorage.getItem("test")));
