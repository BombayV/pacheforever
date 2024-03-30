<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let timer: ReturnType<typeof setInterval> | null = null;
	let started = false;
	let countdown = 3;

	$: {
		if (countdown < 0) {
			if (timer) {
				clearInterval(timer);
				timer = null;
				setTimeout(() => {
					dispatch('countdownEnd');
				}, 1000);
			}
		}
	}
</script>

<div class="">
	{#if !started}
		<button
			class="btn"
			on:click={() => {
				started = true;
				timer = setInterval(() => {
					countdown--;
				}, 1000);
			}}
		>
			Empezamos?
		</button>
	{/if}
	{#if started && countdown >= 0}
		<p
			class="text-white text-6xl md:text-7xl 2xl:text-9xl"
			transition:fade={{
				duration: 1000
			}}
		>
			{countdown}
		</p>
	{/if}
</div>
