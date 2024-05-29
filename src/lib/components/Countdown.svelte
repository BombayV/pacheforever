<script lang="ts">
	import { fade } from 'svelte/transition';
  import {createEventDispatcher, onMount} from 'svelte';

	const dispatch = createEventDispatcher();
	let timer: ReturnType<typeof setInterval> | null = null;
	let started = false;
	let countdown = 3;

	const startAudio = () => {
		const audio = document.getElementById('audio') as HTMLAudioElement;
		if (audio) {
			audio.play();
			audio.volume = 0.3;
			audio.muted = false;
			audio.autoplay = false;
		}
	};

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

<div class="relative h-screen w-full flex items-center justify-center">
	{#if !started}
		<button
			class="btn w-fit"
			on:click={() => {
				started = true;
				timer = setInterval(() => {
					countdown--;
				}, 1000);
				startAudio();
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
