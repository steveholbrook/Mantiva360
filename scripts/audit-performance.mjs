import fs from 'node:fs';
import {spawn} from 'node:child_process';
import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
const evidenceDirectory=process.env.EVIDENCE_DIR || 'docs/evidence/video-experience';
fs.mkdirSync(evidenceDirectory,{recursive:true});
const server=spawn(process.execPath,['scripts/preview-server.mjs'],{stdio:['ignore','pipe','inherit']});
await new Promise(resolve=>server.stdout.once('data',resolve));
const chrome=await launch({chromePath:process.env.CHROMIUM_PATH,chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const mode of ['mobile','desktop']){
  const flags={port:chrome.port,output:'json',onlyCategories:['performance','accessibility','best-practices','seo'],logLevel:'error'};
  if(mode==='desktop')Object.assign(flags,{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:1000,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}});
  const {lhr}=await lighthouse('http://127.0.0.1:4173/',flags);
  const summary={mode,fetchTime:lhr.fetchTime,environment:lhr.environment,userAgent:lhr.userAgent,settings:lhr.configSettings,categories:Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,v.score])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index','total-byte-weight'].map(k=>[k,{value:lhr.audits[k].numericValue,display:lhr.audits[k].displayValue}])),findings:Object.entries(lhr.audits).filter(([,v])=>v.score!==null&&v.score<1).map(([id,v])=>({id,score:v.score,title:v.title,description:v.description,display:v.displayValue}))};
  fs.writeFileSync(`${evidenceDirectory}/lighthouse-${mode}.json`,JSON.stringify(summary,null,2));console.log(JSON.stringify(summary));
 }
}finally{await chrome.kill();server.kill()}
