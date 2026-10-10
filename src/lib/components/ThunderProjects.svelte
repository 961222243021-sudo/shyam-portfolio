<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();let stage,active=$state(false);
onMount(()=>{const observer=new IntersectionObserver(([entry])=>active=entry.isIntersecting,{threshold:.15});observer.observe(stage);return()=>observer.disconnect()});
</script>
<div bind:this={stage} class="section-heading thunder-heading" class:active>
<div class="thunder-scene" aria-hidden="true">
<div class="storm-cloud"></div>
<div class="hammer-drop"><img src="/media/thor-cutout.png" width="1448" height="1086" alt="" loading="lazy"/></div>
<svg class="lightning" viewBox="0 0 640 210"><g fill="none" stroke-linejoin="miter" stroke-linecap="round"><g class="bolt-glow"><path d="M315 8L289 51L321 48L300 90L338 85L320 176M320 176L267 147L249 159L224 126L202 132L153 91L169 89L118 42M320 176L379 141L393 151L417 116L433 126L483 85L470 82L523 37M224 126L196 153L177 147L144 179M417 116L454 143L474 136L507 170"/></g><g class="bolt-core"><path d="M315 8L289 51L321 48L300 90L338 85L320 176M320 176L267 147L249 159L224 126L202 132L153 91L169 89L118 42M320 176L379 141L393 151L417 116L433 126L483 85L470 82L523 37M224 126L196 153L177 147L144 179M417 116L454 143L474 136L507 170"/></g></g></svg>
<span class="strike-wave"></span>
<div class="strike-sparks">{#each Array.from({length:8},(_,i)=>i) as i}<i style={'--dx:'+((i-3.5)*27)+'px;--dy:'+(-30-(i%3)*24)+'px'}></i>{/each}</div>
</div>
<div class="thunder-title"><p class="eyebrow">{tamil?'என் படைப்புகள்':'THINGS I HAVE BUILT'}</p><h2>{tamil?'சிறப்புப் படைப்புகள்':'highlighted projects'}</h2><p class="project-intro">{tamil?'பாதுகாப்பு ஆராய்ச்சிகள். பயனுள்ள கருவிகள். தமிழ் மீது அன்பு.':'Security experiments. Useful tools. A little love for Tamil.'}</p></div>
</div>
<style>
.thunder-heading{position:relative}.thunder-scene{height:210px;max-width:640px;position:relative;margin:0 auto 12px;pointer-events:none;overflow:hidden}
.storm-cloud{position:absolute;inset:0 15%;background:radial-gradient(ellipse,#749cdd30,transparent 70%);filter:blur(18px)}
.hammer-drop{position:absolute;width:120px;height:155px;left:50%;top:15px;margin-left:-60px;transform-origin:50% 10%;animation:hammer-strike 14s cubic-bezier(.45,0,.25,1) infinite;animation-play-state:paused;z-index:2}
.hammer-drop img{position:absolute;left:50%;transform:translateX(-50%);width:auto;height:100%;max-width:none;object-fit:contain;filter:drop-shadow(0 5px 7px #49689d33)}
.lightning{position:absolute;inset:0;width:100%;height:100%;opacity:0;animation:lightning-strike 14s linear infinite;animation-play-state:paused;z-index:3;filter:drop-shadow(0 0 8px #5aaaff)}
.bolt-glow{stroke:#70baff;stroke-width:8;opacity:.35}.bolt-core{stroke:#eaf7ff;stroke-width:2}
.strike-wave{position:absolute;width:140px;height:28px;left:50%;bottom:29px;border:2px solid #89c8ff;border-radius:50%;opacity:0;animation:strike-wave 14s ease-out infinite;animation-play-state:paused;box-shadow:0 0 16px #78baff66}
.strike-sparks{position:absolute;left:50%;bottom:43px}.strike-sparks i{position:absolute;width:3px;height:5px;background:#c7e9ff;box-shadow:0 0 8px #64b5ff;opacity:0;animation:strike-spark 14s ease-out infinite;animation-play-state:paused}
.thunder-title{animation:title-impact 14s linear infinite;animation-play-state:paused}.thunder-title h2{margin-bottom:12px;text-shadow:0 0 20px #80baff33}.project-intro{color:#718098;font-size:14px}
.active .hammer-drop,.active .lightning,.active .strike-wave,.active .strike-sparks i,.active .thunder-title{animation-play-state:running}
:global(.dark) .storm-cloud{background:radial-gradient(ellipse,#569dff33,transparent 70%)}:global(.dark) .project-intro{color:#aebbd1}:global(.dark) .hammer-drop img{filter:drop-shadow(0 0 10px #6eb5ff44)}
@keyframes hammer-strike{0%,8%{opacity:0;transform:translateY(-170px) rotate(-55deg)}12%{opacity:1;transform:translateY(-130px) rotate(-45deg)}25%{transform:translateY(15px) rotate(4deg);opacity:1}28%{transform:translateY(-12px) rotate(-7deg)}33%,82%{transform:translateY(0) rotate(0);opacity:1}95%,100%{opacity:0;transform:translateY(-160px) rotate(35deg)}}
@keyframes lightning-strike{0%,24%,31%,100%{opacity:0}25%{opacity:.9}26.5%{opacity:.25}28%{opacity:.7}30%{opacity:0}}
@keyframes strike-wave{0%,24%{opacity:0;transform:translateX(-50%) scale(.2)}25%{opacity:.8;transform:translateX(-50%) scale(.5)}34%{opacity:0;transform:translateX(-50%) scale(2.6)}100%{opacity:0}}
@keyframes strike-spark{0%,24%{opacity:0;transform:translate(0,0)}25%{opacity:1}32%{opacity:0;transform:translate(var(--dx),var(--dy))}100%{opacity:0}}
@keyframes title-impact{0%,24%,33%,100%{transform:translateY(0)}25%{transform:translateY(5px)}27%{transform:translateY(-3px)}30%{transform:translateY(1px)}}
@media(max-width:650px){.thunder-scene{height:180px}.hammer-drop{width:100px;height:130px;margin-left:-50px;top:15px}.strike-wave{bottom:23px}.strike-sparks{bottom:35px}.project-intro{font-size:12px}}
@media(prefers-reduced-motion:reduce){.hammer-drop{animation:none;opacity:1;transform:none}.lightning,.strike-wave,.strike-sparks{display:none}.thunder-title{animation:none}}
</style>
