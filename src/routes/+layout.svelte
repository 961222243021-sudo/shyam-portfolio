<script>
import {onMount} from 'svelte';
import "$lib/styles/fonts.css";
import "$lib/styles/portfolio.css";
import DesktopWelcome from '$lib/components/DesktopWelcome.svelte';
let {children}=$props();
let mobile=$state(false);
onMount(()=>{
 const deviceMedia=matchMedia('(pointer: coarse) and (max-width: 1400px)');
 const update=()=>{mobile=deviceMedia.matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1)};
 update();deviceMedia.addEventListener('change',update);
 return()=>deviceMedia.removeEventListener('change',update);
});
</script>
<DesktopWelcome active={mobile}/>
{#if !mobile}<div class="desktop-content">{@render children()}</div>{/if}
<style>@media(pointer:coarse) and (max-width:1400px){.desktop-content{display:none}}</style>
