'use strict';

/* ─── UTILITY ─── */
function hslToHex(h,s,l){s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};return`#${f(0)}${f(8)}${f(4)}`;}
function getLabel(h){const L=[[0,'Red'],[30,'Red-Orange'],[60,'Yellow'],[90,'Yellow-Green'],[120,'Green'],[150,'Green-Cyan'],[180,'Cyan'],[210,'Azure'],[240,'Blue'],[270,'Violet'],[300,'Magenta'],[330,'Rose']];let b=L[0],d=361;for(const[deg,n]of L){let dd=Math.abs(h-deg);if(dd>180)dd=360-dd;if(dd<d){d=dd;b=[deg,n];}}return b[1];}

/* ─── INTRO: MOOD LIVE UI PREVIEW ─── */
(function(){
  const MOODS = {
    horror: {
      icon:'👻', label:'Horror Game — dark greens, near-black, desaturated reds. Maximum dread.',
      nav:'#0b140b',   navLogo:'#2e1a0a', navLink:'#3a2020', navBtnBg:'#8b0000', navBtnC:'#ffcccc', navBtnTxt:'Enter',
      hero:'#080e08',  h1:'#cc2222',      h2:'#4a2020',      ctaBg:'#6b0000',    ctaC:'#ffaaaa',    ctaTxt:'Dare to Enter',
      heroImg:'#1a2e0d',
      cards:'#0b140b', cardBg:'#132013',  cardIcon:'#4a1a1a', cardBar:'#2e1010',
    },
    happy: {
      icon:'🌟', label:'Happy Animation — sky blues, warm yellows, bright oranges. Pure joy and energy.',
      nav:'#1a3a5c',   navLogo:'#fbbf24', navLink:'#93c5fd', navBtnBg:'#fbbf24', navBtnC:'#111',    navBtnTxt:'Play!',
      hero:'#1e4070',  h1:'#ffffff',      h2:'#93c5fd',      ctaBg:'#f97316',    ctaC:'#fff',       ctaTxt:'Play Now',
      heroImg:'#fbbf24',
      cards:'#163054', cardBg:'#1e4070',  cardIcon:'#34d399', cardBar:'#60a5fa',
    },
    pro: {
      icon:'💼', label:'Professional UI — dark slate, muted neutrals, one sharp orange accent. Trust and clarity.',
      nav:'#0f172a',   navLogo:'#e2e8f0', navLink:'#475569', navBtnBg:'#f97316', navBtnC:'#fff',    navBtnTxt:'Sign In',
      hero:'#1e293b',  h1:'#f1f5f9',      h2:'#64748b',      ctaBg:'#f97316',    ctaC:'#fff',       ctaTxt:'Get Started',
      heroImg:'#334155',
      cards:'#0f172a', cardBg:'#1e293b',  cardIcon:'#f97316', cardBar:'#475569',
    },
  };

  function applyMood(key) {
    const m = MOODS[key];
    if (!m) return;
    document.querySelectorAll('.mood-card[data-mood]').forEach(c => c.classList.toggle('active-mood', c.dataset.mood === key));
    const $=id=>document.getElementById(id);
    $('mpNav').style.background       = m.nav;
    $('mpNavLogo').style.background   = m.navLogo;
    ['mpNavL1','mpNavL2'].forEach(id => $(id).style.background = m.navLink);
    const nb = $('mpNavBtn'); nb.style.background = m.navBtnBg; nb.style.color = m.navBtnC; nb.textContent = m.navBtnTxt;
    $('mpHero').style.background      = m.hero;
    $('mpH1').style.background        = m.h1;
    $('mpH2').style.background        = m.h2;
    const cta = $('mpCta'); cta.style.background = m.ctaBg; cta.style.color = m.ctaC; cta.textContent = m.ctaTxt;
    $('mpHeroImg').style.background   = m.heroImg;
    $('mpCardsArea').style.background = m.cards;
    ['mpCard1','mpCard2','mpCard3'].forEach(id => $(id).style.background = m.cardBg);
    ['mpIcon1','mpIcon2','mpIcon3'].forEach(id => $(id).style.background = m.cardIcon);
    ['mpCbar1','mpCbar2','mpCbar3'].forEach(id => $(id).style.background = m.cardBar);
    $('mpLabelIcon').textContent = m.icon;
    $('mpLabelText').textContent = m.label;
  }

  document.querySelectorAll('.mood-card[data-mood]').forEach(card => {
    card.addEventListener('click', () => applyMood(card.dataset.mood));
    card.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') applyMood(card.dataset.mood); });
  });
  applyMood('happy');
})();

