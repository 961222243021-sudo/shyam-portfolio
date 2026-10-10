<script>
import {onMount} from 'svelte';
let {tamil=false}=$props();
const t=(en,ta)=>tamil?ta:en;
let root,scanning=$state(false),revealed=$state(false),scanTimer;
onMount(()=>{
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
   observer.disconnect();
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){revealed=true;return;}
   scanning=true;scanTimer=setTimeout(()=>{scanning=false;revealed=true;},2400);
  }
 },{threshold:.25});
 observer.observe(root);return()=>{observer.disconnect();clearTimeout(scanTimer);};
});
</script>
<article bind:this={root} class="research glass reveal scanner-paper" class:scanning class:revealed>
 <div class="paper-art scanner-art" aria-hidden="true">
  <span class="paper-corner top-left"></span><span class="paper-corner top-right"></span><span class="paper-corner bottom-left"></span><span class="paper-corner bottom-right"></span>
  <div class="document"><div class="document-heading">PLUTON</div><div class="document-subtitle">SECURITY RESEARCH</div><div class="document-mark">⌘</div><div class="document-lines"><i></i><i></i><i></i><i></i></div><span class="document-journal">IJACECT · 2026</span><span class="paper-laser"></span></div>
  <span class="paper-seal">✦</span>
 </div>
 <div class="scanner-copy">
  <p class="tag">{t('PUBLISHED RESEARCH · CO-AUTHOR','வெளியிடப்பட்ட ஆய்வு · இணை ஆசிரியர்')}</p>
  <h3 class="scan-title">PLUTON: A Discord-Based Command-and-Control (C2) Framework with Offensive Simulation and Detection Capabilities</h3>
  <p class="scan-description">{t('An educational research framework combining controlled offensive simulation with detection and defensive analysis.','கட்டுப்படுத்தப்பட்ட தாக்குதல் உருவகப்படுத்தல், கண்டறிதல் மற்றும் தற்காப்புப் பகுப்பாய்வை இணைக்கும் கல்வி ஆராய்ச்சித் தளம்.')}</p>
  <p class="citation scan-publication">IJACECT · Vol. 15, Issue 1 · pp. 190–194 · 18 April 2026</p>
  <a class="pill scan-link" href="https://doi.org/10.65521/ijacect.v15i1.2367" target="_blank" rel="noreferrer">{t('read the paper ↗','ஆய்வைப் படிக்க ↗')}</a>
 </div>
 <div class="scanner-beam" aria-hidden="true"></div>
</article>
<style>
.scanner-paper{position:relative;isolation:isolate;overflow:hidden}.scanner-art{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(ellipse at 50% 55%,#a2e0e745,transparent 70%),linear-gradient(145deg,#dfedfc,#c7ddef);min-height:290px}.document{position:relative;width:170px;min-height:225px;padding:23px 20px 17px;background:linear-gradient(125deg,#fff,#ecf7fc);border:1px solid #d4e5ef;border-radius:5px;box-shadow:8px 13px 25px #536d9428;transform:rotate(-6deg);transition:transform 1s;overflow:hidden}.document-heading{font:700 23px Lexend,Arial;letter-spacing:2px;color:#45638b}.document-subtitle{font:600 7px Lexend,Arial;letter-spacing:1px;margin-top:5px;color:#8094ad}.document-mark{width:53px;height:53px;margin:20px auto;border:1px solid #86b6c755;border-radius:50%;display:grid;place-items:center;font-size:27px;color:#74a3b5}.document-lines{display:flex;flex-direction:column;gap:6px}.document-lines i{height:3px;width:100%;background:#c5d6e3;border-radius:3px}.document-lines i:nth-child(2){width:85%}.document-lines i:last-child{width:65%}.document-journal{font:600 8px Lexend,Arial;display:block;margin-top:17px;color:#7b90aa}.paper-corner{position:absolute;width:22px;height:22px;border-color:#76aebf;border-style:solid;opacity:.6}.top-left{left:21px;top:21px;border-width:2px 0 0 2px}.top-right{right:21px;top:21px;border-width:2px 2px 0 0}.bottom-left{left:21px;bottom:21px;border-width:0 0 2px 2px}.bottom-right{right:21px;bottom:21px;border-width:0 2px 2px 0}.paper-seal{position:absolute;right:25px;bottom:25px;color:#90b8c8;font-size:25px;opacity:.5}.scanner-beam{position:absolute;inset:0;z-index:3;pointer-events:none;opacity:0;background:linear-gradient(180deg,transparent 15%,#77e4e71a 40%,#bcfffd80 49.2%,#efffff 50%,#80dbe666 50.8%,transparent 65%);transform:translateY(-100%)}.paper-laser{position:absolute;left:0;right:0;top:0;height:3px;background:#adffff;box-shadow:0 0 18px 6px #81d7e6;opacity:0}.scanning .scanner-beam{animation:sweep 1.9s ease-in-out both}.scanning .paper-laser{animation:paper-scan 1.7s ease-in-out both}.scanning .document,.revealed .document{transform:rotate(0)}.scanning .paper-corner{animation:corner-glow 1.9s both}.scanning .scan-title{animation:uncover .65s .55s both}.scanning .scan-description{animation:uncover .65s .85s both}.scanning .scan-publication{animation:uncover .65s 1.15s both}.scanning .scan-link{animation:uncover .65s 1.45s both}.revealed .paper-seal{opacity:1;color:#71a5b7}.scanner-copy{min-width:0}.scanner-copy h3{overflow-wrap:break-word}.scan-link:focus-visible{opacity:1!important;transform:none!important}@keyframes sweep{0%{opacity:0;transform:translateY(-100%)}12%{opacity:1}88%{opacity:1}100%{opacity:0;transform:translateY(100%)}}@keyframes paper-scan{0%{opacity:0;top:0}12%{opacity:1}85%{opacity:1}100%{opacity:0;top:100%}}@keyframes uncover{from{opacity:.15;filter:blur(4px);transform:translateY(8px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}@keyframes corner-glow{50%{opacity:1;filter:drop-shadow(0 0 8px #89e3eb)}}@media(prefers-reduced-motion:reduce){.scanner-beam,.paper-laser{display:none}.document{transition:none;transform:none}.scanning .scan-title,.scanning .scan-description,.scanning .scan-publication,.scanning .scan-link,.scanning .paper-corner{animation:none}}
</style>
