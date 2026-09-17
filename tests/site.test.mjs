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
const javascript = readPublic("assets/js/main.js");
const css = readPublic("assets/css/styles.css");

test("static validation reports no structural, safety or route errors", () => {
  const result = validateSite();
  assert.deepEqual(result.errors, []);
  assert.equal(result.htmlCount, 6);
  assert.ok(result.homepageWords >= 900 && result.homepageWords <= 1200);
});

test("the product-led buyer journey and evaluation paths are explicit", () => {
  assert.match(index, /Turn project data into\s*<span>decision confidence\.<\/span>/);
  assert.match(index, /Recognise my problem|From reporting effort to decision confidence/);
  assert.match(index, /Where is delivery moving off plan\?/);
  assert.match(index, /Why is it off track\?/);
  assert.match(index, /What should we do\?/);
  assert.match(index, /Solution Design crosses Today|Solution Design activity crossing the Today marker/);
  assert.match(index, />Get started\s*<span/);
  assert.match(index, /Watch overview/);
  assert.match(index, /button button-primary button-large button-app/);
  assert.match(index, /button button-secondary button-large/);
  assert.match(javascript, /url\.hash === ""/);
});

test("the canonical identity, palette and type system are centralised", () => {
  assert.match(index, /Data to Progress\./);
  assert.match(css, /--brand-navy:\s*#0b2239/i);
  assert.match(css, /--brand-blue:\s*#1268b3/i);
  assert.match(css, /--brand-teal:\s*#139a9a/i);
  assert.match(css, /--brand-green:\s*#62b44b/i);
  assert.match(css, /--page:\s*#f7f9fb/i);
  assert.match(css, /font-family:\s*Inter,/i);
  assert.doesNotMatch(css, /glassmorphism|purple|particle/i);
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

  for (const pair of [["172536", "ffffff"], ["5b6d7e", "ffffff"], ["1268b3", "ffffff"], ["ffffff", "0b2239"], ["b6cad7", "071a2c"], ["1268b3", "eaf4fa"]]) {
    assert.ok(contrast(...pair) >= 4.5);
  }
  assert.ok(contrast("1c827e", "0b2239") >= 3);
  assert.ok(contrast("1c827e", "ffffff") >= 3);
});

test("product proof uses the approved Option 02 promotional renderings", () => {
  const assets = ["option2-delivery-plan.svg", "option2-signal-source.svg", "option2-governed-response.svg", "option2-delivery-plan-mobile.svg", "option2-signal-source-mobile.svg", "option2-governed-response-mobile.svg"];
  for (const asset of assets) {
    assert.equal(fs.existsSync(path.join(publicDirectory, "assets/images", asset)), true);
  }
  for (const asset of ["cockpit-red-v1.webp", "delivery-plan-v1.webp"]) {
    assert.equal(fs.existsSync(path.join(publicDirectory, "assets/images", asset)), false);
  }
  const renderedScreens = assets.map((asset) => readPublic(`assets/images/${asset}`)).join("\n");
  assert.doesNotMatch([index, product, sap, resources, renderedScreens].join("\n"), /ptracker|gold2/i);
  assert.match(index, /Promotional rendering based on the live Mantiva360 interface/);
  assert.match(index, /<source media="\(max-width: 720px\)" srcset="\/assets\/images\/option2-delivery-plan-mobile\.svg"/);
  assert.match(index, /<source media="\(max-width: 720px\)" srcset="\/assets\/images\/option2-signal-source-mobile\.svg"/);
  assert.match(index, /<source media="\(max-width: 720px\)" srcset="\/assets\/images\/option2-governed-response-mobile\.svg"/);
  assert.match(product, /Promotional rendering based on the live interface/i);
});

test("the question-led product panorama is user controlled and keyboard operable", () => {
  assert.equal((index.match(/role="tab"/g) ?? []).length, 3);
  assert.equal((index.match(/role="tabpanel"/g) ?? []).length, 3);
  assert.match(index, /class="question-tabs" role="tablist"/);
  assert.match(index, /id="product-experience"[^>]*data-tabs/);
  assert.match(javascript, /ArrowRight/);
  assert.match(javascript, /ArrowLeft/);
  assert.match(javascript, /event\.key === "Home"/);
  assert.match(javascript, /event\.key === "End"/);
  assert.doesNotMatch(javascript, /setInterval|autoRotate|autoplayTabs/i);
});

test("video posters carry one title, one action and a verified runtime", () => {
  assert.equal((resources.match(/class="video-poster"/g) ?? []).length, 3);
  assert.match(resources, /See the bigger picture\./);
  assert.match(resources, /From issue to action\./);
  assert.match(resources, /Project control for SAP\./);
  for (const runtime of ["0:31", "1:30", "0:30"]) assert.match(resources, new RegExp(runtime.replace(":", "\\:")));
  assert.equal((resources.match(/> Watch overview<\/span>/g) ?? []).length, 3);
  assert.doesNotMatch([index, product, sap, resources].join("\n"), /<iframe\b/i);
  assert.match(javascript, /youtube-nocookie\.com\/embed/);
  assert.match(javascript, /videoTrigger\?\.focus\(\)/);
  assert.match(javascript, /videoEmbed\.replaceChildren\(\)/);
});

test("product claims preserve calculation and assistant boundaries", () => {
  assert.match(product, /configured control method governs progress recognition/i);
  assert.match(product, /does not by itself earn progress or close an exception/i);
  assert.match(product, /Actuals and allocation/);
  assert.match(product, /RAID/);
  assert.match(product, /Health and reconciliation/);
  assert.match(product, /Reporting/);
  assert.match(product, /Read-only assistance/);
  assert.match(index, /Deterministic services calculate health, reconciliation, progress and financial results/);
  assert.match(index, /cannot decide health, rewrite data or remediate delivery/);
});

test("SAP delivery explains alignment without borrowed credibility", () => {
  for (const phase of ["Discover", "Prepare", "Explore", "Realize", "Deploy", "Run"]) assert.match(sap, new RegExp(`>${phase}<`));
  assert.match(sap, /Methodology alignment is distinct from SAP endorsement, certification, partnership or a native integration/);
  assert.match(sap, /does not claim a generally available automated quality-gate workflow/);
  assert.match(sap, /Keep specialist systems in their proper roles/);
  assert.doesNotMatch(sap, /<img[^>]+sap/i);
});

test("the disabled enquiry cannot imply success or collect details", () => {
  assert.match(config, /enabled:\s*false/);
  assert.match(config, /endpoint:\s*""/);
  assert.match(index, /data-review-form hidden/);
  assert.match(index, /does not collect or transmit contact details/i);
  assert.match(javascript, /result\.saved !== true/);
  assert.match(javascript, /track\("review_request_success"\)/);
  assert.match(privacy, /must validate the request on the server and confirm storage or delivery before the website displays success/i);
  assert.doesNotMatch(index, /Start free trial/i);
});

test("measurement hooks are small and exclude form payloads", () => {
  for (const eventName of ["overview_play", "product_exploration", "demo_click", "review_request_start", "review_request_success"]) {
    assert.match(javascript, new RegExp(`"${eventName}"`));
  }
  assert.match(javascript, /window\.dataLayer\.push\(\{ event: name, \.\.\.properties \}\)/);
  assert.doesNotMatch(javascript, /track\([^)]*payload/);
  assert.doesNotMatch(javascript, /dataLayer\.push\([^)]*(?:email|organisation|question|name: payload)/s);
});

test("the site preserves the separate verified demo destination", () => {
  assert.match(config, /demoUrl:\s*"https:\/\/mantiva360\.app\/"/);
  assert.match(index, /Get started opens the Mantiva360 application in a new tab/);
  assert.match(resources, /Availability and signed-out access are still being verified/);
  assert.doesNotMatch([index, product, sap, resources].join("\n"), /mantiva360\.app\/(?:login|demo|project)/i);

  const pages = [index, product, sap, resources, privacy].join("\n");
  const destinations = [...pages.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>Get started\b/g)].map((match) => match[1]);
  assert.ok(destinations.length >= 10);
  assert.ok(destinations.every((destination) => destination === "https://mantiva360.app/"));
});
