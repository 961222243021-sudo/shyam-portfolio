<script>
let {active=false}=$props();
let tamil=$state(false),copied=$state(false);
async function copyLink(){try{await navigator.clipboard.writeText(window.location.href);copied=true;setTimeout(()=>copied=false,2500)}catch{copied=false}}
</script>
<main class="desktop-welcome" class:active aria-label="Desktop viewing notice">
 <a class="welcome-logo" href="/" aria-label="Shyam J">SJ<span>•</span></a>
 <button class="welcome-language" onclick={()=>tamil=!tamil}>{tamil?'EN':'தமிழ்'}</button>
 <div class="welcome-content">
  <div class="peek-stage" aria-hidden="true"><div class="peek-glow"></div><img src="/media/desktop-peek.png" alt="" width="405" height="265"/><span class="peek-bubble">{tamil?'ஒரு நிமிடம்…':'Psst… one moment!'}</span></div>
  <p class="welcome-eyebrow">{tamil?'பெரிய திரை · முழு அனுபவம்':'BIG SCREEN. FULL EXPERIENCE.'}</p>
  <h1>{tamil?'கணினியில் திறக்கவும்.':'Kindly open on a desktop or laptop.'}</h1>
  <p class="welcome-description">{tamil?'என் உலகின் 3D காட்சிகளையும் அனிமேஷன்களையும் முழுமையாக ரசிக்க, இந்த இணைப்பை உங்கள் கணினியில் திறக்கவும்.':'My world is made for a bigger screen. Open this link on your computer to enjoy the 3D scenes and animations.'}</p>
  <button class="copy-desktop-link" onclick={copyLink}>{copied?(tamil?'இணைப்பு நகலெடுக்கப்பட்டது ✓':'Link copied ✓'):(tamil?'இணைப்பை நகலெடு ↗':'Copy website link ↗')}</button>
  <p class="welcome-signature">Shyam J <span>·</span> {tamil?'ஆர்வத்துடன் உருவாக்கப்பட்டது':'Made with curiosity'}</p>
 </div>
</main>
<style>
.desktop-welcome{display:none;position:fixed;inset:0;z-index:99999;background:#000;color:#f1f5f4;font-family:Lexend,Arial,sans-serif;overflow:auto;padding:28px 24px max(28px,env(safe-area-inset-bottom));box-sizing:border-box;text-align:center}
.desktop-welcome.active{display:block}.welcome-logo{position:absolute;top:25px;left:25px;font-size:26px;font-weight:800;text-decoration:none;color:#fff;letter-spacing:-2px}.welcome-logo span{color:#54d794;padding-left:5px}.welcome-language{position:absolute;right:24px;top:26px;font-size:12px;border:1px solid #ffffff30;border-radius:20px;background:#101a15;color:#cfe9db;padding:8px 12px}
.welcome-content{min-height:calc(100dvh - 80px);display:flex;flex-direction:column;align-items:center;justify-content:center;max-width:540px;margin:auto;padding:50px 0 10px}.peek-stage{width:min(360px,90vw);height:235px;position:relative;isolation:isolate;margin-bottom:15px;overflow:hidden}.peek-stage img{position:absolute;width:360px;max-width:none;height:auto;left:50%;translate:-50% 0;top:0;animation:door-peek 5s ease-in-out infinite;transform-origin:52% 65%}.peek-glow{position:absolute;width:150px;height:150px;background:#15dc6940;border-radius:50%;filter:blur(45px);left:55%;top:40px;z-index:-1;animation:glow-breathe 5s ease-in-out infinite}.peek-bubble{position:absolute;top:55px;right:0;font-size:10px;line-height:1.4;border:1px solid #5fbf8655;border-radius:15px 15px 15px 0;padding:9px 12px;background:#0d1d14;color:#a8e9c4;animation:peek-whisper 5s ease-in-out infinite}
.welcome-eyebrow{font-size:9px;letter-spacing:2px;color:#76c699;margin:0 0 16px;line-height:1.5}.welcome-content h1{font-family:Lexend,Arial,sans-serif;font-size:clamp(25px,5vw,39px);line-height:1.23;letter-spacing:-.04em;font-weight:750;margin:0;text-wrap:balance;max-width:460px}.welcome-description{font-size:13px;line-height:1.8;color:#94a69b;margin:20px 0 26px;max-width:390px}.copy-desktop-link{font:600 12px/1.5 Lexend,Arial,sans-serif;padding:14px 24px;border-radius:30px;border:1px solid #8ed4a366;background:#b7f5cf;color:#0b2517;box-shadow:0 0 25px #3bb77422}.copy-desktop-link:focus-visible,.welcome-language:focus-visible{outline:2px solid #d4ffe4;outline-offset:4px}.welcome-signature{font-size:9px;color:#5f7468;margin:32px 0 0}.welcome-signature span{padding:0 6px;color:#62ba87}
@keyframes door-peek{0%,100%{transform:translateX(-8px) rotate(-1deg)}45%,65%{transform:translateX(8px) rotate(1deg)}}@keyframes glow-breathe{0%,100%{opacity:.4}50%{opacity:1}}@keyframes peek-whisper{0%,20%,100%{opacity:0;transform:translateY(7px)}35%,75%{opacity:1;transform:translateY(0)}}
@media(pointer:coarse) and (max-width:1400px){.desktop-welcome{display:block}}
@media(max-height:650px){.welcome-content{padding-top:45px}.peek-stage{height:145px;width:240px;margin-bottom:10px}.peek-stage img{width:230px}.peek-bubble{top:25px;font-size:8px;padding:6px}.welcome-content h1{font-size:25px}.welcome-description{margin:14px 0 18px;font-size:12px}.welcome-signature{margin-top:20px}}
@media(prefers-reduced-motion:reduce){.peek-stage img,.peek-glow,.peek-bubble{animation:none}.peek-bubble{opacity:1}}
</style>