/* ─── INTRO: BEFORE / AFTER ─── */
(function(){
  const GOOD = {
    nav:'#0f172a', logo:'#60a5fa', btnBg:'#3b82f6', btnC:'#fff',
    body:'#1e293b', b1:'#60a5fa', b2:'#94a3b8', b3:'#475569',
    insight:'Color theory applied: dark neutral background · cool blue accent · subtle hierarchy. Every color has a purpose.',
  };
  const BAD = {
    nav:'#ff6600', logo:'#00ffff', btnBg:'#ff00ff', btnC:'#ffff00',
    body:'#cc0099', b1:'#00ff44', b2:'#ff2200', b3:'#9900ff',
    insight:'No color theory: random hues fighting each other, no hierarchy, nothing stands out. Visually exhausting.',
  };
  function apply(p) {
    const $=id=>document.getElementById(id);
    $('baMiniNav').style.background = p.nav;
    $('baMiniLogo').style.background = p.logo;
    const btn = $('baMiniBtn'); btn.style.background = p.btnBg; btn.style.color = p.btnC;
    $('baMiniBody').style.background = p.body;
    $('baMb1').style.background = p.b1;
    $('baMb2').style.background = p.b2;
    $('baMb3').style.background = p.b3;
    $('baInsight').textContent = p.insight;
  }
  document.getElementById('baBadBtn').addEventListener('click', function(){
    this.classList.add('active'); document.getElementById('baGoodBtn').classList.remove('active'); apply(BAD);
  });
  document.getElementById('baGoodBtn').addEventListener('click', function(){
    this.classList.add('active'); document.getElementById('baBadBtn').classList.remove('active'); apply(GOOD);
  });
  apply(GOOD);
})();

/* ─── NAV ACTIVE ─── */
const secEls=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-pills a');
new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});},{threshold:.4}).observe&&secEls.forEach(s=>new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));});},{threshold:.4}).observe(s));

/* ─── REVEAL ─── */
new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1}).observe&&document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:.1}).observe(el));

/* ─── COLOR WHEEL (Chapter 2) ─── */
(function(){
  const canvas=document.getElementById('wheelCanvas');
  const tt=document.getElementById('wheelTooltip');
  const ttSw=document.getElementById('ttSwatch');
  const ttTx=document.getElementById('ttText');
  const ctx=canvas.getContext('2d');
  const S=canvas.width,cx=S/2,cy=S/2,R=S/2-4;
  for(let d=0;d<360;d++){const g=ctx.createRadialGradient(cx,cy,R*.28,cx,cy,R);g.addColorStop(0,`hsl(${d},10%,96%)`);g.addColorStop(.45,`hsl(${d},100%,62%)`);g.addColorStop(1,`hsl(${d},100%,36%)`);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,(d-.5)*Math.PI/180-Math.PI/2,(d+.5)*Math.PI/180-Math.PI/2);ctx.closePath();ctx.fillStyle=g;ctx.fill();}
  function marker(hue,label,color){const a=(hue-90)*Math.PI/180,mr=R*.72,mx=cx+Math.cos(a)*mr,my=cy+Math.sin(a)*mr;ctx.beginPath();ctx.arc(mx,my,9,0,Math.PI*2);ctx.fillStyle=color||'#000';ctx.globalAlpha=.5;ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#fff';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,mx,my);}
  [[0,'P'],[120,'P'],[240,'P']].forEach(([h,l])=>marker(h,l));   // RGB primaries: Red, Green, Blue
  [[60,'S'],[180,'S'],[300,'S']].forEach(([h,l])=>marker(h,l,'#333')); // RGB secondaries: Yellow, Cyan, Magenta
  canvas.addEventListener('mousemove',e=>{const rect=canvas.getBoundingClientRect();const sc=S/rect.width;const px=(e.clientX-rect.left)*sc-cx,py=(e.clientY-rect.top)*sc-cy;const dist=Math.sqrt(px*px+py*py);if(dist>R||dist<R*.28){tt.style.opacity='0';return;}let hue=Math.atan2(py,px)*180/Math.PI+90;hue=((hue%360)+360)%360;const hex=hslToHex(hue,100,50);ttSw.style.background=hex;ttTx.textContent=getLabel(hue)+' · '+Math.round(hue)+'° · '+hex;tt.style.opacity='1';tt.style.left=Math.min(Math.max(0,(e.clientX-rect.left)-80),canvas.offsetWidth-210)+'px';});
  canvas.addEventListener('mouseleave',()=>tt.style.opacity='0');
})();

