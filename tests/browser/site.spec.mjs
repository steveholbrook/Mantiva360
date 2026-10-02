import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const pages=['/','/product','/sap-delivery','/resources','/about','/privacy'];
const widths=[320,390,768,820,1024,1280,1440];
async function loadVisibleImages(page){for(const img of await page.locator('img:visible').all()){await img.evaluate(i=>i.scrollIntoView());await expect(img).toHaveJSProperty('complete',true);expect(await img.evaluate(i=>i.naturalWidth)).toBeGreaterThan(0)}await page.evaluate(()=>scrollTo(0,0))}
for (const width of widths) test(`all routes reflow at ${width}px`, async({page})=>{
  await page.setViewportSize({width,height:1000});
  for(const url of pages){
    const response=await page.goto(url);expect(response.status()).toBe(200);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    for(const img of await page.locator('img:visible').all()){await img.evaluate(i=>i.scrollIntoView());await expect(img).toHaveJSProperty('complete',true);expect(await img.evaluate(i=>i.naturalWidth)).toBeGreaterThan(0)}
    if(width<=900){await page.getByRole('button',{name:'Menu'}).click();await expect(page.locator('[data-nav]')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('[data-menu-toggle]')).toBeFocused();}
  }
});
for(const url of pages)test(`axe WCAG 2.2 AA: ${url}`,async({page})=>{
 await page.goto(url);const r=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(r.violations).toEqual([]);
});
test('no initial video requests, native local playback and cleanup',async({page})=>{
 const media=[];page.on('request',r=>{if(/\.mp4|youtube|googlevideo/.test(r.url()))media.push(r.url())});
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));expect(media).toEqual([]);
 const trigger=page.getByRole('link',{name:'Watch the 60-second overview'});await trigger.focus();await page.keyboard.press('Enter');
 const dialog=page.getByRole('dialog'),video=dialog.locator('video');await expect(dialog).toBeVisible();await expect(video).toHaveAttribute('preload','none');await expect(video).toHaveJSProperty('paused',true);await expect(video).toHaveJSProperty('controls',true);expect(media).toEqual([]);
 // Genuine user action on native video controls, then inspect decoded metadata.
 await video.evaluate(v=>{v.load()});await expect.poll(()=>video.evaluate(v=>v.readyState)).toBeGreaterThan(0);expect(await video.evaluate(v=>v.videoWidth)).toBe(1920);await video.focus();await page.keyboard.press('Space');await expect.poll(()=>video.evaluate(v=>v.currentTime)).toBeGreaterThan(0);
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();await expect(dialog.locator('video')).toHaveCount(0);expect(await page.locator('body').getAttribute('class')).not.toContain('dialog-open');
 await page.goto('/resources');await page.locator('[data-video-open="evolution"]').first().click();await expect(page.locator('video')).toHaveAttribute('src',/mantiva360-evolution-[a-f0-9]+\.mp4/);await page.getByRole('button',{name:'Close video'}).click();await expect(dialog).not.toBeVisible();
});
test('YouTube IDs, privacy host, keyboard containment and restoration',async({page})=>{
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({contentType:'text/html',body:'<button>Player</button>'}));
 await page.goto('/resources');await page.getByText('Show the three existing YouTube films',{exact:true}).click();await expect(page.locator('iframe')).toHaveCount(0);
 for(const id of ['XMQa-RB5fUU','QkCRdrASlAg','wEgHPeHhb7I']){
   const opener=page.locator(`[data-video-open="${id}"]`);await opener.focus();await page.keyboard.press('Enter');
   await expect(page.locator('iframe')).toHaveAttribute('src',`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`);
   await expect(page.locator('[data-video-fallback]')).toHaveAttribute('href',`https://youtu.be/${id}`);
   await expect(page.getByRole('button',{name:'Close video'})).toBeFocused();
   await page.keyboard.press('Shift+Tab');await expect(page.locator('[data-video-fallback]')).toBeFocused();
   await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Close video'})).toBeFocused();
   await page.keyboard.press('Escape');await expect(opener).toBeFocused();await expect(page.locator('iframe')).toHaveCount(0);
 }
});
test('dialog interior click is safe; backdrop closes; tab navigation works',async({page})=>{
 await page.goto('/');await page.getByRole('link',{name:'Watch the 60-second overview'}).click();await page.locator('[data-video-note]').click();await expect(page.getByRole('dialog')).toBeVisible();await page.mouse.click(2,2);await expect(page.getByRole('dialog')).not.toBeVisible();
 await page.getByRole('tab',{name:'Attention',exact:true}).focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('tab',{name:'Cause',exact:true})).toHaveAttribute('aria-selected','true');await expect(page.locator('#panel-cause')).toBeVisible();await page.keyboard.press('End');await expect(page.locator('#panel-impact')).toBeVisible();await page.keyboard.press('Home');await expect(page.locator('#panel-attention')).toBeVisible();
});
test('no JS shows all proof, navigation and direct video fallbacks',async({browser})=>{
 const ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:320,height:740}});const page=await ctx.newPage();await page.goto('http://127.0.0.1:4173/');
 await expect(page.locator('[data-nav]')).toBeVisible();for(const id of ['attention','cause','action','impact'])await expect(page.locator(`#panel-${id}`)).toBeVisible();await expect(page.getByRole('link',{name:'Watch the 60-second overview'})).toHaveAttribute('href',/mantiva360-buyer-[a-f0-9]+\.mp4/);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await ctx.close();
});
test('200 percent text resize, reduced motion and tablet orientation',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const url of pages){await page.setViewportSize({width:820,height:1180});await page.goto(url);await page.evaluate(()=>document.documentElement.style.fontSize='200%');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)}
 await page.goto('/');await page.setViewportSize({width:820,height:1180});await page.getByRole('button',{name:'Menu'}).click();await page.setViewportSize({width:1180,height:820});await expect(page.locator('[data-nav]')).toBeVisible();await expect(page.locator('[data-menu-toggle]')).toHaveAttribute('aria-expanded','false');await page.setViewportSize({width:820,height:1180});await expect(page.locator('[data-nav]')).not.toBeVisible();
});
test('local links, media ranges and actual CSP response',async({page,request})=>{
 const refs=new Set();for(const url of pages){await page.goto(url);for(const href of await page.locator('a[href]').evaluateAll(links=>links.map(l=>l.getAttribute('href')))){if(href.startsWith('/')&&!href.startsWith('//'))refs.add(href.split('#')[0]||'/')}}
 for(const href of refs){const r=await request.head(href);expect(r.status(),href).toBe(200)}
 const mediaPath=await page.evaluate(async()=>{const {siteConfig}=await import('/assets/js/site-config.js');return siteConfig.videos.cockpit.src});
 const r=await request.get(mediaPath,{headers:{Range:'bytes=0-99'}});expect(r.status()).toBe(206);expect(r.headers()['content-type']).toBe('video/mp4');expect((await r.body()).length).toBe(100);expect(r.headers()['content-security-policy']).toContain("frame-src https://www.youtube-nocookie.com");
 const invalid=await request.get(mediaPath,{headers:{Range:'bytes=999999999-'}});expect(invalid.status()).toBe(416);
});
test('review screenshots',async({page})=>{
 for(const width of [390,820,1440]){
  await page.setViewportSize({width,height:1000});await page.goto('/');await loadVisibleImages(page);await page.screenshot({path:`test-results/video-review/after-${width}.png`,fullPage:true});
 }
 for(const route of ['product','sap-delivery','resources','about']){await page.goto('/'+route);await loadVisibleImages(page);await page.screenshot({path:`test-results/video-review/${route}-1440.png`,fullPage:true})}
});
test('touch playback and orientation on phone and iPad-sized viewports',async({browser})=>{
 for(const size of [{width:390,height:844},{width:820,height:1180}]){
  const context=await browser.newContext({viewport:size,hasTouch:true,isMobile:true});const page=await context.newPage();await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('button',{name:'Menu'}).tap();await expect(page.locator('[data-nav]')).toBeVisible();await page.locator('[data-nav]').getByRole('link',{name:'Resources',exact:true}).tap();
  for(const key of ['buyer','evolution']){
   await page.locator(`[data-video-open="${key}"]`).first().tap();await expect(page.getByRole('dialog')).toBeVisible();
   await page.setViewportSize({width:size.height,height:size.width});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   await page.getByRole('button',{name:'Close video'}).tap();await expect(page.getByRole('dialog')).not.toBeVisible();await page.setViewportSize(size);
  }
  await context.close();
 }
});
