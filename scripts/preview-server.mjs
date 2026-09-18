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
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
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

const server = http.createServer((request, response) => {
  try {
    const file = resolveRequestPath(request.url || "/");
    const notFound = file.endsWith(`${path.sep}404.html`) && request.url !== "/404.html";
    response.writeHead(notFound ? 404 : 200, {
      "Cache-Control": "no-store",
      "Content-Type": contentTypes.get(path.extname(file)) || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    fs.createReadStream(file).pipe(response);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Preview server error");
  }
});

server.listen(port, host, () => {
  console.log(`Mantiva360 preview listening on ${host}:${port}`);
});