/* ─── 2D HSL PICKER (Chapter 3) ─── */
(function(){
  const sqC=document.getElementById('pickerSq');
  const hC=document.getElementById('pickerHue');
  const cross=document.getElementById('pickerCross');
  const hThumb=document.getElementById('pickerHueThumb');
  const previewEl=document.getElementById('pickerPreview');
  const hexEl=document.getElementById('pickerHex');
  const hslEl=document.getElementById('pickerHslVals');
  if(!sqC)return;
  const sqCtx=sqC.getContext('2d'),hCtx=hC.getContext('2d');
  const W=sqC.width,H=sqC.height;
  let pH=0,sqX=W,sqY=H/2,hueY=0,sqDrag=false,hueDrag=false;

  function drawHueBar(){
    const g=hCtx.createLinearGradient(0,0,0,H);
    for(let i=0;i<=12;i++)g.addColorStop(i/12,`hsl(${i*30},100%,50%)`);
    hCtx.fillStyle=g;hCtx.fillRect(0,0,hC.width,H);
  }
  function drawSq(){
    const sg=sqCtx.createLinearGradient(0,0,W,0);
    sg.addColorStop(0,'#fff');sg.addColorStop(1,`hsl(${pH},100%,50%)`);
    sqCtx.fillStyle=sg;sqCtx.fillRect(0,0,W,H);
    const dg=sqCtx.createLinearGradient(0,0,0,H);
    dg.addColorStop(0,'rgba(0,0,0,0)');dg.addColorStop(1,'rgba(0,0,0,1)');
    sqCtx.fillStyle=dg;sqCtx.fillRect(0,0,W,H);
  }
  function updateOutput(){
    const sx=Math.max(0,Math.min(W,sqX))/W;
    const sy=Math.max(0,Math.min(H,sqY))/H;
    const s=Math.round(sx*100);
    const l=Math.round((1-sy)*(100-sx*50));
    const hex=hslToHex(pH,s,l);
    previewEl.style.background=hex;
    previewEl.style.boxShadow=`0 6px 30px ${hex}77,inset 0 1px 0 rgba(255,255,255,.15)`;
    hexEl.textContent=hex;
    hslEl.textContent=`H: ${Math.round(pH)}°  S: ${s}%  L: ${l}%`;
    cross.style.left=Math.max(0,Math.min(W,sqX))+'px';
    cross.style.top=Math.max(0,Math.min(H,sqY))+'px';
  }
  function pickSq(cx,cy){sqX=cx;sqY=cy;updateOutput();}
  function pickHue(cy){
    hueY=Math.max(0,Math.min(H,cy));
    pH=(hueY/H)*360;
    hThumb.style.top=hueY+'px';
    drawSq();updateOutput();
  }
  function sqCoords(e,rect){return[(e.clientX-rect.left)*(W/rect.width),(e.clientY-rect.top)*(H/rect.height)];}
  function hCoord(e,rect){return(e.clientY-rect.top)*(H/rect.height);}
  sqC.addEventListener('mousedown',e=>{sqDrag=true;const r=sqC.getBoundingClientRect();const[x,y]=sqCoords(e,r);pickSq(x,y);});
  hC.addEventListener('mousedown',e=>{hueDrag=true;const r=hC.getBoundingClientRect();pickHue(hCoord(e,r));});
  window.addEventListener('mousemove',e=>{
    if(sqDrag){const r=sqC.getBoundingClientRect();const[x,y]=sqCoords(e,r);pickSq(x,y);}
    if(hueDrag){const r=hC.getBoundingClientRect();pickHue(hCoord(e,r));}
  });
  window.addEventListener('mouseup',()=>{sqDrag=false;hueDrag=false;});
  sqC.addEventListener('touchstart',e=>{sqDrag=true;const t=e.touches[0];const r=sqC.getBoundingClientRect();pickSq((t.clientX-r.left)*(W/r.width),(t.clientY-r.top)*(H/r.height));},{passive:true});
  hC.addEventListener('touchstart',e=>{hueDrag=true;const t=e.touches[0];const r=hC.getBoundingClientRect();pickHue((t.clientY-r.top)*(H/r.height));},{passive:true});
  window.addEventListener('touchmove',e=>{
    const t=e.touches[0];
    if(sqDrag){const r=sqC.getBoundingClientRect();pickSq((t.clientX-r.left)*(W/r.width),(t.clientY-r.top)*(H/r.height));}
    if(hueDrag){const r=hC.getBoundingClientRect();pickHue((t.clientY-r.top)*(H/r.height));}
  },{passive:true});
  window.addEventListener('touchend',()=>{sqDrag=false;hueDrag=false;});
  drawHueBar();drawSq();pickSq(W,H/2);
})();

