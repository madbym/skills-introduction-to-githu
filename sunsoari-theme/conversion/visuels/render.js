const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1254, height: 1254 } });
  for (const n of process.argv.slice(2)) {
    await p.goto('file://' + process.cwd() + '/' + n + '.html');
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(800);
    await p.screenshot({ path: 'out-' + n + '.png' });
  }
  await b.close();
})();
