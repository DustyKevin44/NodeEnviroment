const http = require("http");
const fs = require("fs");
const path = require("path");

const API_KEY = process.env.NEWS_API_KEY;
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const SORT_OPTIONS = ["publishedAt", "relevancy", "popularity"];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
};

if (!API_KEY) {
  console.error("Missing NEWS_API_KEY environment variable.");
  process.exit(1);
}

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function serveStatic(res, pathname) {
  const file = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(PUBLIC_DIR, file);

  // Block paths like /../server.js from escaping the public folder
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const type = MIME_TYPES[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // API route: /api/search?q=...&sortBy=...
  if (url.pathname === "/api/search") {
    const q = url.searchParams.get("q");
    if (!q) return sendJson(res, 400, { message: "Missing ?q= parameter" });

    const sortBy = SORT_OPTIONS.includes(url.searchParams.get("sortBy"))
      ? url.searchParams.get("sortBy")
      : "publishedAt";

    const params = new URLSearchParams({ q, sortBy, language: "en", pageSize: "10" });

    try {
      const upstream = await fetch(`https://newsapi.org/v2/everything?${params}`, {
        headers: { "X-Api-Key": API_KEY },
      });
      const data = await upstream.json();
      return sendJson(res, upstream.status, data);
    } catch (err) {
      return sendJson(res, 502, { message: "Could not reach NewsAPI" });
    }
  }

  // Everything else: try to serve a file from /public
  return serveStatic(res, url.pathname);
});

server.listen(PORT, () => console.log(`Open http://localhost:${PORT}`));