/* ─── TINT SHADE TONE (Chapter 3b) ─── */
(function(){
  let baseHue=0;
  const row=document.getElementById('tstRow');
  function build(){
    row.innerHTML='';
    // Tints (+ white)
    const tintLine=document.createElement('div');tintLine.className='tst-line';
    const tintLabel=document.createElement('div');tintLabel.className='tst-line-label';tintLabel.textContent='Tints — Color + White';
    const tintSws=document.createElement('div');tintSws.className='tst-swatches';
    [90,78,65,55,45].forEach(l=>{const sw=document.createElement('div');sw.className='tst-sw';sw.style.background=hslToHex(baseHue,80,l);sw.dataset.lbl=hslToHex(baseHue,80,l);tintSws.appendChild(sw);});
    const base1=document.createElement('div');base1.className='tst-sw';base1.style.background=hslToHex(baseHue,100,45);base1.dataset.lbl='Base';tintSws.appendChild(base1);
    tintLine.appendChild(tintLabel);tintLine.appendChild(tintSws);row.appendChild(tintLine);

    // Shades (+ black)
    const shadeLine=document.createElement('div');shadeLine.className='tst-line';
    const shadeLabel=document.createElement('div');shadeLabel.className='tst-line-label';shadeLabel.textContent='Shades — Color + Black';
    const shadeSws=document.createElement('div');shadeSws.className='tst-swatches';
    const base2=document.createElement('div');base2.className='tst-sw';base2.style.background=hslToHex(baseHue,100,45);base2.dataset.lbl='Base';shadeSws.appendChild(base2);
    [38,30,22,14,7].forEach(l=>{const sw=document.createElement('div');sw.className='tst-sw';sw.style.background=hslToHex(baseHue,90,l);sw.dataset.lbl=hslToHex(baseHue,90,l);shadeSws.appendChild(sw);});
    shadeLine.appendChild(shadeLabel);shadeLine.appendChild(shadeSws);row.appendChild(shadeLine);

    // Tones (+ gray)
    const toneLine=document.createElement('div');toneLine.className='tst-line';
    const toneLabel=document.createElement('div');toneLabel.className='tst-line-label';toneLabel.textContent='Tones — Color + Gray';
    const toneSws=document.createElement('div');toneSws.className='tst-swatches';
    [80,60,40,20,5].forEach(s=>{const sw=document.createElement('div');sw.className='tst-sw';sw.style.background=hslToHex(baseHue,s,45);sw.dataset.lbl='Sat '+s+'%';toneSws.appendChild(sw);});
    toneLine.appendChild(toneLabel);toneLine.appendChild(toneSws);row.appendChild(toneLine);
  }
  document.getElementById('tstPresets').addEventListener('click',e=>{
    const p=e.target.closest('.tst-preset');if(!p)return;
    document.querySelectorAll('.tst-preset').forEach(x=>x.classList.remove('active'));
    p.classList.add('active');
    baseHue=+p.dataset.hue;build();
  });
  build();
})();

