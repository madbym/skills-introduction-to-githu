const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2400,height:800}});await p.goto('file://'+process.cwd()+'/banniere-contact.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);await p.screenshot({path:'out-banniere-contact.png'});await b.close();})();
