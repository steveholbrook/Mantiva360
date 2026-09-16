import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateSite } from "../scripts/validate-site.mjs";

const testsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(testsDirectory, "..");
const publicDirectory = path.join(projectDirectory, "public");
const index = fs.readFileSync(path.join(publicDirectory, "index.html"), "utf8");
const config = fs.readFileSync(path.join(publicDirectory, "assets/js/site-config.js"), "utf8");

test("static site validation reports no structural errors", () => {
  const result = validateSite();
  assert.deepEqual(result.errors, []);
});

test("the three conversion actions remain distinct", () => {
  assert.match(index, />\s*Explore demo\s*</);
  assert.match(index, /Watch short overview/);
  assert.match(index, /Request a guided review/);
});

test("the homepage uses the canonical Mantiva360 identity and destination", () => {
  assert.match(index, /Mantiva360/);
  assert.match(index, /Data to Progress/);
  assert.match(config, /https:\/\/mantiva360\.app\//);
  assert.doesNotMatch(index, /PTracker2/i);
});

test("video embeds use the supplied YouTube IDs and privacy-enhanced host", () => {
  for (const id of ["XMQa-RB5fUU", "QkCRdrASlAg", "wEgHPeHhb7I"]) assert.match(config, new RegExp(id));
  const javascript = fs.readFileSync(path.join(publicDirectory, "assets/js/main.js"), "utf8");
  assert.match(javascript, /youtube-nocookie\.com\/embed/);
});

test("enquiry success is impossible until a real endpoint is enabled", () => {
  assert.match(config, /enabled:\s*false/);
  assert.match(config, /endpoint:\s*""/);
  const javascript = fs.readFileSync(path.join(publicDirectory, "assets/js/main.js"), "utf8");
  assert.match(javascript, /result\.saved !== true/);
  assert.match(javascript, /your details were not sent/i);
});

test("market and SAP claims preserve the intended boundaries", () => {
  assert.match(index, /Keep the execution tools/);
  assert.match(index, /Native integrations are not implied/);
  assert.match(index, /No SAP endorsement, certification or native Cloud ALM integration is claimed/);
  assert.match(index, /Actual effort or cost does not automatically create earned progress/);
});
