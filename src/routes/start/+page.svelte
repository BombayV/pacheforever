<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import History from '$lib/components/History.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import UseBlob from '$lib/components/UseBlob.svelte';
  import {onMount} from "svelte";

	let currentStep = 0;

  onMount(() => {
    const alreadyVisited = localStorage.getItem('alreadyVisited');
    if (alreadyVisited) {
      currentStep = 2;
    } else {
      localStorage.setItem('alreadyVisited', 'true');
    }
  });
</script>

<svelte:head>
	<title>Tu Historia | ILovePache</title>
	<meta
		name="description"
		content="Esta es tu historia, tu vida, tu legado. Lo que haces, lo que eres, lo que quieres ser. Mi amiga, mi abuela, mi madre, Pache."
	/>
</svelte:head>

<div class="bg-neutral-950 relative w-full min-h-screen font-raleway flex justify-center">
	<UseBlob />
	{#if currentStep === 0}
		<Countdown on:countdownEnd={() => (currentStep = 1)} />
	{:else if currentStep === 1}
		<History on:historyEnd={() => (currentStep = 2)} />
	{:else if currentStep === 2}
		<Gallery />
	{/if}
	<audio id="audio" loop muted>
		<source src="/Aviva.mp3" type="audio/mpeg" />
	</audio>
</div>