/* ─── SCHEME VISUALIZER (Chapter 4) ─── */
(function(){
  const canvas=document.getElementById('schemeCanvas');
  const ctx=canvas.getContext('2d');
  const S=canvas.width,cx=S/2,cy=S/2,Rw=S/2-4;
  let currentScheme='complementary',baseHue=213,dragging=false,wImg=null;

  const SCHEMES={
    complementary:{name:'⟺ Complementary',desc:'Two colors directly opposite on the wheel (180° apart). Maximum contrast — they make each other more vivid.',rule:'📐 Pick any color. Go 180° across the wheel for its complement.',getHues:h=>[h,(h+180)%360],getLights:()=>[50,50]},
    analogous:{name:'〰️ Analogous',desc:'Three colors sitting side by side (within 90°). Creates a natural, harmonious, calming feel.',rule:'📐 Pick any color. Take ±30° neighbors on either side.',getHues:h=>[(h-30+360)%360,h,(h+30)%360],getLights:()=>[50,50,50]},
    triadic:{name:'△ Triadic',desc:'Three colors equally spaced at 120° intervals. Vibrant and balanced — like Red, Green, Blue (the RGB primaries) or Yellow, Cyan, Magenta (the secondaries).',rule:'📐 Pick any color. Add 120° and 240° to find the triadic trio.',getHues:h=>[h,(h+120)%360,(h+240)%360],getLights:()=>[50,50,50]},
    mono:{name:'🔘 Monochromatic',desc:'One hue in different lightness and saturation levels. Clean, unified, professional.',rule:'📐 Pick one hue. Vary brightness and saturation — never change the hue.',getHues:h=>[h],getLights:()=>[50]},
  };

  function drawWheelBase(){const off=document.createElement('canvas');off.width=off.height=S;const oc=off.getContext('2d');for(let d=0;d<360;d++){const g=oc.createRadialGradient(cx,cy,Rw*.28,cx,cy,Rw);g.addColorStop(0,`hsl(${d},10%,95%)`);g.addColorStop(.45,`hsl(${d},100%,60%)`);g.addColorStop(1,`hsl(${d},100%,34%)`);oc.beginPath();oc.moveTo(cx,cy);oc.arc(cx,cy,Rw,(d-.5)*Math.PI/180-Math.PI/2,(d+.5)*Math.PI/180-Math.PI/2);oc.closePath();oc.fillStyle=g;oc.fill();}wImg=oc.getImageData(0,0,S,S);}

  function hueXY(h,r){const a=(h-90)*Math.PI/180;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r];}

  function drawScheme(){
    ctx.putImageData(wImg,0,0);
    const sc=SCHEMES[currentScheme];
    const hues=sc.getHues(baseHue);
    const dr=Rw*.72;
    ctx.save();ctx.globalAlpha=.65;ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);
    if(hues.length>=2){const pts=hues.map(h=>hueXY(h,dr));ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));if(hues.length===3)ctx.closePath();ctx.stroke();}
    if(currentScheme==='mono'){const[x,y]=hueXY(baseHue,dr);ctx.beginPath();ctx.arc(cx,cy,dr,(baseHue-20-90)*Math.PI/180,(baseHue+20-90)*Math.PI/180);ctx.stroke();}
    ctx.restore();ctx.setLineDash([]);
    hues.forEach(h=>{const[x,y]=hueXY(h,dr);ctx.beginPath();ctx.arc(x,y,11,0,Math.PI*2);ctx.fillStyle=hslToHex(h,100,50);ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2.5;ctx.stroke();});
    updateInfo(hues,sc);
  }

  function updateInfo(hues,sc){
    document.getElementById('schemeNameBadge').textContent=sc.name;
    document.getElementById('schemeDesc').textContent=sc.desc;
    document.getElementById('schemeRule').textContent=sc.rule;
    const strip=document.getElementById('palettePalette');strip.innerHTML='';
    const lights=sc.getLights();
    hues.forEach((h,i)=>{const hex=hslToHex(h,90,lights[i]||50);const w=document.createElement('div');w.className='pal-chip';w.innerHTML=`<div class="pal-block" style="background:${hex};box-shadow:0 4px 14px ${hex}55"></div><div class="pal-hex">${hex}</div>`;strip.appendChild(w);});
    const mr=document.getElementById('monoRow');const ms=document.getElementById('monoSwatches');
    if(currentScheme==='mono'){mr.style.display='block';ms.innerHTML='';[18,30,45,60,78].forEach(l=>{const sw=document.createElement('div');sw.className='mono-sw';sw.style.background=hslToHex(hues[0],80,l);ms.appendChild(sw);});}else{mr.style.display='none';}
  }

  document.getElementById('schemeTabs').addEventListener('click',e=>{const t=e.target.closest('[data-scheme]');if(!t)return;document.querySelectorAll('.scheme-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');currentScheme=t.dataset.scheme;drawScheme();});

  function getHueFrom(e){const rect=canvas.getBoundingClientRect();const sc=S/rect.width,sy=S/rect.height;const src=e.touches||e.changedTouches?(e.touches[0]||e.changedTouches[0]):e;const px=(src.clientX-rect.left)*sc-cx,py=(src.clientY-rect.top)*sy-cy;let h=Math.atan2(py,px)*180/Math.PI+90;return((h%360)+360)%360;}
  canvas.addEventListener('mousedown',e=>{dragging=true;baseHue=getHueFrom(e);drawScheme();});
  canvas.addEventListener('mousemove',e=>{if(dragging){baseHue=getHueFrom(e);drawScheme();}});
  window.addEventListener('mouseup',()=>dragging=false);
  canvas.addEventListener('touchstart',e=>{dragging=true;baseHue=getHueFrom(e);drawScheme();},{passive:true});
  canvas.addEventListener('touchmove',e=>{if(dragging){baseHue=getHueFrom(e);drawScheme();}},{passive:true});
  window.addEventListener('touchend',()=>dragging=false);

  drawWheelBase();drawScheme();
})();

