const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const d=__dirname;
for(const [f,o] of [['etiquette_1','etiquette_serum_mini_35x25mm.pdf'],['planche_A4','planche_A4_50_etiquettes.pdf'],['notice','notice_carte_85x55mm.pdf']]){await p.goto('file://'+d+'/'+f+'.html');await p.pdf({path:d+'/'+o,preferCSSPageSize:true,printBackground:true});}
await p.setViewportSize({width:800,height:580});await p.goto('file://'+d+'/apercu.html');await p.screenshot({path:d+'/apercu_etiquette.png',clip:{x:0,y:0,width:800,height:575}});
const q=await b.newPage({deviceScaleFactor:2});await q.setViewportSize({width:330,height:215});await q.goto('file://'+d+'/notice.html');await q.screenshot({path:d+'/apercu_notice.png',fullPage:true});
await b.close()})();
