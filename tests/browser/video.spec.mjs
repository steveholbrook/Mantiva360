import { test, expect } from '@playwright/test';

test('hero has pause control and does not restart a deliberate pause',async({page})=>{
 await page.goto('/');const video=page.locator('[data-hero-video]'),button=page.locator('[data-hero-toggle]');
 await expect(button).toBeVisible();await expect(video).toHaveAttribute('src',/mantiva360-hero-/);
 await expect.poll(()=>video.evaluate(v=>v.paused)).toBe(false);
 await button.click();await expect(video).toHaveJSProperty('paused',true);
 await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));await page.evaluate(()=>scrollTo(0,0));
 await expect(video).toHaveJSProperty('paused',true);await expect(button).toHaveText('Play motion');
 await button.click();await expect.poll(()=>video.evaluate(v=>v.paused)).toBe(false);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(video).not.toHaveAttribute('src');await expect(button).toBeHidden();
});

test('reduced motion and save-data visitors download no hero or long film',async({browser})=>{
 for(const preference of ['motion','data']){
  const context=await browser.newContext({reducedMotion:preference==='motion'?'reduce':'no-preference'});
  if(preference==='data')await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true,addEventListener(){}}}));
  const page=await context.newPage(),requests=[];page.on('request',r=>{if(/\.mp4|youtube/.test(r.url()))requests.push(r.url())});
  await page.goto('http://127.0.0.1:4173/');await expect(page.locator('[data-hero-toggle]')).toBeHidden();await expect(page.locator('[data-hero-video]')).not.toHaveAttribute('src');
  expect(requests).toEqual([]);await context.close();
 }
});

test('blocked autoplay leaves poster and offers explicit retry',async({page})=>{
 await page.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Blocked','NotAllowedError'))});
 await page.goto('/');await expect(page.locator('[data-hero-toggle]')).toHaveText('Play motion');await expect(page.locator('[data-hero-video]')).not.toHaveAttribute('src');
 await expect(page.locator('[data-hero-video]')).toHaveAttribute('poster',/hero-/);
});

test('failed film keeps descriptive transcript and direct fallback reachable',async({page})=>{
 await page.route('**/mantiva360-buyer-*.mp4',r=>r.abort());await page.goto('/resources');await page.locator('[data-video-open="buyer"]').first().click();
 const video=page.getByRole('dialog').locator('video');await video.evaluate(v=>v.load());await expect(page.locator('[data-video-note]')).toContainText('could not load');
 await expect(page.locator('[data-video-transcript]')).toBeVisible();await expect(page.locator('[data-video-transcript]')).toHaveAttribute('href','/resources#buyer-text');
 await expect(page.locator('[data-video-fallback]')).toHaveAttribute('href',/mantiva360-buyer-/);
});

test('captions, seeking, user playback and review-only lifecycle',async({page})=>{
 await page.goto('/resources');expect(await page.locator('[data-video-open="performance"]').count()).toBe(0);
 await page.locator('[data-video-open="cockpit"]').first().click();const video=page.getByRole('dialog').locator('video');
 await expect(video.locator('track')).toHaveAttribute('kind','captions');expect(await video.locator('track').getAttribute('default')).toBeNull();
 await video.evaluate(v=>{v.load();v.textTracks[0].mode='hidden'});
 await expect.poll(()=>video.evaluate(v=>v.readyState)).toBeGreaterThan(0);
 await expect.poll(()=>video.evaluate(v=>v.textTracks[0].cues?.length||0)).toBeGreaterThan(0);
 await video.evaluate(v=>v.currentTime=15);await expect.poll(()=>video.evaluate(v=>Math.abs(v.currentTime-15))).toBeLessThan(1);
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toBeHidden();
 // A malformed trigger must not bypass the lifecycle guard.
 await page.locator('[data-video-open="cockpit"]').first().evaluate(a=>a.dataset.videoOpen='performance');
 await page.locator('[data-video-open="performance"]').click();await expect(page.getByRole('dialog')).toBeHidden();
});
