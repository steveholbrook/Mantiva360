import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { validateSite } from "../scripts/validate-site.mjs";
import { siteConfig } from "../public/assets/js/site-config.js";
const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const routes = ["index.html", ...["product", "sap-delivery", "resources", "about", "privacy"].map(r => `${r}/index.html`)];
const pages = routes.map(r => read(`public/${r}`));
const [home, product, sap, resources] = pages;
const all = pages.join("\n");
const js = read("public/assets/js/main.js");
const css = read("public/assets/css/performance.css");
const firebase = JSON.parse(read("firebase.json"));

test("all routes, assets, anchors and structural safety checks pass", () => {
  const result = validateSite(); assert.deepEqual(result.errors, []); assert.equal(result.htmlCount, 7);
});
test("outcomes lead the homepage and offer connected next steps", () => {
  assert.match(home, /More delivery\.<br><span>Less waste\./);
  assert.match(home, /See cost drift early/);
  for (const id of ["why-change", "why-tools", "get-to-green", "sap-activate", "why-mantiva", "how-it-works", "why-trust", "about-us", "why-now", "guided-review"]) assert.ok(home.includes(`id="${id}"`));
  for (const phrase of ["Protect project investment", "Recover delivery capacity", "Intervene earlier", "Reduce management overhead"]) assert.ok(home.includes(phrase));
});
test("financial examples distinguish exposure from validated results", () => {
  assert.match(home, /Illustrative scenario · fictional AUD values/); assert.match(home, /Additional emerging exposure/);
  assert.match(home, /not a realised saving/); assert.match(product, /not a validated saving/);
  assert.doesNotMatch(all, /guaranteed ROI|save millions|reduce project costs by|AI predicts overruns|automatically prevents|single source of truth|zero setup|autonomous remediation/i);
});
test("current product and trust boundaries support the recovery narrative", () => {
  for (const phrase of ["Get to Green", "Forecast", "Delivery Plan", "Change", "Reports", "AI assistance", "Calculation engines"]) assert.ok(product.includes(phrase));
  assert.match(product, /configured control method governs progress recognition/);
  assert.match(product, /Time, cost or an evidence upload does not automatically create earned progress/);
  assert.match(product, /underlying condition must be resolved before the finding can close/);
  assert.match(product, /read-only AI assistance/); assert.match(product, /not an individual employee productivity score/);
});
test("all six Activate phases remain ordered and accurately distinguished", () => {
  for (const page of [home, sap]) {
    let prior = -1;
    for (const phase of ["Discover", "Prepare", "Explore", "Realize", "Deploy", "Run"]) {const index=page.indexOf(`<h3>${phase}</h3>`); assert.ok(index>prior);prior=index;}
  }
  assert.match(sap,/In Explore, SAP fit-to-standard workshops/);
  assert.match(sap,/Methodology and implementation roadmap/); assert.match(sap,/Performance intelligence and delivery context/);
  assert.match(sap,/SAP endorsement, certification or partnership is not implied/);
  assert.match(sap,/Native SAP connectivity and automated SAP quality-gate certification are not claimed/);
  assert.doesNotMatch(sap, /<img[^>]+sap/i);
});
test("genuine captures and approved brand assets are preserved", () => {
  for (const name of ["cockpit-context-v2", "cockpit-mobile-v2", "cockpit-finding-v2", "cockpit-finding-mobile-v2", "cockpit-recovery-v2", "delivery-context-v2", "delivery-mobile-v2"]) assert.ok(home.includes(`${name}.webp`));
  assert.match(home,/Actual product capture/); assert.match(home,/Displayed values and status have not been rewritten/);
  assert.doesNotMatch(home,/option2-/); assert.match(product,/Promotional renderings based on the live interface/);
  assert.match(all,/mantiva360-full-light.svg/);assert.match(all,/mantiva360-full-dark.svg/);
});
test("review noindex and truthful launch SEO are prepared without inline scripts", () => {
  for (const p of pages) {
    assert.match(p,/<meta name="robots" content="noindex,nofollow">/);
    assert.match(p,/<link rel="canonical" href="https:\/\/mantiva360.com/);
    assert.match(p,/<meta property="og:image" content="https:\/\/mantiva360.com\/assets\/images\/mantiva360-performance-social.png">/);
    assert.match(p,/itemtype="https:\/\/schema.org\/Organization"/);
    assert.equal((p.match(/<h1[ >]/g)||[]).length,1);
  }
});
test("the complete YouTube library retains click-to-load and direct fallbacks", () => {
  for (const id of ["XMQa-RB5fUU","QkCRdrASlAg","wEgHPeHhb7I"]) {
    assert.equal(siteConfig.videos[id].type,"youtube");
    assert.ok(resources.includes(`data-video-open="${id}"`));assert.ok(resources.includes(`href="https://youtu.be/${id}"`));
  }
  assert.doesNotMatch(all,/<iframe\b/i);assert.match(js,/youtube-nocookie.com\/embed/);
  assert.match(js,/stage\?\.replaceChildren/);assert.match(js,/opener\?\.focus/);
  assert.match(resources,/Captions and a verified transcript for the existing YouTube content still need review/);
});
test("local film source, poster, runtime, dimensions and loading remain explicit", () => {
  for (const key of ["performance","evolution"]) {
    const m=siteConfig.videos[key];assert.equal(m.type,"local");assert.ok(m.width>m.height);
    assert.ok(fs.statSync(new URL(`../public${m.src}`,import.meta.url)).size < 6e6);
    assert.ok(fs.existsSync(new URL(`../public${m.poster}`,import.meta.url)));
    assert.ok(resources.includes(`data-video-open="${key}"`));
  }
  assert.equal(siteConfig.videos.performance.seconds,30);assert.equal(siteConfig.videos.evolution.seconds,90);
  assert.match(js,/video.preload = "none"/); assert.match(js,/video.controls = true/);assert.match(js,/video.playsInline = true/);
  assert.doesNotMatch(js,/video.autoplay|video.play\(/);assert.doesNotMatch(all,/<video\b|as="video"/);
  assert.match(js,/video.pause\(\)/); assert.match(js,/video.removeAttribute\("src"\)/);
  assert.match(resources,/Product inserts pending/i);assert.match(resources,/Summary, not a verbatim transcript/);
});
test("no JavaScript keeps navigation, product information and media reachable", () => {
  assert.match(home,/data-menu-toggle[^>]*hidden/);assert.doesNotMatch(home,/<section[^>]*role="tabpanel"[^>]*hidden/);
  for (const match of all.matchAll(/<a[^>]+data-video-open[^>]*>/g)) assert.match(match[0],/href="(?:\/assets\/video\/|https:\/\/youtu.be\/)/);
  assert.match(css,/\.enhanced \.site-header nav/);assert.match(js,/dialog\?\.showModal/);
});
test("keyboard proof controls and reduced motion remain supported", () => {
  for (const key of ["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"]) assert.ok(js.includes(`event.key === "${key}"`));
  assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/focus-visible/);
  assert.equal((home.match(/role="tab"/g)||[]).length,4);assert.equal((home.match(/role="tabpanel"/g)||[]).length,4);
});
test("security headers are exactly preserved", () => {
  const headers=Object.fromEntries(firebase.hosting.headers[0].headers.map(h=>[h.key,h.value]));
  assert.equal(headers["Content-Security-Policy"],"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; frame-src https://www.youtube-nocookie.com; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests");
  assert.equal(headers["X-Frame-Options"],"DENY");assert.equal(headers["Referrer-Policy"],"strict-origin-when-cross-origin");
  assert.equal(headers["Strict-Transport-Security"],"max-age=31536000; includeSubDomains");
  assert.equal(headers["Permissions-Policy"],'accelerometer=(), autoplay=(self "https://www.youtube-nocookie.com"), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()');
  assert.equal(firebase.hosting.public,"public");
});
test("enquiries stay inactive and no tracking is introduced", () => {
  assert.deepEqual(siteConfig.enquiry,{enabled:false,endpoint:""});assert.doesNotMatch(all,/<form\b/i);
  assert.doesNotMatch(js,/dataLayer|analytics|fetch\(|localStorage|document.cookie/);
  assert.doesNotMatch(all,/Start free trial|No sign-up required|instant-access demo|Request a guided review/i);
  assert.equal(siteConfig.demoUrl,"https://mantiva360.app/");assert.match(home,/Access may require sign-in/i);
});
test("evaluation checklist and established product deep links remain", () => {
  for(const anchor of ["cockpit","progress","delivery-plan","plan-connect","control-explain","review-act"])assert.ok(product.includes(`id="${anchor}"`));
  const checklist=read("public/evaluation-checklist.txt");
  for(const label of ["Traceability:","Actionability:","Effort:","Governance:"])assert.ok(checklist.includes(label));
  assert.match(home,/download="Mantiva360-evaluation-checklist.txt"/);
});
test("primary palette meets normal-text contrast requirements", () => {
  function luminance(h){return h.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)}
  for(const [a,b] of [["0b2239","ffffff"],["526575","ffffff"],["087878","ffffff"],["087878","f3f7f7"],["1268b3","ffffff"]]) {const x=[luminance(a),luminance(b)].sort((a,b)=>b-a);assert.ok((x[0]+.05)/(x[1]+.05)>=4.5)}
});
