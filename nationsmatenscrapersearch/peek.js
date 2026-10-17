const fs = require("fs");

const [file, term, before = 10, after = 25] = process.argv.slice(2);

if (!file || !term) {
  console.log("Usage: node peek.js <file> <search term> [linesBefore] [linesAfter]");
  process.exit(1);
}

// Put each tag on its own line so the output is readable
const html = fs.readFileSync(file, "utf8").replace(/></g, ">\n<");
const lines = html.split("\n");

const i = lines.findIndex((l) => l.toLowerCase().includes(term.toLowerCase()));
if (i === -1) {
  console.log(`"${term}" not found in ${file}`);
  process.exit(1);
}

const start = Math.max(0, i - Number(before));
const end = Math.min(lines.length, i + Number(after));
console.log(lines.slice(start, end).join("\n"));