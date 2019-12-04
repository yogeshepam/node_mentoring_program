const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Input the string you wish to reverse ", string =>
  reverseString(string)
);

rl.on("line", string => reverseString(string));

const reverseString = string => {
  const reversedString = string
    .split("")
    .reverse()
    .join("");

  console.log(reversedString);
  console.log("To exit use ctrl c, else input more:");
};