/* ─── 60-30-10 RULE ─── */
(function(){
  function applyColors(){
    const c60=document.getElementById('c60').value;
    const c30=document.getElementById('c30').value;
    const c10=document.getElementById('c10').value;
    document.getElementById('ui60').style.background=c60;
    document.getElementById('uiBar1').style.background=c30;
    document.getElementById('uiBar2').style.background=c30;
    document.getElementById('uiBar3').style.background=c30;
    document.getElementById('ui30').style.background=c30;
    document.getElementById('uiAvatar').style.background=c10;
    document.getElementById('uiABar').style.background=c60;
    document.getElementById('uiABar2').style.background=c60;
    document.getElementById('ui10btn').style.background=c10;
    document.getElementById('ui10btn').style.color=isLight(c10)?'#111':'#fff';
  }
  function isLight(hex){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return(r*.299+g*.587+b*.114)>140;}
  ['c60','c30','c10'].forEach(id=>document.getElementById(id).addEventListener('input',applyColors));
  document.querySelectorAll('.palette-preset').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.palette-preset').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('c60').value=btn.dataset.c60;document.getElementById('c30').value=btn.dataset.c30;document.getElementById('c10').value=btn.dataset.c10;applyColors();});});
  applyColors();
})();

/* ─── DESIGN WHEEL ─── */
(function(){
  const canvas=document.getElementById('designCanvas');
  const ctx=canvas.getContext('2d');
  const S=canvas.width,cx=S/2,cy=S/2,R=S/2-4;
  for(let d=0;d<360;d++){const g=ctx.createRadialGradient(cx,cy,R*.28,cx,cy,R);g.addColorStop(0,`hsl(${d},10%,95%)`);g.addColorStop(.45,`hsl(${d},100%,60%)`);g.addColorStop(1,`hsl(${d},100%,34%)`);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,(d-.5)*Math.PI/180-Math.PI/2,(d+.5)*Math.PI/180-Math.PI/2);ctx.closePath();ctx.fillStyle=g;ctx.fill();}
  const colors=[{hue:213,hex:'#60a5fa'},{hue:337,hex:'#f0538e'},{hue:160,hex:'#10b981'}];
  const dr=R*.72;
  const pts=colors.map(c=>{const a=(c.hue-90)*Math.PI/180;return[cx+Math.cos(a)*dr,cy+Math.sin(a)*dr];});
  ctx.save();ctx.globalAlpha=.6;ctx.beginPath();pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));ctx.closePath();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);ctx.stroke();ctx.restore();ctx.setLineDash([]);
  colors.forEach(c=>{const a=(c.hue-90)*Math.PI/180;const x=cx+Math.cos(a)*dr,y=cy+Math.sin(a)*dr;ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fillStyle=c.hex;ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.stroke();});
})();

/* ─── WHEEL CLICK DRAWER (Chapter 2) ─── */
(function(){
  const canvas=document.getElementById('wheelCanvas');
  const drawer=document.getElementById('wheelDrawer');
  const S=canvas.width,cx=S/2,cy=S/2,R=S/2-4;
  function getColorType(h){
    const norm=((h%360)+360)%360;
    const PRIMARY=[[0,18],[120,18],[240,18]]; // Red±18, Green±18, Blue±18 (RGB model)
    const SECONDARY=[[60,18],[180,18],[300,18]]; // Yellow, Cyan, Magenta
    for(const[c,d]of PRIMARY){let dd=Math.abs(norm-c);if(dd>180)dd=360-dd;if(dd<=d)return'primary';}
    for(const[c,d]of SECONDARY){let dd=Math.abs(norm-c);if(dd>180)dd=360-dd;if(dd<=d)return'secondary';}
    return'tertiary';
  }
  canvas.addEventListener('click',e=>{
    const rect=canvas.getBoundingClientRect();
    const sc=S/rect.width;
    const px=(e.clientX-rect.left)*sc-cx,py=(e.clientY-rect.top)*sc-cy;
    const dist=Math.sqrt(px*px+py*py);
    if(dist>R||dist<R*.28)return;
    let hue=Math.atan2(py,px)*180/Math.PI+90;
    hue=((hue%360)+360)%360;
    const hex=hslToHex(hue,100,50);
    const name=getLabel(hue);
    const type=getColorType(hue);
    const compHue=(hue+180)%360;
    const compHex=hslToHex(compHue,100,50);
    const a1=hslToHex((hue-30+360)%360,100,50);
    const a2=hslToHex((hue+30)%360,100,50);
    document.getElementById('wdSwatch').style.cssText=`width:52px;height:52px;border-radius:13px;flex-shrink:0;background:${hex};box-shadow:0 4px 16px ${hex}55;`;
    document.getElementById('wdName').textContent=name;
    document.getElementById('wdHex').textContent=hex;
    const typeEl=document.getElementById('wdType');
    typeEl.textContent=type.charAt(0).toUpperCase()+type.slice(1);
    typeEl.className='wd-type-badge wd-type-'+type;
    document.getElementById('wdComp').style.cssText=`background:${compHex};box-shadow:0 2px 8px ${compHex}55;width:28px;height:28px;border-radius:7px;`;
    document.getElementById('wdAnalogs').innerHTML=[a1,a2].map(c=>`<div style="background:${c};box-shadow:0 2px 8px ${c}44;width:28px;height:28px;border-radius:7px;"></div>`).join('');
    drawer.classList.add('open');
  });
})();

