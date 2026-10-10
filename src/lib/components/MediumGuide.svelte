<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();
let root,visible=$state(false);
onMount(()=>{
 const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){visible=true;observer.disconnect();}},{threshold:.35});
 observer.observe(root);return()=>observer.disconnect();
});
</script>
<div bind:this={root} class="medium-guide" class:visible>
 <div class="mascot"><div class="bubble">{tamil?'படித்துப் பாருங்கள்!':'Read it!'} <span>↓</span></div><img src="/media/developer-yoga.svg" alt={tamil?'எழுத்துகளைப் படிக்க அழைக்கும் கதாபாத்திரம்':'Animated character inviting you to read the articles'} width="500" height="500" loading="lazy"/></div>
 <div class="ledge" aria-hidden="true"></div>
</div>
<style>
.medium-guide{height:205px;position:relative;display:flex;justify-content:flex-end;align-items:flex-end;margin:12px 0 -12px;pointer-events:none;z-index:2}.mascot{position:relative;width:240px;height:200px;margin-right:7%;opacity:0;transform:translateY(65px) scale(.65);transform-origin:center bottom;transition:opacity .4s,transform .8s cubic-bezier(.2,1.5,.4,1)}.visible .mascot{opacity:1;transform:translateY(0) scale(1)}img{width:210px;height:210px;object-fit:contain;position:absolute;bottom:-10px;left:0;filter:drop-shadow(0 9px 9px #65758c22)}.bubble{position:absolute;right:-25px;top:8px;z-index:2;padding:12px 17px;background:#f4fbff;border:1px solid #94b2d455;border-radius:18px 18px 18px 3px;color:#567cad;font-weight:700;font-size:15px;box-shadow:0 8px 25px #607dab15;white-space:nowrap;opacity:0;transform:translateY(10px) rotate(-7deg)}.visible .bubble{animation:talk 5s .6s ease-in-out infinite}.bubble span{display:inline-block;color:#8b73cb;margin-left:3px}.ledge{position:absolute;bottom:3px;right:8%;width:185px;height:12px;border-radius:50%;background:#7998c72b;filter:blur(4px);z-index:-1}@keyframes talk{0%,100%{opacity:1;transform:translateY(0) rotate(-4deg)}50%{opacity:1;transform:translateY(-6px) rotate(1deg)}}@media(max-width:650px){.medium-guide{height:175px}.mascot{width:205px;height:170px;margin-right:12%}img{width:180px;height:180px}.bubble{font-size:12px;right:-30px}}@media(prefers-reduced-motion:reduce){.mascot{opacity:1;transform:none;transition:none}.visible .bubble,.bubble{opacity:1;transform:none;animation:none}}
</style>
