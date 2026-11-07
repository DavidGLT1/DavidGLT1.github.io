/* 🚫 DO NOT EDIT — this file is the site's engine. All words and images live in the content/ folder. */
(function(){
/* ===================================================================
   SOUND EFFECTS (all synthesized, no audio files)
   =================================================================== */
var ctx=null,sound=false,root=document.documentElement,nb=null;
function wake(){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume()}catch(e){ctx=null}}
function tone(f,d,type,v,to,delay){
  if(!sound||!ctx)return;var t=ctx.currentTime+(delay||0),o=ctx.createOscillator(),g=ctx.createGain();
  o.type=type||'square';o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v||.05,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+d+.03)}
function noise(d,f1,f2,v,delay,q){
  if(!sound||!ctx)return;var t=ctx.currentTime+(delay||0);
  if(!nb){nb=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);var a=nb.getChannelData(0);for(var i=0;i<a.length;i++)a[i]=Math.random()*2-1}
  var s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=nb;s.loop=true;f.type='bandpass';f.Q.value=q||1;
  f.frequency.setValueAtTime(f1,t);f.frequency.exponentialRampToValueAtTime(f2,t+d);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+d*.3);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  s.connect(f);f.connect(g);g.connect(ctx.destination);s.start(t);s.stop(t+d+.05)}
var sfx={
  tab:function(){tone(660,.08,'triangle',.08,990);tone(990,.1,'triangle',.07,1480,.07)},
  on:function(){tone(420,.14,'sawtooth',.04,1100)},
  off:function(){tone(1100,.14,'sawtooth',.04,380)},
  tx:function(){[523,659,784,1047].forEach(function(f,i){tone(f,.12,'square',.04,0,i*.08)})},
  relay:function(){noise(.07,1800,300,.3,0,2);tone(140,.06,'square',.08,60)},
  chat:function(){for(var k=0;k<3;k++)tone(1200+Math.random()*2400,.02,'square',.018,0,k*.035)},
  whoosh:function(){noise(1.1,300,3200,.35,0,.8);tone(80,1,'sine',.25,30)},
  /* soft hiss + a few crackles when the camera feed changes */
  static:function(){noise(.45,2500,6000,.08,0,.4);for(var k=0;k<7;k++)tone(1500+Math.random()*3000,.015,'square',.016,0,k*.06)},
  /* old IBM keyboard: sharp click and spring ping as the key buckles, then a low clack as it bottoms out */
  key:function(){noise(.012,4200,3000,.5,0,3);tone(2600,.03,'triangle',.05,1800);noise(.03,1500,600,.3,.03,1.2);tone(240,.05,'square',.06,110,.03)},
  /* a softer clack when the key springs back up */
  keyUp:function(){noise(.01,3500,2500,.18,0,3);tone(1800,.015,'triangle',.02,1400);noise(.025,900,500,.12,0,1)}
};

/* ===================================================================
   CONTENT LOADING — reads the files in the content/ folder.
   🚫 Code only. Do not edit. To change words or images, use content/.
   =================================================================== */
var warnings=[],pending={};
function warn(file){warnings.push(file);var w=document.getElementById('warn');w.hidden=false;w.textContent='⚠ Something is wrong in '+warnings.join(' and ')+'. Open it and check that the ` mark at the very start and very end of the text has not been deleted.'}
function text(name,file){if(typeof window[name]!=='string'){warn(file);return''}return window[name]}
function fields(t){var out=[];t.split('\n').forEach(function(l){l=l.trim();var i=l.indexOf(':');if(!l||l[0]==='#'||i<1)return;out.push([l.slice(0,i).trim().toLowerCase(),l.slice(i+1).trim()])});return out}
function blocks(t){var out=[],cur=null;t.split('\n').forEach(function(l){l=l.trim();if(l[0]==='#')return;if(!l){cur=null;return}var i=l.indexOf(':');if(i<1)return;if(!cur){cur={};out.push(cur)}cur[l.slice(0,i).trim().toLowerCase()]=l.slice(i+1).trim()});return out}
var F=fields(text('SITE_TEXT','content/site-text.js'));
function get(k){for(var i=0;i<F.length;i++)if(F[i][0]===k)return F[i][1];return''}
function all(k){return F.filter(function(f){return f[0]===k}).map(function(f){return f[1]})}
function list(n,f){return blocks(text(n,f))}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt)e.textContent=txt;return e}
function img(a,e){if(e.image){var m=el('img');m.alt=e.title||e.heading||'';m.loading='lazy';m.decoding='async';m.onerror=function(){m.remove();note('⚠ Could not find content/images/'+e.image+' — check the file name matches the Image: line.')};m.src='content/images/'+encodeURI(e.image);a.appendChild(m)}}
/* ===== BUTTON ICONS — read from content/icons.js ===== */
var CT=fields(text('CONTROLS_TEXT','content/spaceship-controls.js'));
function ct(k){for(var i=0;i<CT.length;i++)if(CT[i][0]===k)return CT[i][1];return''}
var IC=fields(text('ICON_TEXT','content/icons.js')),seen={};
function ic(k){for(var i=0;i<IC.length;i++)if(IC[i][0]===k)return IC[i][1];return''}
function note(msg){if(seen[msg])return;seen[msg]=1;document.body.insertBefore(el('div','warn',msg),document.body.firstChild)}
function iconEl(spec){var e=el('span','ico');e.setAttribute('aria-hidden','true');
  if(/\.(png|apng|jpe?g|jfif|gif|svg|webp|avif|bmp|ico)$/i.test(spec)){var m=el('img');m.alt='';m.onerror=function(){m.remove();note('⚠ Could not find content/images/'+spec+' — check the file name matches the line in content/icons.js.')};m.src='content/images/'+spec;e.appendChild(m)}
  else e.textContent=spec;return e}
