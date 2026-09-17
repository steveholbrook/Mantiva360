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
  assert.match(index, /Watch overview/);
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
  assert.match(index, /data-review-form hidden/);
  assert.match(index, /does not collect or send contact details/i);
  assert.match(javascript, /reviewForm\.hidden = false/);
});

test("market and SAP claims preserve the intended boundaries", () => {
  assert.match(index, /Keep the execution tools/);
  assert.match(index, /do not imply live native connectors/);
  assert.match(index, /native Cloud ALM or LeanIX integration are not claimed/);
  assert.match(index, /Actual effort or cost does not automatically create earned progress/);
});

test("the selected Executive Confidence concept is white-led and evidence-first", () => {
  const css = fs.readFileSync(path.join(publicDirectory, "assets/css/styles.css"), "utf8");
  assert.match(index, /Know what needs your attention\.\s*<span>And why\.<\/span>/);
  assert.match(index, /focus-lens-viewport focus-lens-hero/);
  assert.match(index, /Product evidence/);
  assert.match(css, /\.focus-lens-marker/);
  assert.match(css, /\.hero\s*\{[^}]*background:\s*#fff/s);
});

test("the selected media system is focused, coherent and free of demo-company references", () => {
  const css = fs.readFileSync(path.join(publicDirectory, "assets/css/styles.css"), "utf8");
  assert.doesNotMatch(index, new RegExp(["gold", "\\s*2"].join(""), "i"));
  const retiredPoster = ["gold", "2-video-poster-v1.webp"].join("");
  assert.equal(fs.existsSync(path.join(publicDirectory, "assets/images", retiredPoster)), false);
  assert.match(index, /One focal question/);
  assert.doesNotMatch(index, /View full screenshot/i);
  assert.match(index, /<strong>Signal<\/strong>[\s\S]*<strong>Source<\/strong>[\s\S]*<strong>Action<\/strong>/);
  assert.match(index, /All three frames come from the same captured reporting state/);

  const posters = index.match(/class="cinematic-poster\s/g) ?? [];
  assert.equal(posters.length, 3);
  assert.match(index, /<span class="cinematic-headline">See what needs attention\.<\/span>/);
  assert.match(index, /<span class="cinematic-action"><span aria-hidden="true">▶<\/span> Watch overview<\/span>/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.cinematic-secondary-grid\s*\{\s*grid-template-columns:\s*1fr;/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.decision-story-grid\s*\{\s*grid-template-columns:\s*1fr;/);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.focus-lens-hero\s*\{\s*aspect-ratio:\s*4 \/ 3;/);
});

test("video handling exposes known accessibility limits and restores focus", () => {
  const javascript = fs.readFileSync(path.join(publicDirectory, "assets/js/main.js"), "utf8");
  assert.match(index, /accurate captions or verified transcripts are required/i);
  assert.match(index, /public-launch accessibility blocker/i);
  assert.match(javascript, /videoOpener\.focus\(\)/);
  assert.doesNotMatch(index, /<iframe/i);
});

test("public buyer navigation does not promote the source repository", () => {
  assert.doesNotMatch(index, /Website source/);
  assert.doesNotMatch(index, /github\.com\/steveholbrook\/Mantiva360/);
});
