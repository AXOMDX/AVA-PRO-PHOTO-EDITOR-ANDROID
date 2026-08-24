const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let requestPath = decodeURIComponent(req.url.split("?")[0]);

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  // Prevent directory traversal
  const safePath = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(ROOT, safePath);

  fs.readFile(filePath, (error, data) => {
    if (error) {
      // SPA fallback
      fs.readFile(path.join(ROOT, "index.html"), (fallbackError, fallbackData) => {
        if (fallbackError) {
          res.writeHead(500, {
            "Content-Type": "text/plain"
          });
          res.end("Ava Pro server error");
          return;
        }

        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8"
        });

        res.end(fallbackData);
      });

      return;
    }

    const ext = path.extname(filePath).toLowerCase();

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });

    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Ava Pro is running on port ${PORT}`);
});