/* puts an icon (emoji, symbol or picture) in front of a button's words; an empty icon keeps the default glowing dot; "none" removes it */
function setKey(b,label,spec){b.textContent='';b.classList.toggle('hasicon',!!spec);if(spec&&!/^(none|off)$/i.test(spec))b.appendChild(iconEl(spec));b.appendChild(document.createTextNode(label||''))}

/* ===== SOUND CLIPS — read from content/sounds.js. An empty line keeps the built-in synthesized sound. ===== */
var SN=fields(text('SOUND_TEXT','content/sounds.js')),bootClip=null,bootOff=false;
function spec(k){for(var i=0;i<SN.length;i++)if(SN[i][0]===k){var p=SN[i][1].split('|'),f=p[0].trim(),v=parseFloat(p[1]);
  if(!f)return null;return{file:f,vol:isNaN(v)?1:Math.max(0,Math.min(100,v))/100,off:/^(off|none|silent)$/i.test(f)}}return null}
function clip(file,onfail){var a=new Audio('content/sounds/'+file);a.preload='auto';
  a.onerror=function(){note('⚠ Could not play content/sounds/'+file+' — check the file name matches the line in content/sounds.js and that it is an mp3, wav or ogg file. The built-in sound is used instead.');onfail()};return a}
/* extra sounds for the spaceship controls screen */
sfx.alert=function(){for(var k=0;k<10;k++)tone(k%2?740:1040,.22,'square',.07,0,k*.5)};                                  /* emergency beeps for 5 seconds */
sfx.swOn=function(){noise(.015,3500,2500,.4,0,3);tone(180,.05,'square',.07,90);tone(120,.7,'sawtooth',.05,520,.05)};    /* switch flicks up, engines spin up */
sfx.swOff=function(){noise(.015,3000,2000,.3,0,3);tone(150,.05,'square',.06,80);tone(500,.6,'sawtooth',.04,110,.05)};  /* switch drops, engines spin down */
var SND={tab:'menu button sound',on:'audio on sound',off:'audio off sound',tx:'link button sound',relay:'boot relay sound',chat:'boot typing sound',whoosh:'door sound',static:'camera change sound',key:'camera key down sound',keyUp:'camera key up sound',alert:'red alert sound',swOn:'speed switch on sound',swOff:'speed switch off sound'};
Object.keys(SND).forEach(function(k){var s=spec(SND[k]);if(!s)return;var old=sfx[k];
  if(s.off){sfx[k]=function(){};return}
  var a=clip(s.file,function(){sfx[k]=old});
  sfx[k]=function(){if(!sound)return;var c=a.cloneNode();c.volume=s.vol;var p=c.play();if(p&&p.catch)p.catch(function(){});return c}});
(function(){var s=spec('boot sound');if(!s)return;if(s.off){bootOff=true;return}bootClip=clip(s.file,function(){bootClip=null});bootClip.volume=s.vol})();

/* ===== BUTTON PICTURES AND ANIMATIONS — read from content/buttons.js. Empty lines keep the current button look. ===== */
var BT=fields(text('BUTTON_TEXT','content/buttons.js'));
function bt(k){for(var i=0;i<BT.length;i++)if(BT[i][0]===k)return BT[i][1];return''}
function bget(pre,suf){for(var i=0;i<pre.length;i++){var v=bt(pre[i]+' '+suf);if(v)return v}return''}   /* the button's own line first, then the general line */
/* stateful = a button that stays on or off (menu, camera, audio); otherwise "on" means being pressed down */
function skin(b,pre,stateful){
  var w=bget(pre,'words').toLowerCase(),sz=bget(pre,'size'),n=0,timer=0,isOn=false;
  if(/^(hide|no|off|none)$/.test(w))b.classList.add('nowords');
  if(sz){var m=sz.match(/(\d+(?:\.\d+)?)\D+(\d+(?:\.\d+)?)/);
    if(m){b.style.width=b.style.minWidth=m[1]+'px';b.style.height=b.style.minHeight=m[2]+'px'}
    else note('⚠ The size "'+sz+'" in content/buttons.js should look like  120 x 48  (width x height in pixels).')}
  function one(folder,key){                                   /* reads one line: "file" or "file | seconds" */
    var v=bget(pre,key);if(!v)return null;var p=v.split('|'),f=p[0].trim(),sec=parseFloat(p[1]);if(!f)return null;
    var o={url:'content/'+folder+'/'+encodeURI(f),ms:(sec>0?sec:1)*1000},t=new Image();
    t.onerror=function(){o.bad=true;note('⚠ Could not find content/'+folder+'/'+f+' — check the file name matches the line in content/buttons.js.');rest()};t.src=o.url;return o}
  var C={on:one('images','on'),off:one('images','off'),loop:one('animations','loop animation'),onOnce:one('animations','on animation'),offOnce:one('animations','off animation')};
  if(!(C.on||C.off||C.loop||C.onOnce||C.offOnce))return;      /* nothing set: the button keeps its current look */
  function ok(o){return o&&!o.bad?o:null}
  function paint(u){if(u){b.classList.add('skinned');b.style.setProperty('--skin-now','url("'+u+'")')}else b.classList.remove('skinned')}
  function rest(){var o=isOn?(ok(C.loop)||ok(C.on)):ok(C.off);paint(o&&o.url)}   /* the picture a button settles on */
  function change(on){if(on===isOn)return;isOn=on;clearTimeout(timer);var o=ok(on?C.onOnce:C.offOnce);
    if(o){paint(o.url+'?'+(++n));timer=setTimeout(rest,o.ms)}else rest()}   /* the ?number makes the animation start again from its first frame */
  function read(){return b.getAttribute('aria-selected')==='true'||b.getAttribute('aria-expanded')==='true'||b.getAttribute('aria-pressed')==='true'}
  if(stateful){setTimeout(function(){isOn=read();rest();new MutationObserver(function(){change(read())}).observe(b,{attributes:true,attributeFilter:['aria-selected','aria-expanded','aria-pressed']})},0)}
  else{rest();
    b.addEventListener('pointerdown',function(){change(true)});
    ['pointerup','pointercancel','pointerleave'].forEach(function(ev){b.addEventListener(ev,function(){change(false)})});
    b.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')change(true)});
    b.addEventListener('keyup',function(){change(false)})}}

