<script>
import {onMount} from 'svelte';
import gsap from 'gsap';
let {projects=[],tamil=false,onfinish=()=>{}}=$props();
let stage=$state(0),landing=$state(false),overlay,emblem,mark,finalLogo;
const t=(en,ta)=>tamil?ta:en;
const radial=(rx,ry,star=false)=>Array.from({length:16},(_,i)=>{const a=i*Math.PI/8-Math.PI/2,r=star&&i%2?.55:1;return (Math.cos(a)*rx*r).toFixed(2)+','+(Math.sin(a)*ry*r).toFixed(2)}).join(' ');
const shapes=[
 '0,-53 25,-45 45,-35 45,-12 42,12 32,30 18,44 0,54 -18,44 -32,30 -42,12 -45,-12 -45,-35 -25,-45 -12,-49 -6,-51',
 radial(53,53,true),
 radial(55,34),
 '-52,-35 -30,-40 -12,-35 0,-27 12,-35 30,-40 52,-35 52,39 30,34 12,39 0,47 -12,39 -30,34 -52,39 -52,12 -52,-12',
 '-38,-51 -12,-51 12,-51 38,-51 48,-40 48,-12 48,12 48,40 38,51 12,51 -12,51 -38,51 -48,40 -48,12 -48,-12 -48,-40',
 '-12,-52 12,-52 12,-35 24,-35 24,-18 37,-18 37,0 50,0 50,48 20,48 20,18 -20,18 -20,48 -50,48 -50,0 -12,-35'
];
onMount(()=>{
 let done=false;
 const complete=()=>{if(done)return;done=true;onfinish();};
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){const id=setTimeout(complete,700);return()=>clearTimeout(id);}
 const tl=gsap.timeline({onComplete:complete});
 gsap.set(emblem,{opacity:0});gsap.set(finalLogo,{opacity:0});
 for(let i=0;i<projects.length;i++){
  const at=i*.19;
  tl.call(()=>stage=i,[],at)
   .to(emblem,{opacity:1,attr:{points:shapes[i%shapes.length]},duration:.15,ease:'power2.inOut'},at)
   .fromTo(mark,{scale:.82,opacity:.25},{scale:1,opacity:1,duration:.14,ease:'power2.out'},at);
 }
 const end=projects.length*.19;
 tl.call(()=>stage=projects.length,[],end)
 .to(emblem,{opacity:0,scale:.6,duration:.14},end)
 .fromTo(finalLogo,{opacity:0,scale:.55},{opacity:1,scale:1,duration:.17,ease:'power2.out'},end)
 .call(()=>{
  landing=true;
  const target=document.querySelector('.nav .logo')?.getBoundingClientRect();
  const x=target?target.left+target.width/2:50,y=target?target.top+target.height/2:50;
  gsap.to(finalLogo,{x:x-window.innerWidth/2,y:y-window.innerHeight/2,scale:.28,duration:.5,ease:'power3.inOut'});
 },[],end+.2)
 .to(overlay,{backgroundColor:'rgba(9,11,16,0)',duration:.48},end+.2)
 .to(finalLogo,{opacity:0,duration:.08},end+.7);
 return()=>{tl.kill();gsap.killTweensOf(finalLogo);};
});
</script>
<div bind:this={overlay} class="refined-reel" class:landing role="status" aria-label={t('Shyam and his projects','ஷ்யாம் மற்றும் அவரது படைப்புகள்')}>
 <div class="reel-center">
  <svg class="morph-logo" viewBox="-70 -70 140 140" aria-hidden="true">
   <polygon bind:this={emblem} points={shapes[0]} class="morph-shell"/>
   <g bind:this={mark} class="mark-core" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none">
    {#if stage===0}<path d="M0 -25V0M0 0L-23 22M0 0L23 22"/><circle cx="0" cy="-25" r="6"/><circle cx="-23" cy="22" r="6"/><circle cx="23" cy="22" r="6"/><circle cx="0" cy="0" r="5"/>
    {:else if stage===1}<path d="M0 -30V30M-26 -15L26 15M-26 15L26 -15M-7 -23L0 -16L7 -23M-7 23L0 16L7 23"/>
    {:else if stage===2}<circle cx="0" cy="0" r="18"/><circle cx="0" cy="0" r="6" fill="currentColor"/><path d="M-36 0H-28M28 0H36M0 -27V-23M0 23V27"/>
    {:else if stage===3}<path d="M-33 -17Q-16 -23 0 -10Q16 -23 33 -17V22Q16 16 0 29Q-16 16 -33 22ZM0 -10V29M-25 -7L-9 -5M9 -5L25 -7M-25 3L-9 5M9 5L25 3"/>
    {:else if stage===4}<path d="M-27 -29H27V-13H-27ZM-27 0H-18M-27 13H-18M-27 26H-18M17 -6L3 14H17L3 35"/>
    {:else if stage===5}<path d="M-28 1H28M-21 -15H21M-12 -31H12M-35 38V12H35V38"/><text x="0" y="36" text-anchor="middle" fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-size="24">அ</text>
    {/if}
   </g>
  </svg>
  <div bind:this={finalLogo} class="final-sj" aria-hidden="true">SJ<span>•</span></div>
 </div>
 <span class="accessible-project">{stage>=0&&stage<projects.length?t(projects[stage].title,projects[stage].ta):'Shyam J'}</span>
</div>
<style>
.refined-reel{position:fixed;inset:0;background:#090b10;z-index:1100;overflow:hidden;color:#f4f4ee;pointer-events:none}.reel-center{position:absolute;left:50%;top:50%;width:120px;height:120px;margin:-60px 0 0 -60px}.face-logo{position:absolute;inset:7px;overflow:hidden;border-radius:50%;border:1px solid #d7dedb44;box-shadow:0 0 25px #b5c3d40a}.face-logo.hidden{visibility:hidden}.face-logo img{position:absolute;width:480%;height:360%;max-width:none;left:-173%;top:-103%;object-fit:fill}.morph-logo{position:absolute;inset:0;width:120px;height:120px;overflow:visible;color:#f4f4ee}.morph-shell{fill:#ffffff08;stroke:#f4f4ee;stroke-width:2.4;stroke-linejoin:round}.mark-core{transform-origin:center}.final-sj{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Lexend,Arial,sans-serif;font-size:83px;line-height:1;font-weight:900;letter-spacing:-8px;color:#f4f4ee;transform-origin:center;will-change:transform}.final-sj span{font-size:40px;letter-spacing:0;color:#9ee6d1}.accessible-project{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.landing .mark-core{opacity:0!important}@media(prefers-reduced-motion:reduce){.final-sj{display:none}.face-logo{visibility:visible}}
</style>