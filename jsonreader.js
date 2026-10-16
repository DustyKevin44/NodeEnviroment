const fs = require("node:fs");
const { argv } = require('node:process');
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
const filename = argv[2];

if (!filename) {
  console.error("Användning: node script.js <fil.json>");
  process.exit(1);
}
try{
var textfile = fs.readFileSync(filename, "utf-8");

}catch{
    console.log("File could not be read");
}
try{
var parsed = JSON.parse(textfile);
console.log(parsed);
}catch{
    console.log("File could not be parsed.");
}


for (const key in parsed) {
  console.log(`${key}: ${parsed[key]}`);
}