function btn(e,after){var a=el('a','key go');setKey(a,e.button,e.icon||ic('link button icon'));skin(a,['link button'],false);a.href=e.link;if(/^https?:/i.test(e.link)){a.target='_blank';a.rel='noopener'}a.addEventListener('click',function(){sfx.tx();if(after)after()});return a}

/* ===== HOW EACH BUILT-IN PAGE IS DRAWN ===== */
var RENDER={
  'manifest':function(p){var g=el('div','mods');list('MANIFEST_TEXT','content/manifest.js').forEach(function(e){var a=el('article','mod');img(a,e);var h=el('h3'),t=e.text?el('p'):null;
      function wrap(box,words){if(!e.link){box.textContent=words;return}var l=el('a','mlink',words);l.href=e.link;if(/^https?:/i.test(e.link)){l.target='_blank';l.rel='noopener'}l.addEventListener('click',sfx.tx);box.appendChild(l)}   /* a Link: line turns the title and text into a link */
      wrap(h,e.title||'');a.appendChild(h);if(t){wrap(t,e.text);a.appendChild(t)}if(e.status)a.appendChild(el('small','',e.status));g.appendChild(a)});p.appendChild(g)},
  'captains-log':function(p){var g=el('div','log');list('LOG_TEXT','content/captains-log.js').forEach(function(e){if(!e.title&&!e.text)return;var a=el('article'),b=el('div');b.appendChild(el('h3','',e.title));b.appendChild(el('p','',e.text));a.appendChild(b);if(e.image){a.classList.add('withimg');img(a,e)}g.appendChild(a)});p.appendChild(g)},   /* an Image: line puts a picture to the right of the text; empty entries are skipped */
  'comms':function(p){var i=el('p','',get('comms intro'));i.style.maxWidth='38rem';p.appendChild(i);
    var ro=el('p','readout',get('comms idle message')),row=el('div','btns');ro.setAttribute('aria-live','polite');
    list('COMMS_TEXT','content/comms.js').forEach(function(e){row.appendChild(btn(e,function(){ro.textContent=get('comms sent message')}))});p.appendChild(row);p.appendChild(ro)}
};

RENDER['spaceship-controls']=function(p){p.appendChild(document.getElementById('ctrlpad'))};   /* the camera view, red alert and speed switch live here */

/* ===== BUILD THE PAGE FROM THE CONTENT FILES ===== */
function build(){
  document.querySelectorAll('[data-text]').forEach(function(x){x.textContent=get(x.dataset.text)});
  document.title=get('browser tab title');
  document.getElementById('alertBtn').textContent=ct('red alert button')||'RED ALERT';
  document.getElementById('swlabel').textContent=ct('speed switch label')||'DOUBLE SPEED';
  [['bootSound','start-up sound button icon','start-up sound button'],['bootSilent','start-up silent button icon','start-up silent button'],['skip','skip button icon','skip button']].forEach(function(p){var b=document.getElementById(p[0]);setKey(b,b.textContent,ic(p[1]));skin(b,[p[2]],false)});
  [].forEach.call(document.querySelectorAll('[data-cam]'),function(b){var i=ic('camera '+b.dataset.cam+' icon');if(i)setKey(b,b.textContent,i);skin(b,['cam '+b.dataset.cam+' button'],true)});
  var logo=get('hero image'),h1=document.querySelector('.hero h1');                /* a logo picture replaces the headline words */
  if(logo)logoFx(h1,'content/images/'+logo,get('hero image description'),get('hero headline'));
  var nav=document.getElementById('nav'),n=0;
  var NAV=text('NAV_TEXT','content/navigation.js'),hasCtl=NAV.split('\n').some(function(l){l=l.trim();return l[0]!=='#'&&/\|\s*spaceship-controls\s*$/i.test(l)});
  if(!hasCtl)NAV+='\n'+(ct('screen name')||'SPACESHIP CONTROLS')+' | spaceship-controls';   /* the button appears under the others unless you place it yourself in content/navigation.js */
  NAV.split('\n').forEach(function(l){
    l=l.trim();if(!l||l[0]==='#'||l.indexOf('|')<0)return;
    var a=l.split('|'),label=a[0].trim(),page=a[1].trim().toLowerCase();n++;
    var b=el('button','key navkey'),item=el('div','acc'),body=el('div','accbody'),inner=el('div','accinner'),p=el('div','panel screen');
    setKey(b,label,ic('menu button icon for '+page)||ic('menu button icon'));b.id='t'+n;b.setAttribute('aria-controls','p'+n);b.setAttribute('aria-expanded','false');skin(b,['menu button for '+page,'menu button'],true);
    p.setAttribute('role','region');p.id='p'+n;p.setAttribute('aria-labelledby',b.id);p.appendChild(el('h2','',label));
    if(RENDER.hasOwnProperty(page))RENDER[page](p);else loadPage(page,p);
    inner.appendChild(p);body.appendChild(inner);item.appendChild(b);item.appendChild(body);nav.appendChild(item)})}
