<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();let stage,active=$state(false),revealed=$state(false);
onMount(()=>{const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active)revealed=true},{threshold:.2});observer.observe(stage);return()=>observer.disconnect()});
</script>
<div bind:this={stage} class="orb-education" class:active class:revealed>
<div class="orb-scene" aria-hidden="true"><div class="orb-aura"></div>
<div class="orb-sprite"><img src="/media/education-sprites.png" alt=""/></div>
<svg class="pull-rope" viewBox="0 0 420 180"><path d="M130 105C210 145 260 65 310 65" fill="none" stroke="#548a9d" stroke-width="2.2" stroke-linecap="round">{#if active}<animate attributeName="d" values="M130 105C210 145 260 65 310 65;M210 105C240 110 290 80 325 65;M210 100C250 116 285 85 325 65;M130 105C210 145 260 65 310 65" keyTimes="0;.35;.75;1" dur="8s" repeatCount="indefinite"/>{/if}</path></svg>
<div class="explorer-sprite"><img src="/media/education-sprites.png" alt=""/></div>
<div class="orb-ring"></div><div class="orb-dust">{#each Array.from({length:6},(_,i)=>i) as i}<span style={'--i:'+i}>✦</span>{/each}</div></div>
<div class="education degree-bar"><span>2022–2026</span><h3>{tamil?'B.Tech · செயற்கை நுண்ணறிவு & தரவு அறிவியல்':'B.Tech · Artificial Intelligence & Data Science'}</h3><p>Loyola Institute of Technology and Science · Anna University</p><div class="degree-scan" aria-hidden="true"></div></div>
</div>
<style>
.orb-education{margin:28px 0 35px}.orb-scene{position:relative;width:420px;max-width:100%;height:180px;margin:0 auto;overflow:hidden;pointer-events:none}
.orb-aura{position:absolute;inset:10px 50px;background:radial-gradient(ellipse,#71dedb28,transparent 70%);filter:blur(15px)}
.orb-sprite,.explorer-sprite{position:absolute;overflow:hidden}.orb-sprite{left:0;top:0;width:200px;height:180px;animation:orb-tug 8s ease-in-out infinite;animation-play-state:paused}.orb-sprite img{position:absolute;width:400px;max-width:none;height:auto;left:0;top:50%;transform:translateY(-50%)}
.explorer-sprite{left:290px;top:15px;width:80px;height:150px;animation:explorer-tug 8s ease-in-out infinite;animation-play-state:paused}.explorer-sprite img{position:absolute;width:800px;max-width:none;height:auto;left:-620px;top:50%;transform:translateY(-50%)}
.pull-rope{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 0 3px #75d8db44)}
.orb-ring{position:absolute;left:95px;bottom:15px;width:120px;height:22px;border:1px solid #67c4c8;border-radius:50%;opacity:0;animation:orb-ring 8s ease-out infinite;animation-play-state:paused;box-shadow:0 0 12px #8be8e944}
.orb-dust span{position:absolute;left:calc(17% + var(--i)*10%);top:calc(20px + var(--i)*15px);color:#56afb9;font-size:12px;opacity:0;animation:orb-dust 8s calc(var(--i)*.1s) ease-out infinite;animation-play-state:paused}
.degree-bar{position:relative;overflow:hidden;margin:5px 0 0!important;border-left-color:#65b8c4!important;box-shadow:0 0 18px #7acbda20;opacity:0;transform:translateY(15px)}
.revealed .degree-bar{animation:degree-reveal 1s 2s both}
.degree-scan{position:absolute;inset:0;background:linear-gradient(100deg,transparent 35%,#8ce8ee33 50%,transparent 65%);transform:translateX(-110%);animation:degree-scan 8s ease-in-out infinite;animation-play-state:paused;pointer-events:none}
.active .orb-sprite,.active .explorer-sprite,.active .orb-ring,.active .orb-dust span,.active .degree-scan{animation-play-state:running}
:global(.dark) .degree-bar{box-shadow:0 0 22px #7acbda25}:global(.dark) .pull-rope path{stroke:#8acdd5}
@keyframes orb-tug{0%,100%{transform:translateX(-50px) rotate(-8deg)}35%{transform:translateX(30px) rotate(12deg)}75%{transform:translate(30px,-5px) rotate(8deg)}}
@keyframes explorer-tug{0%,100%{transform:translateX(0) rotate(-5deg)}35%,75%{transform:translateX(15px) rotate(6deg)}}
@keyframes orb-ring{0%,32%,100%{opacity:0;transform:scale(.5)}35%{opacity:.7;transform:scale(.7)}50%{opacity:0;transform:scale(1.7)}}
@keyframes orb-dust{0%,30%,60%,100%{opacity:0;transform:translateY(10px) scale(.5)}38%{opacity:.8;transform:translateY(-12px) scale(1)}55%{opacity:0;transform:translateY(-35px) scale(.8)}}
@keyframes degree-reveal{from{opacity:0;transform:translateY(15px);filter:blur(5px)}to{opacity:1;transform:none;filter:blur(0)}}
@keyframes degree-scan{0%,35%{transform:translateX(-110%)}55%,100%{transform:translateX(110%)}}
@media(max-width:500px){.orb-scene{width:300px;height:140px}.orb-sprite{width:150px;height:135px}.orb-sprite img{width:300px}.explorer-sprite{left:210px;top:10px;width:60px;height:112px}.explorer-sprite img{width:600px;left:-465px}.orb-ring{left:65px;width:90px;bottom:5px}.degree-bar{padding:20px!important}.degree-bar h3{font-size:15px!important}}
@media(prefers-reduced-motion:reduce){.orb-education *{animation:none!important}.degree-bar{opacity:1;transform:none}.orb-ring,.orb-dust,.degree-scan{display:none}}
</style>
