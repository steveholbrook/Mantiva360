import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const route='/get-to-green', evidence='docs/evidence/get-to-green';

for(const width of [320,390,768,820,1024,1440])test(`Get to Green reflows at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});expect((await page.goto(route)).status()).toBe(200);
 for(const img of await page.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await expect(img).toHaveJSProperty('complete',true);expect(await img.evaluate(i=>i.naturalWidth)).toBeGreaterThan(0)}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 if(width<=1100){await page.getByRole('button',{name:'Menu'}).click();await expect(page.locator('[data-nav] a[aria-current="page"]')).toHaveText('Get to Green');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menu'})).toBeFocused()}
});

test('recovery page passes automated WCAG 2.2 AA checks with disclosures expanded',async({page})=>{
 await page.goto(route);for(const s of await page.locator('.gtg-process summary,.gtg-film summary').all())await s.click();
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();fs.mkdirSync(evidence,{recursive:true});
 fs.writeFileSync(`${evidence}/axe.json`,JSON.stringify({url:route,violations:result.violations,passes:result.passes.map(p=>p.id),incomplete:result.incomplete.map(p=>({id:p.id,impact:p.impact}))},null,2));expect(result.violations).toEqual([]);
});

test('supplied films defer download, play from keyboard, seek and stop on close',async({page})=>{
 const requests=[];page.on('request',r=>{if(/\.mp4(?:\?|$)/.test(r.url()))requests.push(r.url())});await page.goto(route);await page.locator('#recovery-in-action').scrollIntoViewIfNeeded();expect(requests).toEqual([]);
 for(const [key,seconds] of [['recovery',45],['recovery-cost',70]]){
  const opener=page.locator(`[data-video-open="${key}"]`);await opener.focus();await page.keyboard.press('Enter');const dialog=page.getByRole('dialog'),video=dialog.locator('video');
  await expect(video).toHaveAttribute('preload','none');await expect(video).toHaveJSProperty('paused',true);await expect(video).toHaveJSProperty('controls',true);await expect(video).toHaveJSProperty('playsInline',true);await expect(video).toHaveJSProperty('muted',false);
  await expect(page.locator('[data-video-note]')).not.toContainText('Optional English track');await video.focus();await page.keyboard.press('Space');await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(0);expect(await video.evaluate(v=>v.videoWidth)).toBe(1920);expect(await video.evaluate(v=>v.duration)).toBeCloseTo(seconds,0);
  await video.evaluate(v=>{v.currentTime=20});await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThanOrEqual(20);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(dialog.locator('video')).toHaveCount(0);await expect(opener).toBeFocused();
 }
});

test('recovery navigation, anchors, demo destination and history stay connected',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/product');await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Get to Green',exact:true}).click();await expect(page).toHaveURL(/\/get-to-green$/);
 await page.getByRole('link',{name:'Explore Get to Green',exact:true}).click();await expect(page).toHaveURL(/#recovery-framework$/);await expect(page.locator('#framework-title')).toBeInViewport();
 await expect(page.getByRole('link',{name:'Book a Get to Green Demonstration'})).toHaveAttribute('href','mailto:sales@mantiva360.com?subject=Mantiva360%20Get%20to%20Green%20demonstration');await page.getByRole('link',{name:'Explore Mantiva360',exact:true}).click();await expect(page).toHaveURL(/\/product$/);await page.goBack();await expect(page).toHaveURL(/\/get-to-green#recovery-framework$/);await page.goForward();await expect(page).toHaveURL(/\/product$/);
});

test('no-JavaScript phone retains navigation and direct film links',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:800}}),page=await context.newPage();await page.goto(`http://127.0.0.1:4173${route}`);await expect(page.locator('[data-nav]')).toBeVisible();await expect(page.locator('.gtg-process>li')).toHaveCount(4);for(const key of ['recovery','recovery-cost'])await expect(page.locator(`[data-video-open="${key}"]`)).toHaveAttribute('href',/\.mp4$/);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await context.close();
});

test('200 percent text and reduced motion preserve recovery content',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});for(const width of [390,820]){await page.setViewportSize({width,height:1000});await page.goto(route);await page.evaluate(()=>{document.documentElement.style.fontSize='200%'});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')}
});

test('Get to Green desktop tablet and mobile review captures',async({page})=>{
 fs.mkdirSync(evidence,{recursive:true});await page.emulateMedia({reducedMotion:'reduce'});
 for(const [name,width,height] of [['desktop',1440,1000],['tablet',820,1180],['mobile',390,844]]){
  await page.setViewportSize({width,height});await page.goto(route);for(const img of await page.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await expect(img).toHaveJSProperty('complete',true)}await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${evidence}/${name}-hero.png`});await page.screenshot({path:`${evidence}/${name}-full.png`,fullPage:true});await page.locator('#recovery-framework').scrollIntoViewIfNeeded();await page.screenshot({path:`${evidence}/${name}-framework.png`});
 }
});
