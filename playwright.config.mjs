import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', timeout: 45000, workers: 1,
  reporter: [['list'], ['json', {outputFile:'docs/evidence/video-experience/browser-results.json'}]],
  use: { baseURL:'http://127.0.0.1:4173', headless:true,
    launchOptions: process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']} : {},
    screenshot:'only-on-failure', trace:'retain-on-failure' },
  webServer: {command:'node scripts/preview-server.mjs',port:4173,reuseExistingServer:false},
});
