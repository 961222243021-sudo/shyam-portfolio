<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();
let stage, shown=$state(false);
onMount(()=>{
 const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){shown=true;observer.disconnect();}},{threshold:.2});
 observer.observe(stage);return()=>observer.disconnect();
});
</script>
<div bind:this={stage} class="identity-magic section-heading" class:shown>
<div class="smoke-scene" aria-hidden="true">
<div class="smoke-aura"></div>
<div class="genie-emerge"><div class="genie-float"><div class="genie-crop"><svg class="genie-image" viewBox="0 0 1024 768"><defs><filter id="genie-blue" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 .18 0 0 0 0 .38 0 0 0 0 .78 -.3333 -.3333 -.3333 0 1"/></filter></defs><image href="/media/genie.png" width="1024" height="768" filter="url(#genie-blue)"/></svg></div></div></div>
<div class="smoke-clouds">{#each Array.from({length:7},(_,i)=>i) as i}<span style={'--i:'+i+';--drift:'+((i-3)*24)+'px;--delay:'+(-i*.6)+'s'}></span>{/each}</div>
<svg class="little-lamp" viewBox="0 0 120 60" fill="none"><path d="M26 35Q10 18 13 40Q16 49 32 46M29 34Q50 47 77 29L107 22Q105 38 81 43Q75 55 46 53Q31 49 29 34Z" fill="url(#lamp-gold)" stroke="#9d782c" stroke-width="2"/><path d="M42 32Q54 21 69 32M55 23V18M43 54H72" stroke="#e0ae52" stroke-width="3" stroke-linecap="round"/><defs><linearGradient id="lamp-gold"><stop stop-color="#f5d28a"/><stop offset="1" stop-color="#ae8038"/></linearGradient></defs></svg>
<div class="magic-stars">{#each ['✦','✧','✦'] as star,i}<span style={'--i:'+i}>{star}</span>{/each}</div>
</div>
<div class="identity-title"><p class="eyebrow">{tamil?'நிரலுக்குப் பின்னால்':'THE HUMAN BEHIND THE CODE'}</p><h2>{tamil?'நான் யார்?':'who am i?'}</h2></div>
</div>
<style>
.identity-magic{position:relative;margin-bottom:38px}
.smoke-scene{height:250px;width:min(100%,450px);position:relative;margin:0 auto;pointer-events:none}
.smoke-aura{position:absolute;inset:20px 35px;background:radial-gradient(ellipse,#7dc6ff42,transparent 70%);filter:blur(15px);opacity:0;transition:opacity 1.5s}.shown .smoke-aura{opacity:1}
.genie-emerge{position:absolute;inset:0;opacity:0;transform-origin:50% 95%}.shown .genie-emerge{animation:genie-rise 1.9s cubic-bezier(.16,1,.3,1) both}
.genie-float{height:100%}.shown .genie-float{animation:genie-float 6s ease-in-out 1.9s infinite}
.genie-crop{position:absolute;left:50%;top:6px;width:350px;height:210px;transform:translateX(-50%);overflow:hidden}
.genie-crop .genie-image{position:absolute;width:760px;max-width:none;height:570px;left:50%;top:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 0 12px #66b9ff38)}
:global(.dark) .genie-crop{mix-blend-mode:screen}:global(.dark) .genie-crop .genie-image{filter:invert(1) hue-rotate(155deg)}
.smoke-clouds{position:absolute;left:50%;bottom:13px;width:1px;height:1px;opacity:0}.shown .smoke-clouds{opacity:1}
.smoke-clouds span{position:absolute;left:-45px;bottom:0;width:90px;height:70px;border-radius:50%;background:radial-gradient(ellipse,#59aeff7a,#8ecfff33 45%,transparent 72%);filter:blur(10px);animation:smoke-rise 4.8s var(--delay) ease-out infinite;animation-play-state:paused}.shown .smoke-clouds span{animation-play-state:running}
.little-lamp{position:absolute;width:80px;height:40px;bottom:-1px;left:50%;transform:translateX(-50%);filter:drop-shadow(0 0 10px #9ed7ff99)}
.magic-stars span{position:absolute;top:calc(50px + var(--i)*38px);left:calc(15% + var(--i)*32%);color:#5eabeb;font-size:calc(13px + var(--i)*3px);opacity:0}.shown .magic-stars span{animation:star-twinkle 3s calc(var(--i)*.65s) infinite}
.identity-title{opacity:0}.shown .identity-title{animation:identity-reveal 1.1s 1s both}.identity-title h2{text-shadow:0 0 24px #6fbcff55;margin-bottom:12px}
@keyframes genie-rise{0%{opacity:0;filter:blur(18px);transform:translateY(110px) scale(.15)}55%{opacity:.85}100%{opacity:1;filter:blur(0);transform:translateY(0) scale(1)}}
@keyframes genie-float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-9px) rotate(1deg)}}
@keyframes smoke-rise{0%{opacity:0;transform:translate(0,0) scale(.3)}20%{opacity:.8}100%{opacity:0;transform:translate(var(--drift),-210px) scale(2)}}
@keyframes identity-reveal{from{opacity:0;filter:blur(10px);transform:translateY(16px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
@keyframes star-twinkle{0%,100%{opacity:0;transform:scale(.6)}50%{opacity:1;transform:scale(1.1)}}
@media(max-width:650px){.smoke-scene{height:210px;width:320px;max-width:100%}.genie-crop{width:280px;height:170px}.genie-crop .genie-image{width:600px;height:450px}.little-lamp{width:70px}.identity-magic{margin-bottom:28px}}
@media(prefers-reduced-motion:reduce){.genie-emerge,.identity-title,.smoke-aura{opacity:1;transform:none}.smoke-clouds,.magic-stars{display:none}.identity-magic *{animation:none!important}}
</style>
