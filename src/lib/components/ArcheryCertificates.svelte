<script>
import {onMount} from 'svelte';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
let {certs,tamil=false}=$props();
let stage, arrow, string, bow, target, impact;
let firing=$state(false), status=$state('');
let timeline;
const t=(en,ta)=>tamil?ta:en;
const tags=['Ethical hacking','Digital forensics','Offensive security','App security','Hardware & IoT','Networking'];
function fire(){
 if(firing||!stage)return;
 firing=true;status=t('Arrow released. Cards returning to place.','அம்பு பாய்ந்தது. அட்டைகள் மீண்டும் இடத்திற்குத் திரும்புகின்றன.');
 const cards=stage.querySelectorAll('.credential');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 timeline?.kill();
 timeline=gsap.timeline({onComplete:()=>{gsap.set([arrow,bow,target,impact,...cards],{clearProps:'transform,opacity'});gsap.set(string,{attr:{d:'M75 22 L75 75 L75 128'}});firing=false;status=t('All credentials back in place. Ready to replay.','அனைத்து அட்டைகளும் மீண்டும் இடத்தில் உள்ளன. மீண்டும் இயக்கலாம்.');}});
 if(reduced){timeline.to(cards,{opacity:.6,duration:.2,stagger:.03}).to(cards,{opacity:1,duration:.2});return;}
 timeline.to(string,{attr:{d:'M75 22 L40 75 L75 128'},duration:.4,ease:'power2.inOut'},0)
 .to(arrow,{x:-35,duration:.4,ease:'power2.inOut'},0)
 .to(bow,{scaleX:1.07,transformOrigin:'75px 75px',duration:.4},0)
 .to(string,{attr:{d:'M75 22 L75 75 L75 128'},duration:.12,ease:'elastic.out(1,.2)'},.4)
 .to(bow,{scaleX:1,duration:.18},.4)
 .to(arrow,{x:600,duration:.48,ease:'power3.in'},.4)
 .to(target,{rotation:12,transformOrigin:'center',duration:.12,yoyo:true,repeat:1},.84)
 .fromTo(impact,{opacity:1,scale:.4},{opacity:0,scale:2.5,transformOrigin:'center',duration:.5},.84)
 .to(cards,{y:(i)=>80+(i%3)*16,rotation:(i)=>i%2===0?-18:20,x:(i)=>i%2===0?-12:12,scale:.94,duration:.52,stagger:.075,ease:'power2.in'},.86)
 .to(cards,{y:0,x:0,rotation:0,scale:1,duration:1.15,stagger:.065,ease:'elastic.out(1,.55)'},1.85)
 .to(arrow,{opacity:0,duration:.15},1.3)
 .set(arrow,{x:0},1.5)
 .to(arrow,{opacity:1,duration:.3},2.6);
}
onMount(()=>{
 gsap.registerPlugin(ScrollTrigger);
 let repeatTimer;
 const trigger=ScrollTrigger.create({trigger:stage.querySelector('.credential-grid'),start:'top 85%',once:true,onEnter:()=>{
  fire();
  repeatTimer=setInterval(()=>{
   const rect=stage.getBoundingClientRect();
   if(!document.hidden && rect.top<window.innerHeight && rect.bottom>0)fire();
  },5*60*1000);
 }});
 return()=>{trigger.kill();timeline?.kill();clearInterval(repeatTimer);};
});
</script>
<section id="certifications" class="cert-showcase" bind:this={stage} aria-labelledby="cert-title">
<div class="cert-heading"><div><p class="eyebrow">{t('AIM. LEARN. BUILD.','குறி வை. கற்றுக்கொள். உருவாக்கு.')}</p><h3 id="cert-title">{t('certifications & training','சான்றிதழ்கள் & பயிற்சிகள்')}</h3></div><button class="shoot" onclick={fire} disabled={firing} aria-label={t('Replay bow and certificate animation','வில் மற்றும் சான்றிதழ் அசைவை மீண்டும் இயக்கவும்')}>{t(firing?'in flight…':'fire arrow ↗',firing?'அம்பு பாய்கிறது…':'அம்பு விடு ↗')}</button></div>
<div class="archery-range" aria-hidden="true">
<svg viewBox="0 0 800 150" fill="none">
<path class="trajectory" d="M140 75 H690" stroke-dasharray="3 12"/>
<g bind:this={bow}><path d="M75 22 C92 38 114 55 114 75 C114 95 92 112 75 128" stroke="#efbd57" stroke-width="7" stroke-linecap="round"/><path d="M75 22 L75 75 L75 128" bind:this={string} stroke="#546a88" stroke-width="2"/><path d="M73 19 L79 27 M73 131 L79 123" stroke="#445c7d" stroke-width="7" stroke-linecap="round"/><path d="M113 65 V85" stroke="#405e7e" stroke-width="9" stroke-linecap="round"/></g>
<g bind:this={arrow}><path d="M75 75 H166" stroke="#48698c" stroke-width="3" stroke-linecap="round"/><path d="M166 75 L153 68 V82 Z" fill="#7295c1"/><path d="M76 75 L86 67 H97 L90 75 L97 83 H86 Z" fill="#edbf5e"/></g>
<g bind:this={target}><circle cx="735" cy="75" r="30" fill="#dce8f9" stroke="#95b2d8" stroke-width="2"/><circle cx="735" cy="75" r="19" stroke="#92afd3" stroke-width="2"/><circle cx="735" cy="75" r="8" fill="#92afd3"/><path d="M725 106 L719 136 M745 106 L751 136" stroke="#8ca4c5" stroke-width="3"/></g>
<g bind:this={impact} opacity="0"><circle cx="735" cy="75" r="24" stroke="#ddb66a" stroke-width="2"/><path d="M735 33 V43 M735 107 V117 M693 75 H703 M767 75 H777" stroke="#ddb66a" stroke-width="3" stroke-linecap="round"/></g>
</svg>
<p class="target-challenge"><span aria-hidden="true" class="flame">🔥</span><strong>{t('Can you hit the target?','உங்களால் இலக்கைத் தாக்க முடியுமா?')}</strong><span aria-hidden="true" class="flame">🔥</span></p>
</div>
<div class="credential-grid">{#each certs as c,i}<article class="credential glass" style={'animation-delay:'+(-i*.65)+'s'}><div class="credential-top"><span class="credential-icon" aria-hidden="true">{['⌘','◈','⌖','◇','⚙','◎'][i]}</span><span class="credential-index">0{i+1}</span></div><h4>{c[0]}</h4><p>{c[1]}</p><span class="credential-tag">{tags[i]}</span></article>{/each}</div>
<p class="sr-only" aria-live="polite">{status}</p>
</section>
<style>
.cert-showcase{margin-top:55px;padding-bottom:30px;scroll-margin-top:100px}.cert-heading{display:flex;align-items:center;justify-content:space-between;gap:20px}.cert-heading h3{font-family:Althite,Arial,sans-serif;font-size:42px;font-weight:400;margin:0}.cert-heading .eyebrow{margin-bottom:8px}.shoot{white-space:nowrap;border:1px solid #abc3e0;background:#ffffff80;border-radius:15px;padding:13px 20px;color:#537bae;font-size:13px;transition:.2s}.shoot:hover{background:#769bce;color:white;transform:translateY(-2px)}.shoot:disabled{cursor:default;opacity:.65;transform:none}.archery-range{margin:25px 0 28px;border-radius:20px;background:linear-gradient(120deg,#d0e2f74d,#edf5fd90);border:1px solid #fff9;padding:0 15px 15px}.archery-range svg{width:100%;max-height:170px;display:block;overflow:visible}.trajectory{stroke:#90abcd;opacity:.4}.archery-range p{font-size:11px;text-align:center;color:#7992b1;margin:0;line-height:1.6}.credential-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:6px 0 105px}.credential{padding:26px;transform-origin:50% 75%;position:relative}.credential-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.credential-icon{display:grid;place-items:center;width:44px;height:44px;font-size:24px;border-radius:14px;background:linear-gradient(140deg,#eaf3ff,#bfd1ed);color:#6486b3;box-shadow:4px 4px 0 #b2c7e33d}.credential-index{font-size:11px;letter-spacing:2px;color:#8ca3c1}.credential h4{font-size:16px;line-height:1.5;margin:0 0 10px;min-height:48px}.credential p{font-size:12px;color:#6e839e;margin:0 0 20px;line-height:1.7}.credential-tag{display:inline-block;border:1px solid #c6d8ec;border-radius:10px;font-size:10px;padding:6px 9px;color:#6082ad;background:#eff6ff70}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}:global(.dark) .archery-range{background:linear-gradient(120deg,#273e5d60,#19283c80);border-color:#50698955}:global(.dark) .shoot{background:#253954;color:#bbd4f6;border-color:#5a779d}:global(.dark) .credential p{color:#b2c5df}:global(.dark) .credential-tag{background:#31496870;color:#bfdbff;border-color:#526f95}:global(.tamil) .cert-heading h3{font-family:Arial,sans-serif;font-size:29px;line-height:1.5}@media(max-width:850px){.credential-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:550px){.cert-heading{align-items:flex-start;flex-direction:column;gap:15px}.cert-heading h3{font-size:34px}.credential-grid{grid-template-columns:1fr;gap:16px}.credential{padding:22px}.credential h4{min-height:0}.credential-top{margin-bottom:15px}.archery-range{padding:10px}.archery-range svg{min-height:100px}.archery-range p{font-size:10px}.shoot{font-size:12px;padding:11px 16px}}@media(prefers-reduced-motion:reduce){.shoot{transition:none}}

.credential{border-color:#8db8eea6;animation:credential-glow 4s ease-in-out infinite}
.credential:hover{border-color:#79c8ff;box-shadow:0 0 0 1px #91d8ff66,0 0 32px #71baff66,inset 0 0 20px #b6ddff35}
@keyframes credential-glow{0%,100%{box-shadow:0 0 12px #76adf52e,inset 0 0 10px #b3d6ff18}50%{box-shadow:0 0 0 1px #99ceff55,0 0 24px #76adf552,inset 0 0 18px #b3d6ff35}}
:global(.dark) .credential{border-color:#88bdff88}
@media(prefers-reduced-motion:reduce){.credential{animation:none;box-shadow:0 0 16px #76adf538}}

.archery-range .target-challenge{display:flex;justify-content:center;align-items:center;gap:10px;font-size:clamp(17px,2.6vw,25px);line-height:1.5;margin:0;padding:6px 0 12px}
.target-challenge strong{font-weight:800;color:#aa3c12;background:linear-gradient(0deg,#9a2811 5%,#cc4211 42%,#eb7418 67%,#ab3b0c 95%);background-size:100% 200%;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:challenge-fire 2.5s ease-in-out infinite;text-shadow:0 -3px 14px #ff9c4340}
.flame{font-size:25px;display:inline-block;animation:flame-dance 2.1s ease-in-out infinite;filter:drop-shadow(0 0 7px #ff9d5366)}
.flame:last-child{animation-delay:-1s}
@keyframes challenge-fire{0%,100%{background-position:50% 100%;filter:drop-shadow(0 -2px 3px #ff9f3240)}50%{background-position:50% 0%;filter:drop-shadow(0 -5px 7px #ff8b3b66)}}
@keyframes flame-dance{0%,100%{transform:translateY(0) rotate(-4deg) scale(.96)}50%{transform:translateY(-3px) rotate(4deg) scale(1.08)}}
:global(.dark) .target-challenge strong{background-image:linear-gradient(0deg,#ff8d45,#ffd792,#ffae39,#fff0ba)}
@media(max-width:550px){.archery-range .target-challenge{font-size:17px;gap:7px}.flame{font-size:21px}}
@media(prefers-reduced-motion:reduce){.target-challenge strong,.flame{animation:none}}
</style>
