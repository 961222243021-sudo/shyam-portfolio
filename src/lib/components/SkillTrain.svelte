<script>
let {skills=[],tamil=false}=$props();
</script>
<section class="railway" class:tamil aria-label={tamil?'என் திறன்களின் ரயில்':'My toolkit train'}>
 <div class="viewport">
  <div class="convoy">
   {#each [0,1] as copy}
   <div class="consist" aria-hidden={copy===1?'true':undefined}>
    <div class="engine"><img src="/media/toolkit-train.svg" alt="" width="820" height="500"/><span class="engine-tag">SHYAM EXPRESS</span></div>
    {#each skills as skill,i}
    <div class="carriage" style={'--hue:'+(195+i*13)}>
     <div class="skill-sign"><span class="number">{String(i+1).padStart(2,'0')}</span><span class="skill-label">{tamil?skill[1]:skill[0]}</span></div>
     <div class="wagon" aria-hidden="true"><div class="windows"><i></i><i></i><i></i></div><span class="chassis"></span><span class="coupler"></span><span class="wheel left"></span><span class="wheel right"></span></div>
    </div>
    {/each}
   </div>
   {/each}
  </div>
 </div>
 <div class="tracks" aria-hidden="true"></div>
</section>
<style>
.railway{--car-width:245px;position:relative;margin:12px -30px 18px;isolation:isolate;padding-top:12px}.viewport{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}.convoy{display:flex;width:max-content;animation:journey 65s linear infinite;will-change:transform}.consist{display:flex;align-items:flex-end;flex-shrink:0;gap:0;padding-right:0;height:220px}.engine{width:235px;height:200px;position:relative;flex-shrink:0}.engine img{position:absolute;bottom:-6px;left:-22px;width:260px;height:170px;object-fit:contain}.engine-tag{position:absolute;top:21px;left:24px;padding:7px 11px;border-radius:20px;font:700 9px Lexend,Arial;letter-spacing:1.2px;color:#47648b;background:#e8f1ff;border:1px solid #98b5d74d}.carriage{width:var(--car-width);height:205px;position:relative;padding:0 11px;flex-shrink:0}.skill-sign{position:absolute;top:8px;left:13px;right:13px;min-height:91px;display:flex;align-items:center;gap:10px;padding:12px;background:linear-gradient(140deg,#f6fbff,#dbeafa);border:1px solid #9cc2e1;border-radius:14px 14px 8px 8px;box-shadow:0 0 18px #8cbaff35,0 5px 12px #6485ab15;z-index:2;animation:sway 3s ease-in-out infinite;transform-origin:bottom center}.number{font:700 10px Lexend,Arial;color:#688aad;align-self:flex-start;padding-top:3px}.skill-label{font:600 13px/1.5 Lexend,Arial,sans-serif;color:#344965;overflow-wrap:break-word;max-width:177px}.tamil{--car-width:285px}.tamil .skill-label{font-family:Arial,sans-serif;font-size:14px;line-height:1.55;max-width:211px}.wagon{position:absolute;left:11px;right:11px;bottom:19px;height:91px;background:linear-gradient(135deg,hsl(var(--hue) 48% 67%),hsl(var(--hue) 35% 43%));border:2px solid #5e748f;border-radius:9px 9px 5px 5px;box-shadow:inset 0 4px 0 #fff4}.windows{display:flex;justify-content:space-around;gap:14px;padding:15px 21px}.windows i{display:block;flex:1;height:26px;background:linear-gradient(135deg,#e8fbff,#a5d4ed);border:2px solid #547286;border-radius:6px;box-shadow:inset -6px -2px 0 #639baf33}.chassis{position:absolute;height:9px;bottom:-4px;left:-5px;right:-5px;background:#47586c;border-radius:3px}.coupler{position:absolute;right:-26px;bottom:8px;height:6px;width:25px;background:#556575}.wheel{position:absolute;bottom:-18px;width:30px;height:30px;background:repeating-conic-gradient(#56687b 0deg 15deg,#b0c3d4 15deg 30deg);border:5px solid #34445a;border-radius:50%;animation:roll 1.3s linear infinite;box-shadow:0 0 0 2px #c1d2e2}.wheel:after{content:'';position:absolute;inset:5px;background:#d6e3ed;border-radius:50%}.wheel.left{left:25px}.wheel.right{right:25px}.tracks{height:15px;margin:0 13px;background:repeating-linear-gradient(90deg,transparent 0 13px,#6f849c 13px 23px,transparent 23px 37px);border-top:3px solid #60758e;border-bottom:3px solid #91a4b9;box-shadow:0 5px 12px #7292ba22;position:relative;top:-2px;z-index:-1}@keyframes journey{to{transform:translateX(-50%)}}@keyframes roll{to{transform:rotate(-360deg)}}@keyframes sway{50%{transform:translateY(-2px) rotate(.5deg)}}@media(max-width:650px){.railway{margin:10px -25px}.skill-label{font-size:13px}}@media(prefers-reduced-motion:reduce){.convoy,.wheel,.skill-sign{animation:none}.viewport{overflow:auto;mask-image:none}.consist[aria-hidden=true]{display:none}}
</style>