function loadPage(name,p){
  if(!/^[a-z0-9_-]+$/.test(name)){p.appendChild(el('p','','⚠ The page name "'+name+'" in content/navigation.js should use only lowercase letters, numbers and dashes.'));return}
  pending[name]=p;var s=el('script');s.dataset.page=name;s.src='content/pages/'+name+'.js';
  s.onerror=function(){p.appendChild(el('p','','⚠ Could not find content/pages/'+name+'.js — check the file name matches the line in content/navigation.js.'))};
  document.head.appendChild(s)}
window.registerPage=function(t){
  var p=pending[document.currentScript.dataset.page];if(!p)return;var g=el('div','log');
  blocks(t).forEach(function(e){var a=el('article');img(a,e);if(e.heading)a.appendChild(el('h3','',e.heading));if(e.text)a.appendChild(el('p','',e.text));if(e.button&&e.link)a.appendChild(btn(e));g.appendChild(a)});p.appendChild(g)};

/* ===================================================================
   START-UP SCREEN + BOOT SEQUENCE
   =================================================================== */
build();
var LINES=all('boot line');
var boot=document.getElementById('boot'),timers=[],hum=null,done=false;
function T(fn,ms){timers.push(setTimeout(fn,ms))}
function audioBoot(total){
  if(!sound||bootOff)return;
  if(bootClip){try{bootClip.currentTime=0}catch(e){}var pp=bootClip.play();if(pp&&pp.catch)pp.catch(function(){});return}   /* your own start-up sound replaces the built-in one */
  if(!ctx)return;var t=ctx.currentTime,sp=total/4.6;   /* the built-in hum and whine were written for a 4.6 s boot; stretch them to fit the current length */
  tone(70,.6,'sine',.28,26);noise(.08,1500,200,.35,0,2);
  var f=ctx.createBiquadFilter(),g=ctx.createGain(),os=[ctx.createOscillator(),ctx.createOscillator()];
  os[0].type='sawtooth';os[1].type='square';
  os.forEach(function(o,i){var m=i?2.01:1;o.frequency.setValueAtTime(38*m,t);o.frequency.linearRampToValueAtTime(62*m,t+4.6*sp);o.connect(f);o.start(t)});
  f.type='lowpass';f.frequency.setValueAtTime(120,t);f.frequency.exponentialRampToValueAtTime(1100,t+4.6*sp);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.085,t+3.5*sp);f.connect(g);g.connect(ctx.destination);hum={g:g,os:os};
  var w=ctx.createOscillator(),wg=ctx.createGain();w.type='sine';w.frequency.setValueAtTime(90,t+.8*sp);w.frequency.exponentialRampToValueAtTime(1400,t+3.4*sp);
  wg.gain.setValueAtTime(.0001,t+.8*sp);wg.gain.exponentialRampToValueAtTime(.045,t+2.8*sp);wg.gain.exponentialRampToValueAtTime(.0001,t+3.5*sp);w.connect(wg);wg.connect(ctx.destination);w.start(t+.8*sp);w.stop(t+3.6*sp);
  [110,165,220,330].forEach(function(n,i){tone(n,1.5,'triangle',.07,n*1.01,total-.4+i*.05)})}
function finish(){
  if(done)return;done=true;timers.forEach(clearTimeout);
  if(bootClip&&!bootClip.paused){var bc=bootClip,v0=bc.volume,n2=0,fd=setInterval(function(){n2++;bc.volume=Math.max(0,v0*(1-n2/14));if(n2>=14){clearInterval(fd);bc.pause();bc.volume=v0}},100)}   /* fade your start-up sound out as the doors open */
  if(hum&&ctx){var n=ctx.currentTime;hum.g.gain.cancelScheduledValues(n);hum.g.gain.setValueAtTime(Math.max(hum.g.gain.value,.0002),n);hum.g.gain.exponentialRampToValueAtTime(.0001,n+1.4);hum.os.forEach(function(o){o.stop(n+1.5)})}
  sfx.whoosh();boot.classList.add('open');
  setTimeout(function(){boot.hidden=true;document.body.style.overflow='';document.querySelector('#nav .navkey').focus()},1200)}
function engage(snd){
  sound=snd;if(snd)wake();if(!ctx)sound=false;setMute();
  document.getElementById('start').hidden=true;var term=document.getElementById('term');term.hidden=false;term.classList.add('on');
  var out=document.getElementById('lines'),prog=document.getElementById('prog'),SPEED=1.3,HOLD=1000,t0=1000/SPEED,st=300/SPEED,total=(t0+LINES.length*st)/1000;   /* SPEED: 1.4 = 40% faster. HOLD: extra milliseconds the last line stays on screen. */
  out.textContent=LINES.join('\n');out.style.minHeight=out.offsetHeight+'px';out.textContent='';   /* reserve room for every line up front so the window never grows as the last lines appear */
  audioBoot(total);
  LINES.forEach(function(l,i){T(function(){out.textContent+=l+'\n';prog.style.width=((i+1)/LINES.length*100)+'%';sfx.chat();if(i%4===2)sfx.relay()},t0+i*st)});
  T(finish,t0+LINES.length*st+900/SPEED+HOLD)}
