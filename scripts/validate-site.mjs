import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const publicDirectory = path.join(projectDirectory, "public");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function localTargetExists(reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean || clean.startsWith("#") || /^[a-z]+:/i.test(clean) || clean.startsWith("//")) return true;
  const target = path.resolve(publicDirectory, clean.replace(/^\//, ""));
  if (!target.startsWith(publicDirectory)) return false;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true;
  if (clean.endsWith("/") && fs.existsSync(path.join(target, "index.html"))) return true;
  if (!path.extname(target) && fs.existsSync(`${target}.html`)) return true;
  return false;
}

export function validateSite() {
  const errors = [];
  const files = walk(publicDirectory);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const relative = path.relative(projectDirectory, file);
    const html = fs.readFileSync(file, "utf8");

    if (!/<html\s+lang="en-AU"/i.test(html)) errors.push(`${relative}: missing en-AU language`);
    if (!/<meta\s+name="viewport"/i.test(html)) errors.push(`${relative}: missing viewport metadata`);
    if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${relative}: missing title`);
    if (!/<h1[\s>]/i.test(html)) errors.push(`${relative}: missing h1`);
    if (/\sstyle=/i.test(html)) errors.push(`${relative}: inline styles conflict with the Content Security Policy`);
    if (/<script(?![^>]*\bsrc=)/i.test(html)) errors.push(`${relative}: inline scripts conflict with the Content Security Policy`);

    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    if (duplicateIds.length) errors.push(`${relative}: duplicate IDs ${duplicateIds.join(", ")}`);

    for (const match of html.matchAll(/<(?:img|script|link|a)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/gi)) {
      const reference = match[1];
      if (!localTargetExists(reference)) errors.push(`${relative}: missing local target ${reference}`);
    }

    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      if (!/\salt="[^"]*"/i.test(tag)) errors.push(`${relative}: image missing alt attribute`);
      if (!/\swidth="\d+"/i.test(tag) || !/\sheight="\d+"/i.test(tag)) errors.push(`${relative}: image missing intrinsic dimensions`);
    }

    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)) {
      if (!/\brel="[^"]*noopener[^"]*"/i.test(match[0])) errors.push(`${relative}: target=_blank link missing noopener`);
    }
  }

  const publicText = files
    .filter((file) => /\.(?:html|css|js|xml|txt|webmanifest)$/i.test(file))
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");

  const forbidden = [
    ["steholbrook@gmail.com", "personal email address"],
    ["100% truth", "absolute truth claim"],
    ["zero administration", "unsupported administration claim"],
    ["no setup required", "unsupported setup claim"],
    ["SAP certified", "unsupported SAP certification claim"],
    ["SAP partner", "unsupported SAP partnership claim"],
  ];
  forbidden.forEach(([phrase, label]) => {
    if (publicText.toLowerCase().includes(phrase.toLowerCase())) errors.push(`Public content contains ${label}: ${phrase}`);
  });

  const firebase = JSON.parse(fs.readFileSync(path.join(projectDirectory, "firebase.json"), "utf8"));
  if (firebase.hosting?.public !== "public") errors.push("firebase.json must publish only the public directory");
  const securityHeaders = firebase.hosting?.headers?.[0]?.headers ?? [];
  const headerKeys = new Set(securityHeaders.map((item) => item.key));
  ["Content-Security-Policy", "Referrer-Policy", "X-Content-Type-Options", "Strict-Transport-Security"].forEach((key) => {
    if (!headerKeys.has(key)) errors.push(`firebase.json missing ${key}`);
  });

  const config = fs.readFileSync(path.join(publicDirectory, "assets/js/site-config.js"), "utf8");
  const index = fs.readFileSync(path.join(publicDirectory, "index.html"), "utf8");
  ["XMQa-RB5fUU", "QkCRdrASlAg", "wEgHPeHhb7I"].forEach((videoId) => {
    if (!config.includes(videoId)) errors.push(`site config missing video ${videoId}`);
  });
  if (!config.includes('demoUrl: "https://mantiva360.app/"')) errors.push("site config has the wrong demo destination");
  if (!config.includes("enabled: false")) errors.push("enquiry handling must remain disabled until an endpoint is verified");
  if (!/data-review-form\s+hidden/i.test(index)) errors.push("the inactive enquiry form must remain hidden while submission is disabled");
  if (!/data-review-unavailable/i.test(index)) errors.push("the disabled enquiry state must be visible and explicit");
  if (/<iframe\b/i.test(index)) errors.push("video iframes must not be present before a visitor chooses to play");
  if (/Website source/i.test(index)) errors.push("the source repository must not appear as primary buyer navigation");

  return { errors, fileCount: files.length, htmlCount: htmlFiles.length };
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  const result = validateSite();
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(`Validated ${result.fileCount} public files across ${result.htmlCount} HTML pages.`);
  }
}
