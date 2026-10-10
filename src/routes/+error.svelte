<script>
import {page} from '$app/state';
import MagicError from '$lib/components/MagicError.svelte';
</script>
<MagicError status={page.status}/>
