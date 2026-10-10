<script>
import {onMount} from 'svelte';
let video,cinema,blocked=$state(false),ended=$state(false),playing=$state(false),hud=$state(true),time=$state(0),duration=$state(0),failed=$state(false),hideTimer;
function wake(){hud=true;clearTimeout(hideTimer);hideTimer=setTimeout(()=>hud=false,2800)}
async function start(){if(!video)return;ended=false;video.muted=false;video.volume=1;try{await video.play();blocked=false;playing=true;wake()}catch{blocked=true;hud=true}}
function enter(){start();if(!document.fullscreenElement)cinema.requestFullscreen?.().catch(()=>{})}
function fullscreen(){if(document.fullscreenElement)document.exitFullscreen?.();else cinema.requestFullscreen?.().catch(()=>{});wake()}
function replay(){video.currentTime=0;start()}
function toggle(){if(video.paused)start();else{video.pause();playing=false;wake()}}
const clock=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
onMount(()=>{start();return()=>{clearTimeout(hideTimer);video?.pause()}});
</script>
<svelte:head><title>Bored? · Shyam’s Cinema</title><meta name="description" content="Take a one-minute break in Shyam’s little cinema."/><meta name="theme-color" content="#030508"/></svelte:head>
<main bind:this={cinema} class="cinema" class:quiet={!hud && !blocked && !ended} onpointermove={wake} onpointerdown={wake} aria-label="Shyam’s cinema">
<video bind:this={video} src="/media/bored-cinema-4k.mp4" poster="/media/bored-poster.jpg" autoplay playsinline preload="auto" onplaying={()=>{playing=true;blocked=false}} onpause={()=>playing=false} onended={()=>{ended=true;hud=true;playing=false}} onloadedmetadata={()=>duration=video.duration} ontimeupdate={()=>time=video.currentTime} onerror={()=>failed=true}><track kind="captions"/></video>
<div class="curtain curtain-left" aria-hidden="true"></div><div class="curtain curtain-right" aria-hidden="true"></div>
<div class="cinema-intro" aria-hidden="true"><span>SHYAM’S LITTLE CINEMA</span><p>A little break from the code.</p></div>
<header class="cinema-hud"><a href="/">← Back to my world</a><span>BORED? <i>✦</i></span><button onclick={fullscreen} aria-label="Toggle fullscreen">⛶ Fullscreen</button></header>
{#if failed}<div class="cinema-overlay"><p>The film couldn’t load.</p><a href="/">Back to my world ↗</a></div>
{:else if blocked}<div class="cinema-overlay"><span class="screen-label">YOUR SEAT IS READY</span><button class="enter-cinema" onclick={enter}>Enter cinema <span>▶</span></button><p>Your browser needs one tap to start with sound.</p></div>
{:else if ended}<div class="cinema-overlay"><span class="screen-label">THAT WAS YOUR LITTLE ESCAPE.</span><button class="enter-cinema" onclick={replay}>Watch again ↻</button><a href="/">Back to my world ↗</a></div>{/if}
<footer class="cinema-hud cinema-bottom"><button onclick={toggle} aria-label={playing?'Pause film':'Play film'}>{playing?'Ⅱ':'▶'}</button><span>{clock(time)} / {clock(duration)}</span><div class="film-progress" aria-hidden="true"><span style={'width:'+(duration?time/duration*100:0)+'%'}></span></div><span class="film-note">4K UPSCALE · SOUND ON</span></footer>
</main>
<style>
.cinema{position:fixed;inset:0;min-height:100svh;background:#030508;color:#eef1fa;overflow:hidden;isolation:isolate;font-family:Lexend,Arial,sans-serif}
video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}
.cinema-hud{position:absolute;left:0;right:0;z-index:4;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:25px 32px;font-size:11px;transition:opacity .5s;letter-spacing:.3px}
header{top:0;background:linear-gradient(#030508b3,transparent)}header>span{font-size:10px;letter-spacing:3px;color:#b5c3df}header i{font-style:normal;color:#daba7d;margin-left:8px}
.cinema-hud a,.cinema-hud button{padding:9px 12px;border-radius:10px;background:#11182370;border:1px solid #ffffff18;color:#e6eaf5}.cinema-hud a:hover,.cinema-hud button:hover{background:#ffffff20}
.cinema-bottom{bottom:0;margin:0;background:linear-gradient(transparent,#030508c9);font-size:10px;justify-content:flex-start;padding-top:32px}.film-progress{height:2px;flex:1;background:#ffffff25;overflow:hidden}.film-progress span{height:100%;display:block;background:#c5d7f9;box-shadow:0 0 12px #98b8fb}.film-note{font-size:8px;letter-spacing:1px;color:#8899b6}
.quiet .cinema-hud{opacity:0;pointer-events:none}.quiet .cinema-hud:focus-within{opacity:1;pointer-events:auto}
.curtain{position:absolute;top:0;bottom:0;width:50%;z-index:6;background:repeating-linear-gradient(90deg,#07101a 0,#142136 30px,#08111c 60px);box-shadow:0 0 50px #000;animation:curtain-open 1.7s .15s cubic-bezier(.65,0,.25,1) forwards;pointer-events:none}.curtain-left{left:0;--direction:-105%}.curtain-right{right:0;--direction:105%}
.cinema-intro{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#030508;z-index:7;animation:cinema-intro 2s forwards;pointer-events:none}.cinema-intro span{font-size:11px;letter-spacing:4px;color:#d6bb86}.cinema-intro p{font-size:12px;color:#8c9ab3;margin-top:16px}
.cinema-overlay{position:absolute;inset:0;background:#030508c9;backdrop-filter:blur(8px);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:25px;text-align:center;padding:30px;z-index:5}.screen-label{font-size:9px;letter-spacing:3px;color:#c1a977}.enter-cinema{border:1px solid #d5c39e77;border-radius:14px;background:linear-gradient(130deg,#e7d3a6,#b79450);padding:17px 28px;color:#1d1a13;font-size:14px;box-shadow:0 0 35px #d4b87520}.enter-cinema span{margin-left:16px}.cinema-overlay p,.cinema-overlay>a{font-size:11px;color:#c1ccdf;margin:0}
@keyframes curtain-open{to{transform:translateX(var(--direction))}}@keyframes cinema-intro{0%,20%{opacity:1}75%,100%{opacity:0;visibility:hidden}}
@media(max-width:650px){.cinema-hud{padding:18px 14px;font-size:10px;gap:8px}header>span{display:none}.film-note{display:none}.cinema-bottom{padding-bottom:max(18px,env(safe-area-inset-bottom))}.cinema-intro span{font-size:9px;letter-spacing:2px}.cinema-overlay{gap:20px}}
@media(prefers-reduced-motion:reduce){.curtain,.cinema-intro{display:none}.cinema-hud{transition:none}}
</style>