/* ─── TEMPERATURE SLIDER (Chapter 3) ─── */
(function(){
  const sl=document.getElementById('tempSlider');
  if(!sl)return;
  const COOL=[[215,80,55],[200,75,50],[240,65,55],[185,70,50],[210,60,60]];
  const WARM=[[0,90,52],[25,95,52],[45,100,52],[15,85,48],[355,80,55]];
  function lerp(a,b,t){return a+(b-a)*t;}
  function update(){
    const t=sl.value/100;
    for(let i=0;i<5;i++){
      const[ch,cs,cl]=COOL[i],[wh,ws,wl]=WARM[i];
      const hex=hslToHex(lerp(ch,wh,t),lerp(cs,ws,t),lerp(cl,wl,t));
      const el=document.getElementById('tc'+i);
      if(el){el.style.background=hex;el.style.boxShadow=`0 3px 12px ${hex}55`;}
    }
  }
  sl.addEventListener('input',update);update();
})();

/* ─── INTERACTIVE MIXING LAB (Chapter 2) ─── */
(function(){
  const MIX={
    '#e60000+#00cc00':{name:'Yellow',hex:'#ffd700',hint:'Red + Green = Yellow. Screens add light — red + green light = yellow. The RGB additive model.'},
    '#00cc00+#e60000':{name:'Yellow',hex:'#ffd700',hint:'Red + Green = Yellow. Screens add light — red + green light = yellow. The RGB additive model.'},
    '#e60000+#0033cc':{name:'Magenta',hex:'#cc00cc',hint:'Red + Blue = Magenta. Electric and vibrant — used in digital gradients and UI accents.'},
    '#0033cc+#e60000':{name:'Magenta',hex:'#cc00cc',hint:'Red + Blue = Magenta. Electric and vibrant — used in digital gradients and UI accents.'},
    '#00cc00+#0033cc':{name:'Cyan',hex:'#00cccc',hint:'Green + Blue = Cyan. Cool and electric — used in UI highlights and neon digital effects.'},
    '#0033cc+#00cc00':{name:'Cyan',hex:'#00cccc',hint:'Green + Blue = Cyan. Cool and electric — used in UI highlights and neon digital effects.'},
  };
  let sel=[null,null],picking=0; // 0=first, 1=second
  const mA=document.getElementById('mA'),mB=document.getElementById('mB');
  const resultSw=document.getElementById('mixResult'),resultName=document.getElementById('mixResultName'),hint=document.getElementById('mixHint');
  const mixBtn=document.getElementById('mixBtn');
  if(!mA)return;
  function updateSlots(){
    function style(el,color){
      if(color){el.style.background=color;el.style.border='2.5px solid #fff';el.innerHTML='';}
      else{el.style.background='rgba(255,255,255,.05)';el.style.border='2px dashed rgba(255,255,255,.2)';el.innerHTML='<span style="font-size:1.4rem;color:rgba(255,255,255,.3)">?</span>';}
    }
    style(mA,sel[0]);style(mB,sel[1]);
    mixBtn.disabled=!(sel[0]&&sel[1]);
  }
  document.querySelectorAll('[data-pick]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const c=btn.dataset.pick;
      if(picking===0){sel[0]=c;picking=1;}
      else{sel[1]=c;picking=0;}
      updateSlots();
      if(sel[0]&&sel[1])hint.textContent='Now click Mix! to combine them';
      else hint.textContent='Pick one more color';
    });
  });
  mA.addEventListener('click',()=>{sel[0]=null;picking=0;updateSlots();hint.textContent='Select two primary colors above';});
  mB.addEventListener('click',()=>{sel[1]=null;picking=1;updateSlots();if(sel[0])hint.textContent='Now pick the second color';});
  function animateMix(result){
    resultSw.style.background=result.hex;
    resultSw.style.boxShadow=`0 6px 28px ${result.hex}88`;
    resultSw.style.transform='scale(1.15)';
    resultName.textContent=result.name;
    hint.textContent=result.hint;
    setTimeout(()=>resultSw.style.transform='scale(1)',300);
  }
  mixBtn.addEventListener('click',()=>{
    if(!sel[0]||!sel[1])return;
    const key=sel[0]+'+'+sel[1];
    const result=MIX[key];
    if(result)animateMix(result);
    else{resultSw.style.background='#888';resultName.textContent='Complex Mix';hint.textContent='Not a simple primary combination!';}
  });
  updateSlots();
})();

