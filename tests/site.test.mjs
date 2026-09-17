import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateSite } from "../scripts/validate-site.mjs";

const testsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(testsDirectory, "..");
const publicDirectory = path.join(projectDirectory, "public");
const readPublic = (relative) => fs.readFileSync(path.join(publicDirectory, relative), "utf8");

const index = readPublic("index.html");
const product = readPublic("product/index.html");
const sap = readPublic("sap-delivery/index.html");
const resources = readPublic("resources/index.html");
const privacy = readPublic("privacy/index.html");
const config = readPublic("assets/js/site-config.js");
const mainJavaScript = readPublic("assets/js/main.js");
const fiveWhysJavaScript = readPublic("assets/js/five-whys.js");
const globalCss = readPublic("assets/css/styles.css");
const fiveWhysCss = readPublic("assets/css/five-whys.css");
const checklist = readPublic("evaluation-checklist.txt");
const firebase = fs.readFileSync(path.join(projectDirectory, "firebase.json"), "utf8");
const publicPages = [index, product, sap, resources, privacy].join("\n");

test("static validation reports no structural, safety or route errors", () => {
  const result = validateSite();
  assert.deepEqual(result.errors, []);
  assert.equal(result.htmlCount, 6);
  assert.ok(result.homepageWords >= 1200 && result.homepageWords <= 1500);
});

test("the hero and five buyer questions build a complete buying argument", () => {
  assert.match(index, /Project control for SAP programmes &amp; complex delivery/);
  assert.match(index, /Know what needs your attention[\s\S]*And why\./);
  assert.match(index, /Connect delivery, progress, evidence, cost and risk/);
  assert.match(index, /See how it works/);
  assert.match(index, /Watch overview/);

  for (const headline of [
    /A status update is not[\s\S]*a decision you can defend\./,
    /Keep what works[\s\S]*Test what falls between it\./,
    /Don’t stop at the flag[\s\S]*Follow it to the next decision\./,
    /Show the working[\s\S]*Not just the colour\./,
    /Before the next big commitment[\s\S]*test one decision\./,
  ]) assert.match(index, headline);

  for (const sectionId of ["why-change", "why-tools", "why-mantiva", "why-trust", "why-now"]) {
    assert.match(index, new RegExp(`id="${sectionId}"`));
  }
});

test("each buyer question includes proof and a relevant next action", () => {
  assert.match(index, /An illustrative reporting conflict/);
  assert.match(index, />On track</);
  assert.match(index, />Not confirmed</);
  assert.match(index, />Needs review</);
  assert.match(index, /Illustrative scenario, not a product capture or customer result/);
  assert.match(index, /operating-model comparison, not a native-integration map/i);
  assert.match(index, /Follow a signal back to its source/);
  assert.match(index, /Explore four views from the actual product/);
  assert.match(index, /Explore SAP alignment/);
  assert.match(index, /Download evaluation checklist/);
});

test("review metadata is noindex while canonical launch metadata remains prepared", () => {
  assert.match(index, /<meta name="robots" content="noindex,nofollow">/);
  assert.match(index, /<link rel="canonical" href="https:\/\/mantiva360\.com\/">/);
  assert.match(index, /<meta property="og:url" content="https:\/\/mantiva360\.com\/">/);
  assert.match(index, /<meta property="og:image" content="https:\/\/mantiva360\.com\/assets\/images\/mantiva360-social-v1\.png">/);
});

