<script>
import {onMount} from 'svelte';
import gsap from 'gsap';
let preview=$state(),grid=$state(),root=$state(),timeline,ready=$state(false),phase=$state('Preparing your world…'),scene=$state('loading'),reduce=$state(false),alive=true;
function returnHome(){window.location.assign('/')}
async function copyWorld(){
 if(ready||!alive)return;
 try{
 const doc=preview.contentDocument;
 const selectors=['.hero-copy','.project','.about-copy .intro','.education','.skills','.experience','.research','.blog','.contact'];
 const nodes=selectors.flatMap(selector=>Array.from(doc.querySelectorAll(selector)));
 if(!nodes.length)return;
 nodes.forEach((node,i)=>{
 const piece=document.createElement('div');piece.className='world-piece';piece.inert=true;
 piece.style.setProperty('--piece',i);
 const text=(el)=>el?.textContent?.replace(/\s+/g,' ').trim()||'';
 const add=(tag,value)=>{if(value){const el=document.createElement(tag);el.textContent=value;piece.appendChild(el)}};
 let title=text(node.querySelector('h1,h2,h3')),label='';
 if(node.matches('.hero-copy')){title='Heya, I’m Shyam!';label='Security researcher'}
 else if(node.matches('.project'))label='Highlighted project';
 else if(node.matches('.intro')){title='Who am I?';label='Tirunelveli · Tamil Nadu'}
 else if(node.matches('.education')){title='B.Tech · AI & Data Science';label='2022–2026'}
 else if(node.matches('.skills')){title='My toolkit';label='Security · Code · Research'}
 else if(node.matches('.experience'))label='Work experience';
 else if(node.matches('.research')){title='PLUTON · C2 Research';label='Published research'}
 else if(node.matches('.blog')){title=title.includes('LFI')?'LFI in 15 Seconds':'AI & Security';label='Research write-up'}
 else if(node.matches('.contact')){title='Let’s get in touch!';label='Build something together'}
 add('small',label);add('strong',title||'Shyam J');
 grid.appendChild(piece);
 });
 ready=true;
 await Promise.all(Array.from(root.querySelectorAll('.actor img')).map(img=>img.decode().catch(()=>{})));
 if(alive)runShow();
 }catch{phase='Couldn’t open the copy. Return to your world.'}
}
function runShow(){
 const pieces=Array.from(grid.children),height=window.innerHeight;
 scene='snap';phase='ONE SNAP. ONE WORLD.';
 timeline=gsap.timeline();
 timeline.fromTo(pieces,{opacity:0,y:12},{opacity:1,y:0,duration:.6,stagger:.025},0);
 timeline.fromTo('.snap-actor',{opacity:0,y:45,scale:.94,rotation:0},{opacity:1,y:0,scale:1,rotation:0,duration:.9,ease:'power2.out'},.5);
 timeline.to('.snap-actor',{scale:1.045,duration:.45,ease:'power3.in'},1.7);
 timeline.to('.snap-actor img',{filter:'brightness(1.25) saturate(1.25)',duration:.2,yoyo:true,repeat:3},1.7);
 timeline.fromTo('.snap-shockwave',{scale:.05,opacity:1},{scale:9,opacity:0,duration:1.1,ease:'power2.out'},2.25);
 timeline.fromTo('.stone-sparks',{opacity:0,scale:.1},{opacity:1,scale:2,duration:.5},1.8);
 timeline.to('.stone-sparks',{opacity:0,scale:4,duration:.5},2.3);
 timeline.to('.snap-actor',{x:reduce?0:9,rotation:reduce?0:.7,duration:.065,yoyo:true,repeat:5},2.3);
 timeline.to('.snap-actor',{x:0,rotation:0,duration:.2},2.7);
 timeline.to('.world-grid',{opacity:.24,duration:.5},.6);
 timeline.fromTo('.snap-energy',{opacity:0,scale:.2},{opacity:1,scale:4,duration:.65},1.7);
 timeline.to('.snap-energy',{opacity:0,duration:.4},2.3);
 timeline.to('.impact-flash',{opacity:.8,duration:.12},2.3).to('.impact-flash',{opacity:0,duration:.55},2.45);
 timeline.to(pieces,{y:i=>reduce?0:height+160+(i%4)*80,x:i=>reduce?0:(i%2?1:-1)*(40+i%3*25),rotation:i=>reduce?0:(i%2?1:-1)*(12+i%5*8),scale:.8,opacity:0,duration:reduce?.5:1.3,stagger:.04,ease:'power2.in'},2.4);
 timeline.call(()=>{scene='destroyed';phase='DESTROYED'},[],4.6);
 timeline.to('.snap-actor',{opacity:0,y:35,duration:.5},4.5);
 timeline.fromTo('.celebrate-actor',{opacity:0,y:80,scale:.8},{opacity:1,y:0,scale:1,duration:.7},4.9);
 timeline.to('.celebrate-actor',{opacity:0,y:20,duration:.5},7);
 timeline.call(()=>{scene='rewind';phase='TIME CAN FIX THIS.'},[],7.4);
 timeline.fromTo('.time-actor',{opacity:0,y:35,scale:.94},{opacity:1,y:0,scale:1,duration:1,ease:'power2.out'},7.4);
 timeline.fromTo('.stone-aura',{opacity:0,scale:.3},{opacity:1,scale:1,duration:.8},7.7);
 timeline.to('.stone-aura',{scale:1.4,opacity:.65,duration:.65,yoyo:true,repeat:4,ease:'sine.inOut'},8.5);
 timeline.to('.time-actor img',{filter:'brightness(1.12) saturate(1.12)',duration:1,yoyo:true,repeat:3},8);
 timeline.to('.time-actor',{scale:1.025,duration:1.1,yoyo:true,repeat:2,ease:'sine.inOut'},8.4);
 timeline.fromTo('.time-rings',{opacity:0,scale:.5},{opacity:1,scale:1,duration:1},7.5);
 timeline.call(()=>phase='REWINDING…',[],8.8);
 timeline.to(pieces,{y:0,x:0,rotation:0,scale:1,opacity:1,duration:reduce?.6:1.8,stagger:{each:.04,from:'end'},ease:'power2.inOut'},9);
 timeline.call(()=>{scene='restored';phase='WORLD RESTORED'},[],11.7);
 timeline.to('.time-actor,.time-rings',{opacity:0,duration:.8},13);
 timeline.to('.world-grid',{opacity:1,filter:'blur(0px)',duration:.8},14);
 timeline.call(returnHome,[],16);
}
onMount(()=>{reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;return()=>{alive=false;timeline?.kill()}});
</script>
<svelte:head><title>Destroy & Rewind · Shyam J</title><meta name="robots" content="noindex"/><meta name="theme-color" content="#080d1a"/></svelte:head>
<main bind:this={root} class="destroy-cinema" class:reduce data-scene={scene}>
{#if !ready}<iframe bind:this={preview} src="/" title="Portfolio copy for cinematic effect" onload={copyWorld} aria-hidden="true" tabindex="-1"></iframe>{/if}
<div class="world-grid" bind:this={grid} aria-hidden="true"></div>
<div class="cinema-shade" aria-hidden="true"></div>
<header><a href="/">SJ<span>•</span></a><span>DESTROY / REWIND</span><button onclick={returnHome}>Skip & return ↗</button></header>
<div class="status" aria-live="polite"><span class="phase-code">{scene==='loading'?'BUILDING THE COPY':scene==='snap'?'REALITY / ONLINE':scene==='destroyed'?'REALITY / OFFLINE':scene==='rewind'?'TIME STONE / ACTIVE':'REALITY / RESTORED'}</span><h1>{phase}</h1>{#if scene==='restored'}<p>Returning to your world…</p>{/if}</div>
<div class="snap-actor actor" aria-hidden="true"><img src="/media/iron-man-snap-scene.jpg" alt="" width="1280" height="720"/><div class="snap-energy"></div><div class="snap-shockwave"></div><div class="stone-sparks">{#each ['#ffb742','#be65ff','#53cfff','#ff586b','#8cf28d','#ffef9f'] as color,i}<i style={'--spark-color:'+color+';--spark-angle:'+(i*60)+'deg'}></i>{/each}</div></div>
<div class="celebrate-actor actor" aria-hidden="true"><img src="/media/tony-celebrate-cutout.png" alt="" width="1024" height="1024"/><span>And… it’s gone.</span></div>
<div class="time-actor actor" aria-hidden="true"><img src="/media/doctor-strange-time-scene.png" alt="" width="2048" height="1151"/><div class="stone-aura"></div><div class="time-rings" aria-hidden="true"><div class="ring outer"></div><div class="ring inner"></div><div class="runes">✧ · ◇ · ✦ · ◇ · ✧ · ◇ · ✦ · ◇</div><div class="time-core"></div></div></div>

<div class="impact-flash" aria-hidden="true"></div>
<div class="particles" aria-hidden="true">{#each Array.from({length:24},(_,i)=>i) as i}<i style={'--x:'+((i*37)%100)+'%;--delay:'+(-i*.4)+'s;--drift:'+((i%2?1:-1)*(30+i*2))+'px'}></i>{/each}</div>
<footer>A LITTLE CINEMATIC CHAOS. THEN BACK TO SHYAM’S WORLD.</footer>
</main>
<style>
.destroy-cinema{position:fixed;inset:0;isolation:isolate;overflow:hidden;background:#080d1a;color:#f4f6ff;font-family:Lexend,Arial,sans-serif;perspective:1000px}
iframe{position:absolute;width:1280px;height:800px;left:-2000px;top:0;visibility:hidden;pointer-events:none}
.world-grid{position:absolute;inset:85px 5% 60px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:10px;opacity:.8;pointer-events:none}
 :global(.world-piece){position:relative;min-width:0;min-height:0;overflow:hidden;padding:14px;border:1px solid #a0bbdf55;border-radius:13px;background:#dae8ff;box-shadow:0 5px 20px #0003;color:#273c5b;transform-origin:50% 80%;text-align:left}
:global(.world-piece small){display:block;font:600 8px/1.4 Lexend,Arial,sans-serif;color:#526987;margin:0 0 7px;overflow-wrap:break-word}
:global(.world-piece strong){display:block;font:750 clamp(11px,1.05vw,15px)/1.3 Lexend,Arial,sans-serif;margin:0 0 7px;overflow-wrap:break-word}
:global(.world-piece p){display:block;font:400 clamp(8px,.65vw,10px)/1.5 Lexend,Arial,sans-serif;margin:0;overflow-wrap:break-word}
.cinema-shade{position:absolute;inset:0;z-index:1;background:radial-gradient(ellipse,transparent,#080d1a88);pointer-events:none}
header{position:absolute;top:0;left:0;right:0;z-index:9;display:flex;align-items:center;justify-content:space-between;padding:22px 5%;gap:16px;font-size:9px;letter-spacing:2px;background:linear-gradient(#080d1a,transparent)}header>a{font-size:25px;font-weight:900;letter-spacing:-2px}header>a span{color:#91cde6;padding-left:5px}header button{border:1px solid #bed0ef44;border-radius:12px;padding:10px 15px;font-size:10px;letter-spacing:0;background:#0a1427b3;color:#e1e8f6}
.status{position:absolute;top:43%;left:5%;right:5%;z-index:5;text-align:center;pointer-events:none;filter:drop-shadow(0 2px 15px #080d1a)}.phase-code{font-size:9px;letter-spacing:3px;color:#b5cbed}h1{font-size:clamp(24px,5vw,65px);font-weight:800;letter-spacing:2px;margin:15px 0;text-shadow:0 0 25px #8eb5f155}.status p{font-size:12px;color:#bce6dc}
[data-scene='destroyed'] h1{color:#ffbd9a;text-shadow:0 0 30px #fa633366}[data-scene='rewind'] h1,[data-scene='restored'] h1{color:#a5f5c1;text-shadow:0 0 25px #58e58b77}
.actor{position:absolute;opacity:0;z-index:6;pointer-events:none}.actor img{display:block;width:100%;height:auto}
.snap-actor{width:260px;right:5%;bottom:4%}.snap-energy{position:absolute;left:8%;top:37%;width:65px;height:65px;border-radius:50%;background:radial-gradient(circle,#fff0ba,#fe627b88 25%,#71d4ff55 50%,transparent 70%);filter:blur(5px);opacity:0;mix-blend-mode:screen}
.celebrate-actor{width:340px;left:50%;bottom:12%;margin-left:-170px;text-align:center}.celebrate-actor span{font-size:11px;color:#e0af8c;display:block;margin-top:12px;letter-spacing:2px}
.time-actor{width:300px;left:50%;bottom:5%;margin-left:-150px;filter:drop-shadow(0 0 18px #27c57244)}
.time-rings{position:absolute;z-index:4;width:280px;height:280px;left:50%;top:50%;margin:-140px 0 0 -140px;opacity:0;pointer-events:none;color:#7df4a4;filter:drop-shadow(0 0 13px #52e88766)}
.ring{position:absolute;border:2px solid #77eea2;border-radius:50%;inset:0;box-shadow:0 0 20px #58ea7d33,inset 0 0 20px #58ea7d33;background:repeating-conic-gradient(transparent 0 14deg,#78efa466 14deg 15deg,transparent 15deg 30deg);mask-image:radial-gradient(circle,transparent 57%,#000 58%,#000 70%,transparent 71%);animation:time-spin 6s linear infinite}.inner{inset:35px;animation-direction:reverse;border-style:dashed}.runes{position:absolute;inset:55px;border:1px solid #81f3ae;display:flex;justify-content:center;align-items:center;text-align:center;font-size:24px;line-height:1.5;transform:rotate(45deg);animation:time-spin 12s linear infinite}.time-core{position:absolute;inset:80px;border-radius:50%;background:radial-gradient(circle,#bbffdf66,transparent 70%)}
.impact-flash{position:absolute;inset:0;z-index:7;background:#e7f5ff;opacity:0;pointer-events:none}.particles{position:absolute;inset:0;z-index:3;pointer-events:none}.particles i{position:absolute;left:var(--x);bottom:0;width:3px;height:3px;background:#95c2f9;box-shadow:0 0 9px currentColor;opacity:.3;animation:particle-rise 5s var(--delay) linear infinite}[data-scene='rewind'] .particles i,[data-scene='restored'] .particles i{background:#9bf4b8;color:#9bf4b8}
footer{position:absolute;bottom:20px;left:5%;right:5%;z-index:8;padding:0;display:block;text-align:center;font-size:8px;letter-spacing:1.4px;color:#8fa1be}
@keyframes time-spin{to{transform:rotate(360deg)}}@keyframes particle-rise{from{transform:translate(0,0);opacity:0}30%{opacity:.7}to{transform:translate(var(--drift),-100vh);opacity:0}}
@media(max-width:650px){.world-grid{grid-template-columns:repeat(3,minmax(0,1fr));inset:75px 4% 60px;gap:6px}:global(.world-piece){padding:7px}:global(.world-piece h3){font-size:10px!important}:global(.world-piece h1){font-size:18px!important}header>span{display:none}.snap-actor{width:210px;right:-10px;bottom:3%}.celebrate-actor{width:280px;margin-left:-140px}.time-actor{width:250px;margin-left:-125px}.status{top:35%}h1{letter-spacing:1px}.phase-code{letter-spacing:2px;font-size:8px}.time-rings{width:230px;height:230px;margin:-115px 0 0 -115px}}
@media(prefers-reduced-motion:reduce){.particles{display:none}.ring,.runes{animation:none}}

/* The copied page becomes readable tiles; cinematic titles have their own lane. */
.world-grid{inset:210px 5% 65px;opacity:.65}
.status{top:85px;left:5%;right:5%;height:110px;display:flex;flex-direction:column;align-items:center;justify-content:center;filter:none}
.status h1{font-family:Lexend,Arial,sans-serif;font-size:clamp(22px,3.8vw,52px);line-height:1.12;letter-spacing:.02em;margin:10px 0 0;max-width:100%;text-wrap:balance}
.status p{margin:8px 0 0;line-height:1.4}
.phase-code{line-height:1.4}
.actor{z-index:6;filter:drop-shadow(0 12px 30px #000b)}
.actor img{mask-image:none;border:0;border-radius:0;box-shadow:none;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 0 14px #ffbb6955)}
.snap-actor{height:min(55vh,460px);width:min(430px,55vw);right:calc(50% - min(215px,27.5vw));bottom:9%}
.snap-energy{left:8%;top:37%;width:100px;height:100px;filter:blur(2px);background:radial-gradient(circle,#fff 0 8%,#ffe3ad 12%,#ff6c3588 38%,#75d8ff66 58%,transparent 72%)}
.celebrate-actor{height:min(48vh,420px);width:min(620px,75vw);left:50%;margin-left:0;translate:-50% 0;bottom:22%}
.celebrate-actor img{mask-image:none;border:0}.celebrate-actor span{font-size:15px;font-weight:700;color:#ffd6ae;text-shadow:0 2px 12px #000}
.time-actor{height:min(55vh,460px);width:min(540px,70vw);left:50%;margin-left:0;translate:-50% 0;bottom:12%;filter:drop-shadow(0 0 24px #39ff8899)}
.time-actor img{border:0;box-shadow:none;filter:drop-shadow(0 0 12px #35ee8888)}
.time-rings{z-index:7;width:360px;height:360px;top:auto;bottom:7%;margin-left:-180px;filter:drop-shadow(0 0 8px #4aff8f);opacity:0}
.ring{border-width:4px;box-shadow:0 0 28px #58ea7d88,inset 0 0 24px #58ea7d88;animation-duration:3s}.inner{border-width:3px}.time-core{background:radial-gradient(circle,#bbffdf22,transparent 65%)}
[data-scene='snap'] .cinema-shade,[data-scene='rewind'] .cinema-shade{background:radial-gradient(ellipse at 50% 70%,#080d1a44,#080d1acc)}
@media(max-width:650px){.world-grid{inset:185px 4% 65px;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(0,1fr)}.status{top:72px;height:100px}.status h1{font-size:clamp(22px,6vw,34px)}:global(.world-piece){padding:7px!important}:global(.world-piece .hero-copy h1),:global(.world-piece .contact h2){font-size:13px!important}.snap-actor{width:min(360px,82vw);right:50%;translate:50% 0;bottom:17%}.celebrate-actor{width:86vw;bottom:30%}.time-actor{width:86vw;bottom:23%}.time-rings{width:270px;height:270px;margin-left:-135px;bottom:14%}footer{font-size:7px;line-height:1.7}}


/* Native transparent artwork replaces the old bitmap silhouette masks. */
.snap-actor,.time-actor{width:min(360px,70vw);height:min(55vh,450px);left:50%;right:auto;margin:0;translate:-50% 0;bottom:9%}
.snap-actor img,.time-actor img{clip-path:none;mask-image:none;object-fit:contain;transform:none;transform-origin:center;border:0;border-radius:0;box-shadow:none}
.snap-actor img{filter:drop-shadow(0 0 12px #6bbfff55)}
.snap-energy{left:9%;top:12%;width:100px;height:100px;background:radial-gradient(circle,#fff 0 9%,#c7f3ff 18%,#2ec8ff88 42%,transparent 72%)}
.time-actor img{filter:drop-shadow(0 0 15px #56e89c44)}
.time-rings{width:190px;height:190px;left:calc(50% - 75px);bottom:calc(9% + min(32vh,260px));margin:0 0 -95px -95px;z-index:7}
.time-rings .inner{inset:22px}.time-rings .runes{inset:35px;font-size:18px}.time-rings .time-core{inset:45px}
@media(max-width:650px){.snap-actor,.time-actor{width:76vw;height:46vh;left:50%;right:auto;translate:-50% 0;bottom:16%}.time-rings{width:150px;height:150px;left:calc(50% - 55px);bottom:calc(16% + 27vh);margin:0 0 -75px -75px}.snap-energy{width:75px;height:75px;left:12%;top:14%}}

/* Photo composition: soften only the outer scenery, keep the face and glove clear. */
.snap-actor{width:min(940px,92vw,calc(56vh * 1.7778));height:auto;aspect-ratio:16/9;bottom:8%;left:50%;right:auto;translate:-50% 0;filter:none}
.snap-actor img{width:100%;height:100%;object-fit:contain;filter:none;mask-image:linear-gradient(to right,transparent,#000 8%,#000 92%,transparent),linear-gradient(to bottom,transparent,#000 8%,#000 88%,transparent);mask-composite:intersect;-webkit-mask-composite:source-in}
.snap-energy{left:23.5%;top:46%;translate:-50% -50%;width:85px;height:85px;filter:blur(2px);background:radial-gradient(circle,#fff 0 10%,#fff3b4 18%,#ffdf5388 40%,#7acfff55 58%,transparent 72%)}
.snap-shockwave{position:absolute;left:23.5%;top:46%;translate:-50% -50%;width:100px;height:100px;border:3px solid #ffe5a9;border-radius:50%;opacity:0;box-shadow:0 0 25px #ffdb83,inset 0 0 15px #70d5ff;pointer-events:none}
.stone-sparks{position:absolute;left:23.5%;top:46%;translate:-50% -50%;width:90px;height:90px;opacity:0;pointer-events:none}.stone-sparks i{position:absolute;left:50%;top:50%;width:4px;height:28px;border-radius:50%;background:var(--spark-color);box-shadow:0 0 14px var(--spark-color);transform:rotate(var(--spark-angle)) translateY(-40px);transform-origin:0 0}
@media(max-width:650px){.snap-actor{width:112vw;height:auto;bottom:23%}.snap-energy{width:55px;height:55px}.snap-shockwave{width:65px;height:65px}}

/* Time Stone scene: rings track the glowing stone in the supplied photograph. */
.time-actor{width:min(940px,92vw,calc(56vh * 1.7793));height:auto;aspect-ratio:2048/1151;bottom:8%;left:50%;right:auto;translate:-50% 0;filter:none}
.time-actor img{width:100%;height:100%;object-fit:contain;filter:none;mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent),linear-gradient(to bottom,transparent,#000 8%,#000 88%,transparent);mask-composite:intersect;-webkit-mask-composite:source-in}
.time-actor .time-rings{position:absolute;width:22%;height:auto;aspect-ratio:1;top:25.5%;left:13.4%;bottom:auto;margin:0;translate:-50% -50%;z-index:7;filter:drop-shadow(0 0 9px #55ef8b)}
.time-actor .ring{border-width:2px}.time-actor .inner{inset:16%}.time-actor .runes{inset:27%;font-size:clamp(9px,1.4vw,18px)}.time-actor .time-core{inset:30%;background:radial-gradient(circle,#c5ffb855,transparent 70%)}
.stone-aura{position:absolute;left:13.4%;top:25.5%;width:14%;aspect-ratio:1;translate:-50% -50%;border-radius:50%;opacity:0;mix-blend-mode:screen;background:radial-gradient(circle,#fff 0 4%,#d6ff9588 12%,#5afa7944 40%,transparent 72%);filter:blur(2px)}
@media(max-width:650px){.time-actor{width:112vw;height:auto;bottom:23%}.time-actor .time-rings{width:24%;left:13.4%;top:25.5%;bottom:auto;margin:0}.time-actor .runes{font-size:10px}}

/* Cinematic copy: only a short label and title, with identical alignment. */
:global(.world-piece){display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;padding:14px 16px!important}
:global(.world-piece small){font:500 8px/1.25 Lexend,Arial,sans-serif;margin:0;letter-spacing:.02em;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
:global(.world-piece strong){font:750 clamp(12px,1.05vw,15px)/1.3 Lexend,Arial,sans-serif;margin:0;max-width:100%;text-wrap:balance}
@media(max-width:650px){:global(.world-piece){padding:7px 10px!important;gap:3px}:global(.world-piece small){font-size:7px}:global(.world-piece strong){font-size:11px;line-height:1.2}}
@media(max-width:650px) and (max-height:700px){:global(.world-piece small){display:none}}
</style>