document.body.style.overflow='hidden';
document.getElementById('bootSound').onclick=function(){engage(true)};
document.getElementById('bootSilent').onclick=function(){engage(false)};
document.getElementById('skip').onclick=finish;
document.getElementById('bootSound').focus();

/* ===================================================================
   AUDIO BUTTON, CLOCK, TAB SWITCHING
   =================================================================== */
var mute=document.getElementById('mute');skin(mute,['audio button'],true);
function setMute(){mute.setAttribute('aria-pressed',sound);setKey(mute,sound?get('audio on label'):get('audio off label'),sound?ic('audio on icon'):ic('audio off icon'))}
mute.onclick=function(){if(!sound){sound=true;wake();setMute();sfx.on()}else{sfx.off();sound=false;setMute()}};
setMute();
var clock=document.getElementById('clock'),lclock=document.getElementById('clockLocal'),tzl=document.getElementById('tzLabel');
function two(v){return(v<10?'0':'')+v}
/* every digit sits in its own fixed-width cell, so the clocks never change width as the numbers tick */
function cells(e,t){var i;if(e.children.length!==t.length){e.textContent='';for(i=0;i<t.length;i++)e.appendChild(el('span',t.charAt(i)===':'?'c':'d'))}for(i=0;i<t.length;i++)if(e.children[i].textContent!==t.charAt(i))e.children[i].textContent=t.charAt(i)}
function tick(){var d=new Date();cells(clock,d.toISOString().slice(11,19));
  cells(lclock,two(d.getHours())+':'+two(d.getMinutes())+':'+two(d.getSeconds()));          /* the viewer's own local time */
  try{var p=new Intl.DateTimeFormat(undefined,{timeZoneName:'short'}).formatToParts(d);for(var i=0;i<p.length;i++)if(p[i].type==='timeZoneName'){tzl.textContent=p[i].value;break}}catch(e){}}   /* e.g. GMT, PST, CEST */
tick();setInterval(tick,1000);
var heads=[].slice.call(document.querySelectorAll('#nav .navkey'));
heads.forEach(function(b){b.onclick=function(){
  var open=b.getAttribute('aria-expanded')!=='true';                          /* click a closed button to drop its section down, click an open one to close it */
  heads.forEach(function(o){var on=open&&o===b;o.setAttribute('aria-expanded',on);o.parentNode.classList.toggle('open',on)});
  sfx.tab();if(reduce)render(performance.now());
  if(open)setTimeout(function(){var r=b.getBoundingClientRect();if(r.top<0)window.scrollTo({top:window.scrollY+r.top-16,behavior:reduce?'auto':'smooth'})},600)}});   /* if sections above closed and pushed the button off the top of the screen, bring it back */

/* ===================================================================
   LOGO EFFECT — draws the logo with faint scan lines that glitch for a
   moment every few seconds. If the picture can't load, the headline words show instead.
   =================================================================== */
function logoFx(h1,url,alt,fallback){
  var im=new Image();
  im.onerror=function(){h1.textContent=fallback};
  im.onload=function(){
    var w=Math.min(im.naturalWidth,1200),h=Math.round(w*im.naturalHeight/im.naturalWidth),c=el('canvas'),g=c.getContext('2d'),gh=el('canvas'),gg=gh.getContext('2d');
    c.width=gh.width=w;c.height=gh.height=h;c.setAttribute('role','img');c.setAttribute('aria-label',alt);
    h1.textContent='';h1.classList.add('logo');h1.appendChild(c);
    gg.drawImage(im,0,0,w,h);gg.globalCompositeOperation='source-in';gg.fillStyle='#ff4d6d';gg.fillRect(0,0,w,h);   /* a pink copy of the logo, used as a glitch ghost */
    function draw(bad){
      var y;g.clearRect(0,0,w,h);
      if(bad){g.globalAlpha=.45;g.drawImage(gh,w*.012,0);g.globalAlpha=1;
        for(y=0;y<h;){var sh=6+Math.random()*h*.12|0,dx=Math.random()<.45?(Math.random()-.5)*w*.04|0:0;g.drawImage(im,0,y*im.naturalHeight/h,im.naturalWidth,sh*im.naturalHeight/h,dx,y,w,sh);y+=sh}}
      else g.drawImage(im,0,0,w,h);
      g.globalCompositeOperation='source-atop';g.fillStyle='rgba(0,12,32,.3)';                                  /* scan lines, only on the logo itself */
      for(y=0;y<h;y+=6)g.fillRect(0,y,w,3);g.globalCompositeOperation='source-over'}
    draw(false);
    if(reduce)return;
    (function next(){setTimeout(function(){var n=0,t=setInterval(function(){draw(n++<6);if(n>6){clearInterval(t);draw(false)}},45);next()},2500+Math.random()*3500)})()};
  im.src=url}

/* ===================================================================
   MOON CAMERA VIEW — PlayStation 1 look: tiny 160x160 picture, 15-bit
   dithered colour, chunky pixels, jittery 3D, 15 frames a second.
   Cameras: 1 = horizon, 2 = straight down, 3 = straight up (space station).
   =================================================================== */