test("the approved Option 7 identity and executive palette are reused", () => {
  assert.match(index, /assets\/brand\/mantiva360-full-light\.svg/);
  assert.doesNotMatch(index, /<svg\b/i);
  assert.match(index, /Data to Progress\./);
  assert.match(fiveWhysCss, /--ink:#0b2239/i);
  assert.match(fiveWhysCss, /--teal:#087878/i);
  assert.match(fiveWhysCss, /--paper:#fff/i);
  assert.match(globalCss, /--brand-green:\s*#62b44b/i);
});

test("key text and focus colours meet their contrast targets", () => {
  const luminance = (hex) => {
    const channels = hex.match(/\w\w/g).map((value) => Number.parseInt(value, 16) / 255);
    const [red, green, blue] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const contrast = (foreground, background) => {
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  for (const pair of [["0b2239", "ffffff"], ["526575", "ffffff"], ["087878", "ffffff"], ["ffffff", "0b2239"]]) {
    assert.ok(contrast(...pair) >= 4.5);
  }
  assert.ok(contrast("1268b3", "ffffff") >= 4.5);
});

test("homepage product proof uses unchanged genuine captures with mobile art direction", () => {
  const captures = [
    "cockpit-context-v2.webp",
    "cockpit-mobile-v2.webp",
    "cockpit-finding-v2.webp",
    "cockpit-finding-mobile-v2.webp",
    "cockpit-recovery-v2.webp",
    "delivery-context-v2.webp",
    "delivery-mobile-v2.webp",
  ];
  for (const capture of captures) {
    assert.equal(fs.existsSync(path.join(publicDirectory, "assets/images", capture)), true);
    assert.match(index, new RegExp(capture.replace(".", "\\.")));
  }
  assert.doesNotMatch(index, /option2-/i);
  assert.match(index, /Actual product capture/);
  assert.match(index, /Displayed values and status have not been rewritten/);
  assert.match(product, /option2-delivery-plan\.svg/);
});

test("Attention, Cause, Action and Impact tabs are user controlled and keyboard operable", () => {
  assert.equal((index.match(/role="tab"/g) ?? []).length, 4);
  assert.equal((index.match(/role="tabpanel"/g) ?? []).length, 4);
  for (const label of ["Attention", "Cause", "Action", "Impact"]) assert.match(index, new RegExp(`<span>${label}</span>`));
  for (const key of ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"]) {
    assert.match(fiveWhysJavaScript, new RegExp(`event\\.key === "${key}"`));
  }
  assert.doesNotMatch(fiveWhysJavaScript, /setInterval|autoRotate|autoplayTabs/i);
});

test("video remains click-to-load, privacy enhanced and removable on close", () => {
  assert.doesNotMatch(publicPages, /<iframe\b/i);
  assert.match(config, /overviewVideoId:\s*"XMQa-RB5fUU"/);
  assert.match(fiveWhysJavaScript, /loadVideo\?\.addEventListener\("click"/);
  assert.match(fiveWhysJavaScript, /youtube-nocookie\.com\/embed/);
  assert.match(fiveWhysJavaScript, /querySelector\("iframe"\)\?\.remove\(\)/);
  assert.match(fiveWhysJavaScript, /videoOpener\?\.focus\(\)/);
  assert.match(index, /Captions and a verified transcript for the existing video still need review/);
  assert.match(firebase, /frame-src https:\/\/www\.youtube-nocookie\.com/);
  assert.doesNotMatch(firebase, /unsafe-inline/);
});

test("calculation, evidence, progress and authorised-action boundaries remain explicit", () => {
  assert.match(index, /The configured control method governs progress recognition/);
  assert.match(index, /Time, cost or an evidence upload does not automatically create earned progress/);
  assert.match(index, /Supporting evidence, actual effort and cost have distinct roles/);
  assert.match(index, /underlying condition must be resolved before the finding can close/);
  assert.match(index, /Deterministic controls calculate the results/);
  assert.match(index, /Read-only assistance helps authorised users interpret permitted records/);
  assert.match(index, /Your authorised team remains responsible for the response/);
  assert.doesNotMatch(publicPages, /single source of truth|zero setup|guaranteed outcomes|autonomous remediation/i);
});

test("SAP delivery explains phase context without borrowed credibility", () => {
  for (const phase of ["Discover", "Prepare", "Explore", "Realize", "Deploy", "Run"]) assert.match(index, new RegExp(`>${phase}<`));
  assert.match(index, /alignment does not imply SAP endorsement, certification or native integration/i);
  assert.match(sap, /Methodology alignment is distinct from SAP endorsement, certification, partnership or a native integration/);
  assert.doesNotMatch(sap, /<img[^>]+sap/i);
});

test("conversion remains honest while the enquiry route is unverified", () => {
  assert.match(config, /enabled:\s*false/);
  assert.match(config, /endpoint:\s*""/);
  assert.doesNotMatch(publicPages, /<form\b/i);
  assert.doesNotMatch(publicPages, /Request a guided review/i);
  assert.match(index, /this page does not submit or collect contact details/i);
  assert.doesNotMatch(publicPages, /Start free trial|No sign-up required|instant-access demo/i);
  assert.match(checklist, /does not submit an enquiry, create a booking or imply an offer/i);
  assert.match(checklist, /Traceability:/);
  assert.match(checklist, /Actionability:/);
  assert.match(checklist, /Effort:/);
  assert.match(checklist, /Governance:/);
});

test("application and media destinations are centrally configured", () => {
  assert.match(config, /demoUrl:\s*"https:\/\/mantiva360\.app\/"/);
  assert.match(config, /overviewVideoId:\s*"XMQa-RB5fUU"/);
  assert.match(fiveWhysJavaScript, /link\.href = siteConfig\.demoUrl/);
  assert.match(fiveWhysJavaScript, /const overviewVideoId = siteConfig\.overviewVideoId/);

  const destinations = [...publicPages.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>Get started\b/g)].map((match) => match[1]);
  assert.ok(destinations.length >= 8);
  assert.ok(destinations.every((destination) => destination === "https://mantiva360.app/"));
  assert.doesNotMatch(publicPages, /mantiva360\.app\/(?:login|demo|project)/i);
});

test("deep routes, legacy anchors and checklist destination remain intact", () => {
  for (const page of ["product/index.html", "sap-delivery/index.html", "resources/index.html", "privacy/index.html", "evaluation-checklist.txt"]) {
    assert.equal(fs.existsSync(path.join(publicDirectory, page)), true);
  }
  assert.match(index, /id="how-it-works"/);
  assert.match(index, /id="guided-review"/);
  assert.match(index, /href="\/product"/);
  assert.match(index, /href="\/sap-delivery"/);
  assert.match(index, /href="\/resources"/);
  assert.match(index, /href="\/privacy"/);
  assert.match(index, /download="Mantiva360-evaluation-checklist\.txt"/);
});

test("responsive, reduced-motion and no-tracking defaults are retained", () => {
  for (const width of ["1050px", "820px", "540px"]) assert.match(fiveWhysCss, new RegExp(`max-width:${width.replace(".", "\\.")}`));
  assert.match(fiveWhysCss, /prefers-reduced-motion:reduce/);
  assert.match(fiveWhysCss, /focus-visible/);
  assert.doesNotMatch(fiveWhysJavaScript, /dataLayer|analytics|fetch\(/i);
  assert.match(mainJavaScript, /result\.saved !== true/);
  assert.doesNotMatch(mainJavaScript, /track\([^)]*payload/);
});
