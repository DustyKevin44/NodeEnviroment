const fs = require("fs");

const BASE = "https://nationsmaten.se";
const PAGES = {
  home: "/",
  calendar: "/kalender",
  uplands: "/nation/uplands",
};

async function main() {
  fs.mkdirSync("raw", { recursive: true });

  for (const [name, path] of Object.entries(PAGES)) {
    const res = await fetch(BASE + path, {
      headers: { "User-Agent": "nationsmaten-search-dev (own site)" },
    });
    const html = await res.text();
    fs.writeFileSync(`raw/${name}.html`, html);
    console.log(`${name}: HTTP ${res.status}, ${html.length} characters`);
  }
}

main().catch(console.error);