var cv=document.getElementById('moon'),c2=cv.getContext('2d'),W=160,H=160,MS=256,hm=new Float32Array(MS*MS);
var CAMH=50;            /* spacecraft altitude: 50 map units x 40 m = 2000 m, never changes */
var boost=1,boostTarget=1,cam=1,glitch=0,px=40,py=90,prev=0,last=0,hudT=0,V=document.getElementById('vel'),P=document.getElementById('pos');
var s=7;function R(){s|=0;s=s+0x6D2B79F5|0;var t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
function pack(r,g,b){return(255<<24)|(b<<16)|(g<<8)|r}

/* ----- the moon surface: smooth hills + craters (all heights are 40% of the old, rougher version) ----- */
[[8,8.8],[16,4],[32,2],[64,.9]].forEach(function(o){
  var g=o[0],a=o[1],lat=new Float32Array(g*g),i,x,y;for(i=0;i<lat.length;i++)lat[i]=R();
  for(y=0;y<MS;y++)for(x=0;x<MS;x++){
    var fx=x/MS*g,fy=y/MS*g,x0=Math.floor(fx),y0=Math.floor(fy),tx=fx-x0,ty=fy-y0;tx=tx*tx*(3-2*tx);ty=ty*ty*(3-2*ty);
    var x1=(x0+1)%g,y1=(y0+1)%g;x0%=g;y0%=g;
    hm[y*MS+x]+=a*(lat[y0*g+x0]*(1-tx)*(1-ty)+lat[y0*g+x1]*tx*(1-ty)+lat[y1*g+x0]*(1-tx)*ty+lat[y1*g+x1]*tx*ty)}});
for(var k=0;k<60;k++){
  var cx=Math.floor(R()*MS),cy=Math.floor(R()*MS),r=6+Math.pow(R(),2)*30,dep=r*.22,e=Math.ceil(r*1.4);
  for(var dy=-e;dy<=e;dy++)for(var dx=-e;dx<=e;dx++){
    var d=Math.sqrt(dx*dx+dy*dy)/r,h=0;
    if(d<1)h=dep*(.32-(1-d*d));else if(d<1.4){var q=1-(d-1)/.4;h=dep*.32*q*q}
    if(h)hm[((cy+dy)&255)*MS+((cx+dx)&255)]+=h}}
function hAt(x,y){return hm[((y|0)&255)*MS+((x|0)&255)]}
/* height at any map position, smoothly blended between the four nearest points */
function hB(x,y){var x0=Math.floor(x),y0=Math.floor(y),tx=x-x0,ty=y-y0;return hAt(x0,y0)*(1-tx)*(1-ty)+hAt(x0+1,y0)*tx*(1-ty)+hAt(x0,y0+1)*(1-tx)*ty+hAt(x0+1,y0+1)*tx*ty}
/* grey value 0..1 of the ground at x,y, lit from one side (k = how strongly slopes show) */
function shade(x,y,k,ox,oy){var h=hB(x,y);return .4+(h-hB(x+ox,y+oy))*k+h*.012}

/* ----- screen buffer, grey palette, PS1-style dithering ----- */
var buf=new ArrayBuffer(W*H*4),u32=new Uint32Array(buf),img2=new ImageData(new Uint8ClampedArray(buf),W,H),BLACK=0xFF000000,pal=new Uint32Array(256),BAY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
for(var i=0;i<256;i++)pal[i]=pack(i,i,i);
function grey(l){return pal[l<0?0:l>1?255:l*255|0]}
function dither(){
  for(var y=0,i=0;y<H;y++)for(var x=0;x<W;x++,i++){
    var c=u32[i],d=(BAY[(y&3)*4+(x&3)]-7.5)*.5,r=(c&255)+d,g=((c>>8)&255)+d,b=((c>>16)&255)+d;
    r=r<0?0:r>255?255:r;g=g<0?0:g>255?255:g;b=b<0?0:b>255?255:b;
    r=(r>>3)<<3;r|=r>>5;g=(g>>3)<<3;g|=g>>5;b=(b>>3)<<3;b|=b>>5;u32[i]=pack(r,g,b)}}

/* ----- the three cameras (f = forward, u = up, r = right, F = zoom) ----- */
var CAMS={1:{f:[1,0,0],u:[0,0,1],r:[0,-1,0],F:138.6},2:{f:[0,0,-1],u:[1,0,0],r:[0,-1,0],F:138.6},3:{f:[0,0,1],u:[1,0,0],r:[0,1,0],F:298.6}};

/* ----- stars: a few small white and blue dots ----- */
var SX=[],SY=[],SZ=[],SC=[];
for(var k=0;k<220;k++){var zz=R()*2-1,aa=R()*6.2832,rr=Math.sqrt(1-zz*zz);SX.push(rr*Math.cos(aa));SY.push(rr*Math.sin(aa));SZ.push(zz);SC.push(R()<.3?pack(140,185,255):pack(255,255,255))}
function stars(cm,now,dir){
  var th=now*1.2e-5*(dir||1),ct=Math.cos(th),st=Math.sin(th);
  for(var k=0;k<SX.length;k++){
    var x=SX[k]*ct+SZ[k]*st,z=-SX[k]*st+SZ[k]*ct,y=SY[k],cz=x*cm.f[0]+y*cm.f[1]+z*cm.f[2];if(cz<.05)continue;
    var sx=(W/2+cm.F*(x*cm.r[0]+y*cm.r[1]+z*cm.r[2])/cz)|0,sy=(H/2-cm.F*(x*cm.u[0]+y*cm.u[1]+z*cm.u[2])/cz)|0;
    if(sx>=0&&sx<W&&sy>=0&&sy<H)u32[sy*W+sx]=SC[k]}}

/* ----- CAM 1: looking straight ahead at the horizon ----- */
function drawHorizon(dX,dY,now){
  u32.fill(BLACK);stars(CAMS[1],now,-1);
  var plx=-dY*.5774,ply=dX*.5774,x,y;
  for(x=0;x<W;x++){
    var c=2*x/W-1,rx=dX+plx*c,ry=dY+ply*c,yb=H,z=1,dz=.6;
    while(z<1500){
      var mx=px+rx*z,my=py+ry*z,sy=((CAMH-hAt(mx,my))*138.6/z+H/2)|0;
      if(sy<yb){var v=grey(shade(mx,my,.5,1.5,.7)*(1-.65*z/1500)),y0=sy<0?0:sy;for(y=y0;y<yb;y++)u32[y*W+x]=v;yb=sy}
      z+=dz;dz+=.02}}}

/* ----- CAM 2: looking straight down at the surface ----- */
function drawDown(dX,dY){
  var FP=CAMH*.5774,x,y;
  for(y=0;y<H;y++)for(x=0;x<W;x++){
    var u=(x+.5-W/2)/(W/2)*FP,v=(H/2-y-.5)/(H/2)*FP;
    u32[y*W+x]=grey(shade(px+dX*v+dY*u,py+dY*v-dX*u,.55,1,.5))}}

/* ----- CAM 3: looking straight up at the space station, 1 km away ----- */
var FACES=[],WHITE=[236,240,248],GREY=[196,206,226],BLUE=[36,86,214],DBLUE=[24,56,146],LBLUE=[78,136,242];
function quad(p,c,ring){FACES.push({p:p,c:c,ring:ring})}
function pt(x,r,a,o){o=o||0;return[x,r*Math.cos(a)-o*Math.sin(a),r*Math.sin(a)+o*Math.cos(a)]}
function box(x0,x1,y0,y1,z0,z1,c){
  var Q=[[x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]];
  [[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]].forEach(function(f){quad(f.map(function(i){return Q[i]}),c)})}
function prism(x0,x1,r,c1,c2,n){for(var k=0;k<n;k++){var a=k/n*6.2832,b=(k+1)/n*6.2832;quad([pt(x0,r,a),pt(x1,r,a),pt(x1,r,b),pt(x0,r,b)],k%2?c2:c1)}}
/* the station is 200 m long. Units here are metres. */
prism(-100,100,8,WHITE,GREY,8);prism(-12,12,10.5,BLUE,DBLUE,8);                 /* main spine + blue band */
box(15,35,-11,11,-11,11,WHITE);box(-80,-62,-10,10,-10,10,GREY);                /* lab modules */
box(88,100,-6,6,-6,6,BLUE);box(-100,-88,-6,6,-6,6,BLUE);                       /* docking ends */
box(54,58,-70,70,-1,1,GREY);                                                    /* solar panel boom */
[[40,56],[56,72]].forEach(function(c,i){[[14,70],[-70,-14]].forEach(function(y){quad([[c[0],y[0],0],[c[1],y[0],0],[c[1],y[1],0],[c[0],y[1],0]],i?LBLUE:BLUE)})}); /* solar panels */
(function(){var XC=-40,RO=62,RI=48,HW=7,n=16,k,a,b;                           /* the rotating ring */
  for(k=0;k<n;k++){a=k/n*6.2832;b=(k+1)/n*6.2832;
    quad([pt(XC-HW,RO,a),pt(XC+HW,RO,a),pt(XC+HW,RO,b),pt(XC-HW,RO,b)],k%4?WHITE:BLUE,1);
    quad([pt(XC-HW,RI,a),pt(XC+HW,RI,a),pt(XC+HW,RI,b),pt(XC-HW,RI,b)],DBLUE,1);
    quad([pt(XC-HW,RI,a),pt(XC-HW,RO,a),pt(XC-HW,RO,b),pt(XC-HW,RI,b)],GREY,1);
    quad([pt(XC+HW,RI,a),pt(XC+HW,RO,a),pt(XC+HW,RO,b),pt(XC+HW,RI,b)],GREY,1)}
  for(k=0;k<4;k++){a=k*1.5708;
    quad([pt(XC-2.5,9,a),pt(XC+2.5,9,a),pt(XC+2.5,RI,a),pt(XC-2.5,RI,a)],WHITE,1);
    quad([pt(XC,9,a,-2.5),pt(XC,9,a,2.5),pt(XC,RI,a,2.5),pt(XC,RI,a,-2.5)],GREY,1)}})();
function tri(ax,ay,bx,by,cx,cy,col){
  var x0=Math.max(0,Math.min(ax,bx,cx)),x1=Math.min(W-1,Math.max(ax,bx,cx)),y0=Math.max(0,Math.min(ay,by,cy)),y1=Math.min(H-1,Math.max(ay,by,cy)),d=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);
  if(!d)return;
  for(var y=y0;y<=y1;y++)for(var x=x0;x<=x1;x++){
    var w1=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/d,w2=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/d;
    if(w1>=0&&w2>=0&&w1+w2<=1)u32[y*W+x]=col}}