/* ─── PSYCHOLOGY QUIZ (Chapter 5) ─── */
(function(){
  const QS=[
    {q:'Which color represents Trust & Calm?',correct:'#0066cc',choices:['#0066cc','#e60000','#ffd700'],msg:'Blue = trust, intelligence, calm. Used by banks, tech, and healthcare.'},
    {q:'Which color signals Danger & Energy?',correct:'#e60000',choices:['#22aa44','#e60000','#7700cc'],msg:'Red = danger, urgency, passion. Used in warnings and action CTAs.'},
    {q:'Which color means Nature & Health?',correct:'#22aa44',choices:['#ffd700','#ff7700','#22aa44'],msg:'Green = nature, growth, safety. Used by health and eco brands.'},
    {q:'Which color evokes Luxury & Mystery?',correct:'#7700cc',choices:['#7700cc','#0066cc','#ff7700'],msg:'Purple = luxury, magic, wisdom. Used in premium and fantasy contexts.'},
    {q:'Which color radiates Happiness & Optimism?',correct:'#ffd700',choices:['#0066cc','#7700cc','#ffd700'],msg:'Yellow = joy, speed, optimism. Grabs attention and creates energy.'},
  ];
  let qIdx=0,score=0,answered=false;
  const dotsEl=document.getElementById('quizDots'),qEl=document.getElementById('quizQ'),choicesEl=document.getElementById('quizChoices');
  const fbEl=document.getElementById('quizFeedback'),nextBtn=document.getElementById('quizNext'),scoreEl=document.getElementById('quizScoreNum');
  const card=document.getElementById('quizCard'),done=document.getElementById('quizDone');
  if(!dotsEl)return;
  const dots=[];
  QS.forEach((_,i)=>{const d=document.createElement('div');d.className='qdot';dotsEl.appendChild(d);dots[i]=d;});
  function showQ(){
    if(qIdx>=QS.length){card.style.display='none';done.classList.add('show');document.getElementById('quizFinalScore').textContent=score+'/'+QS.length;const msgs=['Keep studying — color theory takes practice!','Good start — review the color cards above.','Nice work! You know your color psychology.','Great job! Almost a color expert.','Perfect score! You are a color theory pro!'];document.getElementById('quizFinalMsg').textContent=msgs[score];return;}
    answered=false;
    const q=QS[qIdx];
    qEl.textContent=(qIdx+1)+'. '+q.q;
    fbEl.textContent='';fbEl.style.color='';
    nextBtn.classList.remove('show');
    choicesEl.innerHTML='';
    q.choices.forEach(c=>{const btn=document.createElement('div');btn.className='quiz-choice';btn.style.background=c;btn.dataset.c=c;btn.addEventListener('click',()=>answer(c));choicesEl.appendChild(btn);});
  }
  function answer(color){
    if(answered)return;answered=true;
    const q=QS[qIdx];const ok=color===q.correct;
    document.querySelectorAll('#quizChoices .quiz-choice').forEach(b=>{if(b.dataset.c===q.correct)b.classList.add('correct');else if(b.dataset.c===color&&!ok)b.classList.add('wrong');});
    if(ok){score++;fbEl.style.color='#22c55e';fbEl.textContent='✓ Correct! '+q.msg;dots[qIdx].classList.add('done');}
    else{fbEl.style.color='#ef4444';fbEl.textContent='✗ Not quite. '+q.msg;dots[qIdx].classList.add('wrong-dot');}
    scoreEl.textContent=score;nextBtn.classList.add('show');
  }
  nextBtn.addEventListener('click',()=>{qIdx++;showQ();});
  document.getElementById('quizRestart').addEventListener('click',()=>{qIdx=0;score=0;answered=false;card.style.display='';done.classList.remove('show');scoreEl.textContent='0';dots.forEach(d=>d.className='qdot');showQ();});
  showQ();
})();
