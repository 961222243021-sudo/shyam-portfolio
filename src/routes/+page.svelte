<script>
import ProjectArrowTitle from '$lib/components/ProjectArrowTitle.svelte';
import SkillTrain from '$lib/components/SkillTrain.svelte';
import MediumGuide from '$lib/components/MediumGuide.svelte';
import {onMount, tick} from 'svelte';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ArcheryCertificates from '$lib/components/ArcheryCertificates.svelte';
import SmokeIdentity from '$lib/components/SmokeIdentity.svelte';
import WebResearch from '$lib/components/WebResearch.svelte';
import ThunderProjects from '$lib/components/ThunderProjects.svelte';
import OrbEducation from '$lib/components/OrbEducation.svelte';
import day from '$lib/videos/day.mp4';
import night from '$lib/videos/night.mp4';
let tamil=$state(false), dark=$state(false), motion=$state(true), menu=$state(false), filter=$state('all'), sound=$state(true);
let heroVideo=$state(), aboutVideo=$state(), root;
const t=(en,ta)=>tamil?ta:en;
const projects=[
{title:'Shyam C2',ta:'ஷ்யாம் C2',cat:'security',tag:'Python · Networking · Automation',n:'01',glyph:'⌘',color:'#749bcf',en:'A modular cybersecurity research and command simulation platform exploring communication, task management and remote execution in controlled environments.',desc:'கட்டுப்படுத்தப்பட்ட சூழலில் தொடர்பு, பணி மேலாண்மை மற்றும் தொலைநிலை இயக்கத்தை ஆராயும் இணையப் பாதுகாப்பு தளம்.',url:'https://git.selfmade.ninja/shyamfdo82/shyam-c2'},
{title:'AC X-Ray',ta:'AC X-Ray',cat:'tools',tag:'Python · PySide6 · Energy',n:'02',glyph:'❄',color:'#7cbbb8',en:'A desktop application that estimates air-conditioner cooling performance using power consumption, with an intuitive interface for energy data.',desc:'மின் நுகர்வுத் தரவின் மூலம் குளிர்சாதனத்தின் செயல்திறனை மதிப்பிட உதவும் செயலி.',url:'https://git.selfmade.ninja/shyamfdo82/AC'},
{title:'Popeye XZ',ta:'Popeye XZ',cat:'security',tag:'Bash · Linux · Supply-chain security',n:'03',glyph:'◈',color:'#aaa2d4',en:'A security utility that automates checks for indicators associated with the XZ Utils backdoor incident on Linux systems.',desc:'Linux அமைப்புகளில் XZ Utils பின்வாசல் சம்பவத்துடன் தொடர்புடைய அறிகுறிகளைச் சரிபார்க்கும் பாதுகாப்புக் கருவி.',url:'https://git.selfmade.ninja/shyamfdo82/popeye-xz'},
{title:'Chanakya Neeti API',ta:'சாணக்கிய நீதி API',cat:'tamil',tag:'REST API · Tamil · 319 verses',n:'04',glyph:'அ',color:'#d9aa7b',en:'319 verses across 17 chapters, with Tamil text, explanations, English meanings and a searchable REST API.',desc:'17 அத்தியாயங்களில் 319 பாடல்கள் — தமிழ் உரை, விளக்கங்கள், ஆங்கிலப் பொருள் மற்றும் தேடக்கூடிய API.',url:'https://github.com/961222243021-sudo/chanakya-neeti-api',live:'https://chanakya-neeti-api.vercel.app/'},
{title:'MinKanakku',ta:'மின்கணக்கு',cat:'tamil',tag:'Tamil + English · Electricity calculator',n:'05',glyph:'ϟ',color:'#77a9d8',en:'A guided Tamil Nadu electricity-bill calculator with Tamil and English modes, helping people understand energy charges and comparisons.',desc:'மின் கட்டணத்தை எளிதாகப் புரிந்துகொள்ள உதவும் தமிழ் மற்றும் ஆங்கில வழிகாட்டுதல் கொண்ட தமிழ்நாடு மின் கட்டணக் கணிப்பான்.',url:'https://github.com/961222243021-sudo/MinKanakku'},
{title:'Tamilnadu API',ta:'தமிழ்நாடு API',cat:'tamil',tag:'Election archive · JSON · CSV',n:'06',glyph:'✓',color:'#8ab39c',en:'An independent Tamil Nadu election archive with constituency results, an API playground and exports. Imported data remains provisional pending official verification.',desc:'தொகுதி முடிவுகள், API சோதனை மற்றும் தரவு ஏற்றுமதி வசதிகளுடன் தமிழ்நாடு தேர்தல் காப்பகம். அதிகாரப்பூர்வ சரிபார்ப்பு நிலுவையில் உள்ளது.',url:'https://github.com/961222243021-sudo/tamilnadu-api',live:'https://tamilnadu-api.vercel.app/'}
];
const skills=[['Web application security','இணையச் செயலி பாதுகாப்பு'],['VAPT','பாதிப்பு மதிப்பீடு மற்றும் ஊடுருவல் சோதனை'],['Python & automation','Python மற்றும் தானியக்கம்'],['Linux & networking','Linux மற்றும் வலையமைப்பு'],['Reconnaissance','தகவல் சேகரிப்பு'],['Risk assessment','இடர் மதிப்பீடு'],['Basic incident analysis','அடிப்படை சம்பவப் பகுப்பாய்வு'],['Basic malware analysis','அடிப்படை தீம்பொருள் பகுப்பாய்வு']];
const certs=[['Ethical Hacking','Board Monk Cyber Security Services'],['Cyber Forensics','Board Monk Cyber Security Services'],['Offensive Security','Cappricio Securities'],['Android Secure Code Development & Advanced Web Exploitation','Cappricio Securities'],['Hardware Development & IoT Hacking','Cappricio Securities'],['CCNA','NetworkGeek, Chennai']];
let shown=$derived(projects.filter(p=>filter==='all'||p.cat===filter));
async function toggleLanguage(){tamil=!tamil;localStorage.setItem('shyam-language',tamil?'ta':'en');document.documentElement.lang=tamil?'ta':'en';await tick();ScrollTrigger.refresh();}
let clickAudio, hoverAudio;
function interactionSound(event){
 if(!sound || !event.target.closest('a,button,summary'))return;
 const audio=event.type==='pointerover'?hoverAudio:clickAudio;
 if(!audio || (event.type==='pointerover' && event.pointerType!=='mouse'))return;
 if(event.type==='pointerover' && event.target.closest('a,button,summary')?.contains(event.relatedTarget))return;
 audio.currentTime=0;audio.play().catch(()=>{});
}
function playScenery(event){if(motion)event.currentTarget.play().catch(()=>{});}
$effect(()=>{
 for(const video of [heroVideo,aboutVideo]){
  if(!video)continue;
  if(motion)video.play().catch(()=>{});else video.pause();
 }
});
onMount(()=>{
 tamil=localStorage.getItem('shyam-language')==='ta'; document.documentElement.lang=tamil?'ta':'en';
 dark=window.matchMedia('(prefers-color-scheme: dark)').matches;
 motion=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 gsap.registerPlugin(ScrollTrigger);
 const lenis=new Lenis({duration:1,anchors:{offset:-100},autoRaf:true});
 lenis.on('scroll',ScrollTrigger.update);
 clickAudio=new Audio('/sounds/click.mp3');clickAudio.volume=.12;
 hoverAudio=new Audio('/sounds/hover.mp3');hoverAudio.volume=.06;
 document.addEventListener('pointerdown',interactionSound);
 document.addEventListener('pointerover',interactionSound);
 const ctx=gsap.context(()=>{gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:32,opacity:0,duration:.7,scrollTrigger:{trigger:el,start:'top 95%',once:true}}));},root);
 return()=>{document.removeEventListener('pointerdown',interactionSound);document.removeEventListener('pointerover',interactionSound);clickAudio.pause();hoverAudio.pause();ctx.revert();lenis.destroy();};
});
</script>
<svelte:head><title>Shyam J · Cybersecurity & Tamil-made tools</title><meta name="description" content="Shyam J — cybersecurity analyst and security researcher from Tirunelveli, Tamil Nadu. Explore projects, published research, writing and Tamil cybersecurity awareness."/><link rel="icon" href="/favicon.svg"/><meta name="theme-color" content="#7396ce"/></svelte:head>
<div bind:this={root} class:dark class:tamil class:still={!motion}>
<header class="glass nav">
<a class="logo" href="#home" aria-label="Shyam J home">SJ<span>•</span></a>
<button class="mobile-menu" onclick={()=>menu=!menu} aria-expanded={menu} aria-label="Toggle navigation">{menu?'✕':'☰'}</button>
<nav class:open={menu} aria-label="Main navigation">
{#each [['home','home','முகப்பு'],['projects','portfolio','படைப்புகள்'],['research','research','ஆய்வு'],['about','about','என்னைப் பற்றி']] as item}<a href={'#'+item[0]} onclick={()=>{menu=false;}}>{t(item[1],item[2])}</a>{/each}
</nav>
<div class="nav-actions"><a href="https://github.com/961222243021-sudo" target="_blank" rel="noreferrer" aria-label="GitHub">GH ↗</a><a href="https://www.linkedin.com/in/shyam-j-8708a6326" target="_blank" rel="noreferrer" aria-label="LinkedIn">in ↗</a><button class="language" onclick={toggleLanguage}>{t('தமிழ்','EN')}</button><button onclick={()=>dark=!dark} aria-label="Toggle light and dark theme">{dark?'☀':'☾'}</button></div>
</header>
<main>
<section id="home" class="hero">
<video bind:this={heroVideo} src={dark?night:day} muted playsinline loop autoplay={motion} onloadeddata={playScenery} preload="auto" aria-hidden="true"></video>
<div class="hero-copy"><p class="eyebrow">{t('FROM TIRUNELVELI, WITH CURIOSITY','திருநெல்வேலியிலிருந்து, ஆர்வத்துடன்')}</p><h1>{t("Heya, i'm ",'வணக்கம், நான் ')}<span>{t('Shyam','ஷ்யாம்')}</span>!</h1><h2>{t('A Security Researcher, Builder & Curious Human','பாதுகாப்பு ஆராய்ச்சியாளர், படைப்பாளர்')}
<small>{t("(a little code. a lot of curiosity :])",'(கொஞ்சம் நிரல். நிறைய ஆர்வம் :])')}</small></h2>
<div class="hero-links"><a class="pill" href="#projects">{t('explore my work ↓','என் படைப்புகள் ↓')}</a><a class="pill secondary" href="/Shyam-J-Resume.pdf" download>{t('my résumé ↗','என் சுயவிவரம் ↗')}</a></div></div>
<div class="tamil-world" aria-hidden="true"><div class="temple"><div class="tier t1"></div><div class="tier t2"></div><div class="tier t3"></div><div class="tier t4"></div><div class="arch">அ</div></div><span>தமிழ்நாடு · நெல்லை</span></div>
<p class="scroll-note">{t('take a little look around my world','என் உலகைச் சுற்றிப் பாருங்கள்')} ↓</p>
</section>
<section id="projects" class="section"><ThunderProjects {tamil}/>
<div class="filters" aria-label="Project categories">{#each [['all','everything','அனைத்தும்'],['security','security','பாதுகாப்பு'],['tamil','Tamil & APIs','தமிழ் & API'],['tools','useful tools','பயனுள்ள கருவிகள்']] as f}<button class:active={filter===f[0]} onclick={()=>{filter=f[0];}} aria-pressed={filter===f[0]}>{t(f[1],f[2])}</button>{/each}</div>
<div class="projects-grid">{#each shown as p}<article class="project glass" style={'--accent:'+p.color}>
<div class="project-art" aria-hidden="true"><span class="project-no">{p.n} / SHYAM'S LAB</span><div class="orbit o1"></div><div class="orbit o2"></div><div class="art-block"><span>{p.glyph}</span></div><span class="art-word">{p.title}</span><div class="art-dots">• • •</div></div>
<div class="project-copy"><p class="tag">{p.tag}</p><ProjectArrowTitle title={t(p.title,p.ta)} index={Number(p.n)-1}/><p>{t(p.en,p.desc)}</p><div class="project-links"><a href={p.url} target="_blank" rel="noreferrer">{t('explore source ↗','மூல நிரல் ↗')}</a>{#if p.live}<a href={p.live} target="_blank" rel="noreferrer">{t('live website ↗','இணையதளம் ↗')}</a>{/if}</div></div></article>{/each}</div>
</section>
<section id="about" class="section"><SmokeIdentity {tamil}/>
<div class="about-card glass reveal"><video bind:this={aboutVideo} src="/media/shyam-snow-loop.mp4" poster="/media/shyam-snow.webp" muted playsinline loop autoplay={motion} onloadeddata={playScenery} preload="metadata" aria-hidden="true"></video><div class="about-copy"><p class="intro">{t("I'm Shyam J, a cybersecurity enthusiast and aspiring Security Analyst from Tirunelveli, Tamil Nadu.",'நான் ஷ்யாம் J. தமிழ்நாட்டின் திருநெல்வேலியைச் சேர்ந்த இணையப் பாதுகாப்பு ஆர்வலர் மற்றும் பாதுகாப்பு ஆய்வாளராகப் பணியாற்ற விரும்புபவர்.')}</p><p>{t('I focus on ethical hacking, vulnerability assessment, network security and research. I enjoy working with Python, Linux and automation to understand vulnerabilities and improve the security of digital systems.','அறநெறி ஹாக்கிங், பாதிப்பு மதிப்பீடு, வலையமைப்புப் பாதுகாப்பு மற்றும் ஆராய்ச்சியில் கவனம் செலுத்துகிறேன். Python, Linux மற்றும் தானியக்கம் மூலம் பாதுகாப்புச் சிக்கல்களைப் புரிந்து தீர்வு காண விரும்புகிறேன்.')}</p><OrbEducation {tamil}/><h3 class="handwriting">{t('my toolkit','என் திறன்கள்')}</h3><SkillTrain {skills} {tamil}/></div></div>
<div class="values"><div class="glass reveal"><h3>{t('curiosity first','ஆர்வமே முதல்')}</h3><p>{t('Understanding how things work is where every project begins.','ஒவ்வொரு படைப்பும் அது எப்படி வேலை செய்கிறது என்ற கேள்வியிலிருந்து தொடங்குகிறது.')}</p></div><div class="glass reveal"><h3>{t('build with purpose','பயனுடன் படைப்போம்')}</h3><p>{t('From security research to Tamil tools, I build to make technology more useful.','பாதுகாப்பு ஆராய்ச்சி முதல் தமிழ்க் கருவிகள் வரை, தொழில்நுட்பத்தைப் பயனுள்ளதாக மாற்ற முயல்கிறேன்.')}</p></div><div class="glass reveal"><h3>{t('share what i learn','கற்றதைப் பகிர்வோம்')}</h3><p>{t('Writing and Tamil awareness talks help take security beyond technical circles.','கட்டுரைகளும் தமிழ் விழிப்புணர்வுப் பேச்சுகளும் பாதுகாப்பை அனைவரிடமும் கொண்டு செல்கின்றன.')}</p></div></div>
</section>
<section id="experience" class="section"><div class="experience-scene"><div class="experience-light" aria-hidden="true"><img src="/media/swinging-lamp.svg" width="1080" height="1080" alt="" loading="lazy"/><span class="experience-spotlight"></span></div><div class="section-heading experience-heading"><h2>{t('learning by doing','செய்து கற்றல்')}</h2></div><div class="experience-grid"><div class="glass experience reveal"><p class="eyebrow">JUN 2024 — SEP 2025</p><h3>CABOCAB</h3><p>{t('Security-focused testing & quality assurance','பாதுகாப்புச் சோதனை & தர உறுதி')}</p><ul><li>{t('Tested web and mobile applications for vulnerabilities and functional issues.','இணைய மற்றும் கைப்பேசிச் செயலிகளில் பாதிப்புகளையும் செயல்பாட்டுச் சிக்கல்களையும் சோதித்தேன்.')}</li><li>{t('Documented risks and collaborated with developers on fixes.','இடர்களைப் பதிவு செய்து தீர்வுகளுக்காக நிரலாளர்களுடன் இணைந்து பணியாற்றினேன்.')}</li><li>{t('Prepared issue reports and verified remediation.','சிக்கல் அறிக்கைகள் தயாரித்து திருத்தங்களைச் சரிபார்த்தேன்.')}</li></ul></div><div class="glass experience reveal"><p class="eyebrow">{t('3-WEEK CONTRIBUTION','3 வாரப் பங்களிப்பு')}</p><h3>Ducktail Technologies</h3><p>{t('Website Testing Contributor','இணையதளச் சோதனைப் பங்களிப்பாளர்')}</p><ul><li>{t('Performed end-to-end testing of user flows and forms.','பயனர் செயல்பாடுகள் மற்றும் படிவங்களை முழுமையாகச் சோதித்தேன்.')}</li><li>{t('Reported bugs, UI inconsistencies and usability concerns.','பிழைகள், வடிவமைப்பு முரண்பாடுகள் மற்றும் பயன்பாட்டுச் சிக்கல்களைப் பதிவு செய்தேன்.')}</li><li>{t('Helped improve website stability through testing and feedback.','சோதனை மற்றும் கருத்துகள் மூலம் இணையதள நிலைத்தன்மையை மேம்படுத்த உதவினேன்.')}</li></ul></div></div>
</div><ArcheryCertificates {certs} {tamil}/></section>
<section id="research" class="section"><WebResearch {tamil}/><div class="research-web-target">
<article class="research glass reveal"><div class="paper-art" aria-hidden="true"><span>PLUTON</span><div class="paper-orbit"></div><small>RESEARCH / 2026</small></div><div><p class="tag">{t('PUBLISHED RESEARCH · CO-AUTHOR','வெளியிடப்பட்ட ஆய்வு · இணை ஆசிரியர்')}</p><h3>PLUTON: A Discord-Based Command-and-Control (C2) Framework with Offensive Simulation and Detection Capabilities</h3><p>{t('An educational research framework combining controlled offensive simulation with detection and defensive analysis.','கட்டுப்படுத்தப்பட்ட தாக்குதல் உருவகப்படுத்தல், கண்டறிதல் மற்றும் தற்காப்புப் பகுப்பாய்வை இணைக்கும் கல்வி ஆராய்ச்சித் தளம்.')}</p><p class="citation">IJACECT · Vol. 15, Issue 1 · pp. 190–194 · 18 April 2026</p><a class="pill" href="https://doi.org/10.65521/ijacect.v15i1.2367" target="_blank" rel="noreferrer">{t('read the paper ↗','ஆய்வைப் படிக்க ↗')}</a></div></article></div>
<MediumGuide {tamil}/><div class="blogs"><a class="glass blog reveal" href="https://medium.com/@shyamfdo82/how-i-uncovered-an-lfi-in-15-seconds-the-tale-of-a-curious-hacker-and-an-unprepared-server-e49925452007" target="_blank" rel="noreferrer"><p class="tag">MEDIUM · {t('SECURITY RESEARCH','பாதுகாப்பு ஆய்வு')}</p><h3>How I Uncovered an LFI in 15 Seconds</h3><p>{t('The tale of a curious hacker and an unprepared server.','ஒரு ஆர்வமுள்ள ஹாக்கரும் தயாராக இல்லாத சேவையகமும்.')}</p><span>{t('read article ↗','கட்டுரையைப் படிக்க ↗')}</span></a><a class="glass blog reveal" href="https://medium.com/@shyamfdo82/from-code-assistant-to-attack-assistant-ais-double-edged-sword-1d85c27e84d8" target="_blank" rel="noreferrer"><p class="tag">MEDIUM · AI & SECURITY</p><h3>From Code Assistant to Attack Assistant</h3><p>{t("AI's double-edged sword.",'செயற்கை நுண்ணறிவின் இரு முகங்கள்.')}</p><span>{t('read article ↗','கட்டுரையைப் படிக்க ↗')}</span></a></div>
</section>
<section id="media" class="section"><div class="media glass reveal"><a class="media-art vr-art" href="https://youtu.be/q_OlhgizNys" target="_blank" rel="noreferrer" aria-label={t("Watch the cybersecurity conversation","இணையப் பாதுகாப்பு உரையாடலைப் பார்க்க")}><img src="/media/gaming-vr-blue.svg" width="1000" height="1000" alt="" loading="lazy" /><span class="vr-watch">▶ {t("watch the conversation","உரையாடலைப் பார்க்க")}</span></a><div><p class="eyebrow">INDIAGLITZ TAMIL</p><h2>{t('security, for everyone.','பாதுகாப்பு, அனைவருக்கும்.')}</h2><p>{t('Featured as a cybersecurity awareness speaker, discussing digital privacy, mobile security, social engineering and safe online practices in Tamil.','தமிழில் இணையப் பாதுகாப்பு விழிப்புணர்வுப் பேச்சாளராக, தனியுரிமை, கைப்பேசிப் பாதுகாப்பு, சமூகப் பொறியியல் மற்றும் பாதுகாப்பான இணையப் பழக்கங்களைப் பகிர்ந்தேன்.')}</p><a class="pill" href="https://youtu.be/q_OlhgizNys" target="_blank" rel="noreferrer">{t('watch the conversation ↗','உரையாடலைப் பார்க்க ↗')}</a></div></div></section>
<section id="contact" class="contact glass"><div class="contact-snow" aria-hidden="true">{#each Array.from({length:64},(_,i)=>i) as i}<span class:crystal={i%3===0} style={'--left:'+((i*37+11)%100)+'%;--size:'+(8+(i*7)%8)+'px;--duration:'+(6+(i*3)%7)+'s;--delay:-'+((i*1.73)%17)+'s;--drift:'+(-24+(i*13)%49)+'px;--opacity:'+(0.7+(i%4)*0.1)}>{i%3===0?'❄':''}</span>{/each}</div><div class="contact-intro"><div class="contact-copy"><p class="eyebrow">{t('HAVE SOMETHING IN MIND?','ஒரு யோசனை இருக்கிறதா?')}</p><h2>{t("let's get in touch!",'பேசலாம் வாங்க!')}</h2><p>{t('Security research, useful software, or a good conversation.','பாதுகாப்பு ஆராய்ச்சி, பயனுள்ள மென்பொருள் அல்லது நல்ல உரையாடல்.')}</p><a class="contact-email" href="mailto:shyamfdo82@gmail.com">shyamfdo82@gmail.com ↗</a></div><img class="contact-thinking" src="/media/thinking.svg" width="1000" height="900" alt="" aria-hidden="true" loading="lazy" /></div><div class="social-links"><a href="https://github.com/961222243021-sudo" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/shyam-j-8708a6326" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://www.instagram.com/shyam_the_hacker" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://medium.com/@shyamfdo82" target="_blank" rel="noreferrer">Medium ↗</a></div><p class="location">திருநெல்வேலி · தமிழ்நாடு · {t('India','இந்தியா')}</p></section>
</main>
<footer><span>© {new Date().getFullYear()} Shyam J · {t('made with curiosity :]', 'ஆர்வத்துடன் உருவாக்கப்பட்டது :]')}</span><div><a class="bored-link" href="/feedback/">{t("leave a note ↗","கருத்தை எழுதுங்கள் ↗")}</a><a class="destroy-link" href="/destroy/">{t("destroy ↯","அழித்து மீட்போம் ↯")}</a><a href="#home">↑</a></div></footer>
</div>
