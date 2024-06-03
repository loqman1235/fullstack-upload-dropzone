// const promise = new Promise(
//   (res) => {
//     setTimeout(() => {
//       res("hello");
//     }, 5000);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// (async () => {
//   try {
//     const val = await new Promise((res) => {
//       setTimeout(() => console.log("Hello"), 5000);
//     });
//     console.log(val);
//   } catch (error) {
//     console.log(error);
//   }
// })();

import fs from "fs";

const readFileAsync = async (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

readFileAsync("package.json")
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err));
