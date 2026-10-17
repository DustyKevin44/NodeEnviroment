const API_KEY = process.env.NEWS_API_KEY; // get one at https://newsapi.org/register
const { argv } = require('node:process');
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
const query = argv[2];

async function getTopHeadlines() {
 const params = new URLSearchParams({
  q: query,
  language: "en",
  sortBy: "publishedAt",
  pageSize: "10",
});
const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
  headers: { "X-Api-Key": API_KEY },
});

  const data = await res.json();

  if (!res.ok || data.status !== "ok") {
    throw new Error(`NewsAPI error: ${data.code} - ${data.message}`);
  }

  return data.articles;
}

getTopHeadlines()
  .then((articles) => {
    articles.forEach((a, i) => {
      console.log(`${i + 1}. ${a.title}\n   ${a.source.name} - ${a.url}\n`);
    });
  })
  .catch(console.error);

