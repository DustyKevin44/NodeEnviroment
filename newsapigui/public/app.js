const form = document.getElementById("form");
const qInput = document.getElementById("q");
const sortBy = document.getElementById("sortBy");
const button = form.querySelector("button");
const statusEl = document.getElementById("status");
const results = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = qInput.value.trim();
  if (!q) return;

  button.disabled = true;
  statusEl.textContent = "Searching...";
  results.innerHTML = "";

  try {
    const params = new URLSearchParams({ q, sortBy: sortBy.value });
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Request failed");

    if (data.articles.length === 0) {
      statusEl.textContent = "No articles found. Try different words.";
      return;
    }

    statusEl.textContent = `${data.totalResults} results, showing ${data.articles.length}`;
    data.articles.forEach((a) => results.append(renderArticle(a)));
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
  } finally {
    button.disabled = false; // runs on success, error, and early return
  }
});

function renderArticle(a) {
  const card = document.createElement("article");

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = a.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = a.title;
  title.append(link);

  const meta = document.createElement("div");
  meta.className = "meta";
  const date = new Date(a.publishedAt).toLocaleDateString();
  meta.textContent = `${a.source.name}, ${date}`;

  card.append(title, meta);

  if (a.description) {
    const p = document.createElement("p");
    p.textContent = a.description;
    card.append(p);
  }
  return card;
}