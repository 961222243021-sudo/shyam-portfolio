<script>
import {onMount} from 'svelte';
let {projects=[],tamil=false,onfinish=()=>{}}=$props();
let step=$state(0),reduced=$state(false);
const timers=[];let complete=false;
const t=(en,ta)=>tamil?ta:en;
function finish(){if(complete)return;complete=true;timers.forEach(clearTimeout);onfinish();}
onMount(()=>{
 reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced){timers.push(setTimeout(finish,900));return()=>timers.forEach(clearTimeout);}
 for(let i=1;i<=projects.length+1;i++)timers.push(setTimeout(()=>step=i,700+(i-1)*350));
 timers.push(setTimeout(finish,700+projects.length*350+650));
 return()=>timers.forEach(clearTimeout);
});
</script>
<div class="project-reel" class:light={step>0&&step%2===0} class:reduced role="dialog" aria-modal="true" aria-label={t('Shyam’s project introduction','ஷ்யாமின் படைப்புகள் அறிமுகம்')}>
 <div class="reel-grain" aria-hidden="true"></div>
 <header><span>SHYAM J / {t('THE WORK','படைப்புகள்')}</span><button onclick={finish}>{t('skip intro ↗','அறிமுகத்தைத் தவிர் ↗')}</button></header>
 {#key step}
 <div class="reel-frame">
 {#if step===0}
  <div class="portrait-frame"><img src="/media/shyam-reel-photo.jpg" alt="Shyam J at his laptop" width="1280" height="960"/><span class="portrait-border"></span></div>
  <p class="reel-kicker">{t('A CURIOUS HUMAN. A WORLD OF IDEAS.','ஒரு ஆர்வமுள்ள மனிதன். பல யோசனைகள்.')}</p><h1 class="portrait-name">Shyam <em>J.</em></h1>
 {:else if step<=projects.length}
  {@const project=projects[step-1]}
  <div class="project-emblem" style={'--accent:'+project.color}><span class="emblem-orbit"></span><span class="emblem-orbit second"></span><span class="project-glyph">{project.glyph}</span><i></i><i></i><i></i></div>
  <p class="reel-kicker">0{step} / 0{projects.length} · {project.tag}</p><h1>{t(project.title,project.ta)}</h1>
 {:else}
  <div class="end-monogram">SJ<span>•</span></div><p class="reel-kicker">{t('SECURITY. SOFTWARE. CURIOSITY.','பாதுகாப்பு. மென்பொருள். ஆர்வம்.')}</p><h1>{t('Welcome to my world.','என் உலகிற்கு வரவேற்கிறோம்.')}</h1>
 {/if}
 </div><div class="reel-wipe" aria-hidden="true"></div>
 {/key}
 <footer><span>{t('FROM TIRUNELVELI, TAMIL NADU','திருநெல்வேலி, தமிழ்நாடு')}</span><div class="reel-progress" aria-hidden="true">{#each Array.from({length:projects.length+2},(_,i)=>i) as i}<span class:done={step>=i}></span>{/each}</div><span>SJ ✦</span></footer>
</div>
<style>
.project-reel{position:fixed;inset:0;z-index:1100;isolation:isolate;overflow:hidden;background:#090c12;color:#f5f5f0;transition:background .3s,color .3s;font-family:Lexend,Arial,sans-serif}.project-reel.light{background:#f0eee8;color:#171c28}.project-reel header,.project-reel footer{position:absolute;left:5%;right:5%;display:flex;align-items:center;justify-content:space-between;gap:20px;font-size:10px;letter-spacing:1.7px;z-index:10}.project-reel header{top:30px}.project-reel header button{font:inherit;color:inherit;background:transparent;border:1px solid #9995;padding:10px 15px;border-radius:25px;cursor:pointer}.project-reel button:focus-visible{outline:2px solid #b4a1e4;outline-offset:4px}.project-reel footer{bottom:30px;font-size:9px}.reel-frame{position:absolute;inset:70px 6%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;animation:frame-enter .22s cubic-bezier(.2,1,.3,1) both}.reel-frame h1{font-size:clamp(28px,5vw,68px);font-weight:800;letter-spacing:-2px;line-height:1.2;margin:10px 0;max-width:1000px;overflow-wrap:break-word}.reel-kicker{font-size:clamp(8px,1vw,11px);line-height:1.8;letter-spacing:2px;opacity:.6;margin:24px 0 0;max-width:750px}.portrait-frame{position:relative;width:min(390px,55vh);height:min(290px,39vh);overflow:hidden;border-radius:10px;box-shadow:0 0 70px #99c9e51b;transform:rotate(-3deg)}.portrait-frame img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 52%;animation:portrait-focus .7s ease-out both}.portrait-border{position:absolute;inset:9px;border:1px solid #ffffff42;border-radius:6px}.portrait-name em{font-style:normal;color:#a3edda}.project-emblem{position:relative;width:200px;height:180px;display:grid;place-items:center;isolation:isolate}.project-glyph{display:grid;place-items:center;width:125px;height:125px;border:1px solid color-mix(in srgb,var(--accent) 70%,transparent);border-radius:28px;background:color-mix(in srgb,var(--accent) 10%,transparent);color:var(--accent);font-size:75px;font-weight:800;box-shadow:0 0 50px color-mix(in srgb,var(--accent) 22%,transparent);animation:emblem-build .22s cubic-bezier(.2,1.3,.4,1) both}.emblem-orbit{position:absolute;inset:0;border:1px solid #9dacc633;border-radius:50%;transform:rotate(-25deg) scaleY(.7);z-index:-1;animation:emblem-orbit .3s ease-out both}.emblem-orbit.second{transform:rotate(60deg) scaleY(.65);inset:-10px}.project-emblem i{position:absolute;top:0;left:50%;width:4px;height:4px;background:var(--accent);border-radius:50%;box-shadow:0 0 12px var(--accent);animation:orbit-spark .3s both}.project-emblem i:nth-of-type(2){left:12%;top:75%;animation-delay:.04s}.project-emblem i:nth-of-type(3){left:85%;top:60%;animation-delay:.08s}.end-monogram{font-size:clamp(100px,18vw,190px);font-weight:900;line-height:1;letter-spacing:-18px;animation:emblem-build .7s both}.end-monogram span{color:#9cebdc;font-size:.65em;letter-spacing:0}.reel-wipe{position:absolute;inset:0;z-index:5;pointer-events:none;background:currentColor;animation:reel-wipe .16s cubic-bezier(.6,0,.2,1) both}.reel-progress{display:flex;gap:5px}.reel-progress span{width:25px;height:2px;background:#9aa3b233}.reel-progress span.done{background:currentColor}.reel-grain{position:absolute;inset:0;background-image:radial-gradient(#a9b9cb22 .6px,transparent .6px);background-size:5px 5px;opacity:.16;pointer-events:none}@keyframes frame-enter{from{opacity:0;transform:translateY(20px) scale(.9);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}@keyframes portrait-focus{from{transform:scale(1.08)}to{transform:scale(1)}}@keyframes emblem-build{from{transform:rotate(-18deg) scale(.2);opacity:0;filter:blur(8px)}to{transform:rotate(0) scale(1);opacity:1;filter:none}}@keyframes emblem-orbit{from{opacity:0;scale:.2}to{opacity:1;scale:1}}@keyframes orbit-spark{from{transform:scale(0)}50%{transform:scale(2)}to{transform:scale(1)}}@keyframes reel-wipe{from{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}to{clip-path:polygon(100% 0,100% 0,100% 100%,100% 100%)}}@media(max-width:650px){.project-reel footer>span:first-child{display:none}.reel-frame h1{letter-spacing:-1px}.portrait-frame{width:280px;height:210px}.project-reel header{font-size:8px;letter-spacing:1px}.reel-progress span{width:17px}}@media(prefers-reduced-motion:reduce){.project-reel,.reel-frame,.portrait-frame img,.project-glyph,.emblem-orbit,.project-emblem i,.end-monogram{animation:none;transition:none;transform:none;filter:none}.reel-wipe{display:none}}
</style>