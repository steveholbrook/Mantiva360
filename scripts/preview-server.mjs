import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(scriptDirectory, "../public");
const args = process.argv.slice(2);

function argumentValue(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

const host = argumentValue("--host", "127.0.0.1");
const port = Number(argumentValue("--port", "4173"));

const contentTypes = new Map([
  [".mp4", "video/mp4"],
  [".vtt", "text/vtt; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveRequestPath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const candidates = relative
    ? [relative, `${relative}.html`, path.join(relative, "index.html")]
    : ["index.html"];

  for (const candidate of candidates) {
    const resolved = path.resolve(publicDirectory, candidate);
    if (!resolved.startsWith(`${publicDirectory}${path.sep}`) && resolved !== publicDirectory) continue;
    if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) return resolved;
  }

  return path.join(publicDirectory, "404.html");
}

const firebase = JSON.parse(fs.readFileSync(path.resolve(scriptDirectory, "../firebase.json"), "utf8"));
const securityHeaders = Object.fromEntries(firebase.hosting.headers[0].headers.map(({ key, value }) => [key, value]));
// Match Firebase security policy locally; browsers ignore HTTPS upgrade on localhost.
const server = http.createServer((request, response) => {
  try {
    const file = resolveRequestPath(request.url || "/");
    const notFound = file.endsWith(`${path.sep}404.html`) && request.url !== "/404.html";
    const size = fs.statSync(file).size;
    const headers = { ...securityHeaders, "Cache-Control": "no-store",
      "Content-Type": contentTypes.get(path.extname(file)) || "application/octet-stream",
      "Accept-Ranges": "bytes" };
    const range = request.headers.range;
    let start = 0, end = size - 1, status = notFound ? 404 : 200;
    if (range && !notFound) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (match) {
        if (!match[1] && match[2]) start = Math.max(0, size - Number(match[2]));
        else { start = Number(match[1]); end = match[2] ? Math.min(Number(match[2]), size - 1) : end; }
      }
      if (!match || (!match[1] && !match[2]) || start >= size || start > end) {
        response.writeHead(416, { ...headers, "Content-Range": `bytes */${size}` });
        response.end(); return;
      }
      status = 206; headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
    }
    response.writeHead(status, { ...headers, "Content-Length": end - start + 1 });
    if (request.method === "HEAD") response.end();
    else fs.createReadStream(file, { start, end }).pipe(response);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Preview server error");
  }
});

server.listen(port, host, () => {
  console.log(`Mantiva360 preview listening on ${host}:${port}`);
});
