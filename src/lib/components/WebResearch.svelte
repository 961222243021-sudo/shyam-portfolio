<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();
let stage,active=$state(false);
onMount(()=>{
 const section=stage.closest('#research');
 const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;section.classList.toggle('web-active',active);},{threshold:.15});
 observer.observe(stage);return()=>{observer.disconnect();section.classList.remove('web-active')};
});
</script>
<div bind:this={stage} class="section-heading web-heading" class:active>
<div class="web-scene" aria-hidden="true">
<svg class="corner-web" viewBox="0 0 200 180"><g fill="none" stroke="currentColor" stroke-width="1.3"><path d="M0 0L195 0M0 0L184 62M0 0L146 122M0 0L78 165M0 0V180M40 0Q33 12 37 13Q26 22 29 25Q14 29 16 33Q0 31 0 37M90 0Q75 27 84 28Q60 51 67 56Q32 63 36 76Q0 69 0 85M145 0Q122 43 135 45Q98 82 108 90Q53 105 59 124Q0 110 0 138M195 0Q165 57 184 62Q133 110 146 122Q68 143 78 165Q0 152 0 180"/></g></svg>
<div class="spider-swing"><span class="web-rope"></span><img src="/media/spider.webp" width="320" height="240" alt=""/><span class="web-grip"></span></div>
<svg class="tiny-spider" viewBox="0 0 60 125"><path d="M30 0V78" stroke="currentColor"/><g stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"><path d="M23 94L11 86L6 76M23 98L8 96L3 88M23 104L10 109L5 116M25 108L20 119M37 94L49 86L54 76M37 98L52 96L57 88M37 104L50 109L55 116M35 108L40 119"/><ellipse cx="30" cy="96" rx="9" ry="13"/><circle cx="30" cy="111" r="5"/></g></svg>
<svg class="web-burst" viewBox="0 0 200 200"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M100 0V200M0 100H200M29 29L171 171M29 171L171 29M100 60Q110 75 128 72Q125 90 140 100Q125 110 128 128Q110 125 100 140Q90 125 72 128Q75 110 60 100Q75 90 72 72Q90 75 100 60ZM100 25Q120 52 153 47Q148 80 175 100Q148 120 153 153Q120 148 100 175Q80 148 47 153Q52 120 25 100Q52 80 47 47Q80 52 100 25Z"/></g></svg>
</div>
<p class="eyebrow">{tamil?'பதிவான சிந்தனைகள்':'IDEAS, DOCUMENTED'}</p><h2>{tamil?'ஆய்வு & எழுத்து':'research & writing'}</h2>
</div>
<style>
.web-heading{position:relative}.web-scene{position:relative;height:235px;max-width:640px;margin:0 auto 10px;pointer-events:none;overflow:hidden}
.corner-web{position:absolute;left:0;top:0;width:160px;height:145px;color:#7c9dc36b}
.spider-swing{position:absolute;left:50%;top:0;width:150px;height:208px;margin-left:-75px;transform-origin:50% 0;animation:spider-swing 12s ease-in-out infinite;animation-play-state:paused}
.web-rope{position:absolute;top:0;left:50%;width:2px;height:90px;background:linear-gradient(#7899c3,#f4f8ff);box-shadow:0 0 4px #81b1ed88}
.spider-swing img{position:absolute;top:88px;left:0;width:150px;height:113px;object-fit:cover;border-radius:14px;border:1px solid #93b3db;box-shadow:0 10px 24px #24466f30}
.web-grip{position:absolute;left:calc(50% - 4px);top:83px;width:8px;height:8px;border-radius:50%;background:#dcecff}
.tiny-spider{position:absolute;right:14%;top:0;width:42px;height:120px;color:#c24353;transform-origin:50% 0;animation:tiny-sway 4s ease-in-out infinite;animation-play-state:paused}
.web-burst{position:absolute;width:185px;height:185px;left:50%;bottom:-25px;transform:translateX(-50%);color:#719bcc;opacity:0;animation:web-impact 12s linear infinite;animation-play-state:paused}
.active .spider-swing,.active .tiny-spider,.active .web-burst{animation-play-state:running}
.web-heading h2{position:relative;text-shadow:0 0 20px #83b6ec33}
:global(.dark) .corner-web{color:#b8d9ff55}:global(.dark) .web-rope{background:#dceaff}:global(.dark) .web-burst{color:#cee5ff}:global(.dark) .spider-swing img{border-color:#abcaf1;box-shadow:0 0 24px #80b8ff33}
@keyframes spider-swing{0%{transform:rotate(-42deg) translateY(-35px);opacity:0}6%{opacity:1}20%{transform:rotate(30deg)}32%{transform:rotate(-16deg)}42%{transform:rotate(0) translateY(12px)}46%{transform:rotate(5deg) translateY(-6px)}52%,80%{transform:rotate(0);opacity:1}92%,100%{transform:rotate(42deg) translateY(-70px);opacity:0}}
@keyframes web-impact{0%,40%{opacity:0;transform:translateX(-50%) scale(.2)}42%{opacity:.85;transform:translateX(-50%) scale(.7)}49%{opacity:.55;transform:translateX(-50%) scale(1.2)}58%,100%{opacity:0;transform:translateX(-50%) scale(1.4)}}
@keyframes tiny-sway{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
@media(max-width:650px){.web-scene{height:210px}.spider-swing{width:125px;margin-left:-62.5px}.spider-swing img{width:125px;height:94px}.corner-web{width:100px;height:90px}.tiny-spider{right:5%;width:30px}.web-burst{width:150px;height:150px}}
@media(prefers-reduced-motion:reduce){.spider-swing{animation:none;transform:none;opacity:1}.tiny-spider{animation:none}.web-burst{display:none}}
</style>
