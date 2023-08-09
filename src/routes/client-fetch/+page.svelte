<script lang="ts">
	import { writable } from 'svelte/store';

	export let data;
	let windowFetchData = writable('');
	async function fetchWithWindowFetch() {
		const res = await window.fetch('/api/message/2');
		const text = await res.text();
		windowFetchData.set(JSON.stringify(text));
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<p>
		While loading this page, a fetch request is made on the client side when the <code>load</code> function
		is running. This one should be instrumented.
	</p>
	<p>
		fetch result from <code>load</code> function: {JSON.stringify(data.msg)}
	</p>
	<p>
		In addition, also a <code>window.fetch</code> should be instrumented:
	</p>
	<button on:click={fetchWithWindowFetch}> trigger a window.fetch </button>
	<p>
		Fetch result from <code>window.fetch</code>: {$windowFetchData}
	</p>
</div>