function drawStation(now){
  var th=now*.0004,ca=Math.cos(th),sa=Math.sin(th),cw=Math.cos(-.5),sw=Math.sin(-.5),cp=Math.cos(.55),sp=Math.sin(.55),F=CAMS[3].F,L=[];
  FACES.forEach(function(fc){
    var q=fc.p.map(function(p){var x=p[0],y=p[1],z=p[2],t;
      if(fc.ring){t=y*ca-z*sa;z=y*sa+z*ca;y=t}      /* ring spins */
      t=x*cw+z*sw;z=-x*sw+z*cw;x=t;t=y*cp-z*sp;z=y*sp+z*cp;y=t;
      return[x,y,z+1000]});                          /* 1000 m away */
    L.push({q:q,c:fc.c,d:q[0][2]+q[1][2]+q[2][2]+q[3][2]})});
  L.sort(function(a,b){return b.d-a.d});
  L.forEach(function(f){
    var q=f.q,ux=q[1][0]-q[0][0],uy=q[1][1]-q[0][1],uz=q[1][2]-q[0][2],vx=q[3][0]-q[0][0],vy=q[3][1]-q[0][1],vz=q[3][2]-q[0][2],
    nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx,m=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
    if(nx*q[0][0]+ny*q[0][1]+nz*q[0][2]>0){nx=-nx;ny=-ny;nz=-nz}
    var k=.35+.65*Math.max(0,(nx*.45+ny*.55-nz*.7)/m),col=pack(f.c[0]*k|0,f.c[1]*k|0,f.c[2]*k|0),
    Pt=q.map(function(p){return[Math.round(W/2+F*p[0]/p[2]),Math.round(H/2-F*p[1]/p[2])]});
    tri(Pt[0][0],Pt[0][1],Pt[1][0],Pt[1][1],Pt[2][0],Pt[2][1],col);tri(Pt[0][0],Pt[0][1],Pt[2][0],Pt[2][1],Pt[3][0],Pt[3][1],col)})}
function drawUp(now){u32.fill(BLACK);stars(CAMS[3],now);drawStation(now)}

/* ----- put it all together, 15 frames a second ----- */
function setLabel(){
  document.querySelector('.hud.tl span').textContent=get('monitor top left')+' '+cam;
  document.querySelector('.hud.tr').textContent=cam===3?get('monitor station label'):get('monitor top right')}
function render(now){
  var dt=Math.min(.2,(now-prev)/1000||0),ang=Math.sin(now*.00013)*.5+Math.sin(now*.00041)*.12,dX=Math.cos(ang),dY=Math.sin(ang);prev=now;
  boost+=(boostTarget-boost)*Math.min(1,dt*3);px+=dX*42*boost*dt;py+=dY*42*boost*dt;                          /* 42 units a second = about 1.67 km/s */
  if(glitch>0){glitch--;for(var i=0;i<W*H;i++)u32[i]=pal[Math.random()*140|0]}
  else if(cam===1)drawHorizon(dX,dY,now);else if(cam===2)drawDown(dX,dY);else drawUp(now);
  dither();c2.putImageData(img2,0,0);
  if(now-hudT>200){hudT=now;V.textContent=((1.67+Math.sin(now*.001)*.01)*boost).toFixed(2);P.innerHTML='Lat '+(px/400%90).toFixed(2)+' N<br>Lon '+(py/380%180).toFixed(2)+' E'}}
var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches,camKeys=[].slice.call(document.querySelectorAll('[data-cam]'));
camKeys.forEach(function(b){
  b.addEventListener('pointerdown',function(){sfx.key()});             /* the click plays the moment the key is pushed down */
  b.addEventListener('pointerup',function(){sfx.keyUp()});             /* and a softer clack when it springs back */
  b.onclick=function(e){
    if(!e.detail){sfx.key();setTimeout(sfx.keyUp,80)}                  /* keyboard presses get both sounds too */
    var n=+b.dataset.cam;if(n===cam)return;                             /* same camera: nothing changes */
    cam=n;glitch=7;camKeys.forEach(function(o){o.setAttribute('aria-pressed',o===b)});sfx.static();setLabel();if(reduce)render(performance.now())}});
function loop(now){if(!reduce)requestAnimationFrame(loop);if(now-last<66)return;last=now;if(!cv.closest('.acc.open'))return;render(now)}
setLabel();loop(performance.now());

/* ===================================================================
   WHOLE-SCREEN EFFECT — faint scan lines (see style.css) plus a small glitch every 15 to 30 seconds
   =================================================================== */
/* ===================================================================
   SPACESHIP CONTROLS — red alert button and double-speed switch
   =================================================================== */
var alertBtn=document.getElementById('alertBtn'),speedSw=document.getElementById('speedSw'),cmsg=document.getElementById('ctrlmsg'),alertOn=false,boostOn=false;
skin(alertBtn,['red alert button'],true);skin(speedSw,['speed switch'],true);
function status(){var m=[];if(alertOn)m.push(ct('red alert message')||'RED ALERT');if(boostOn)m.push(ct('speed message')||'Double speed');cmsg.textContent=m.join('  ')||ct('idle message')}
status();
alertBtn.onclick=function(){
  if(alertOn)return;alertOn=true;alertBtn.setAttribute('aria-pressed','true');root.classList.add('redalert');var h=sfx.alert();status();
  setTimeout(function(){alertOn=false;alertBtn.setAttribute('aria-pressed','false');root.classList.remove('redalert');if(h&&h.pause)h.pause();status()},5000)};
speedSw.onclick=function(){
  if(boostOn)return;boostOn=true;speedSw.setAttribute('aria-pressed','true');boostTarget=2;sfx.swOn();status();
  setTimeout(function(){boostOn=false;speedSw.setAttribute('aria-pressed','false');boostTarget=1;sfx.swOff();status()},5000)};

var fx=el('div','screenfx');fx.setAttribute('aria-hidden','true');document.body.appendChild(fx);
function glitchPage(){fx.style.setProperty('--gy',(10+Math.random()*75)+'%');root.classList.add('glitching');setTimeout(function(){root.classList.remove('glitching')},400)}
function nextGlitch(){setTimeout(function(){glitchPage();nextGlitch()},15000+Math.random()*15000)}
if(!reduce)nextGlitch();
})();
