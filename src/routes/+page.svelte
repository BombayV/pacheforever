<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import UseBlob from '$lib/components/UseBlob.svelte';
  import {onMount} from "svelte";

	interface FormExtend {
		message: string | null;
	}

	export let form: FormExtend;
	let hasChanged: boolean = false;

  onMount(() => {
    const alreadyVisited = localStorage.getItem('alreadyVisited');
    if (alreadyVisited) {
      localStorage.removeItem('alreadyVisited');
    }
  });
</script>

<svelte:head>
	<title>Inicio | ILovePache</title>
	<meta
		name="description"
		content="Bienvenida a la experiencia de Pache, una forma de vivir la vida de mi amada abuela."
	/>
</svelte:head>

<main
	class="bg-neutral-950 w-full h-screen flex flex-col items-center justify-center text-white font-raleway"
>
	<UseBlob />
	<div class="z-50 flex flex-col w-full justify-center items-center">
		<Typewriter mode="loop" wordInterval={2000} unwriteInterval={75} interval={150} delay={100}>
			<p class="font-bold text-4xl md:text-6xl lg:text-7xl">Bienvenida, Pache!</p>
			<p class="font-bold text-4xl md:text-6xl lg:text-7xl">Welcome, Pache!</p>
			<p class="font-bold text-4xl md:text-6xl lg:text-7xl">Willkommen, Pache!</p>
			<p class="font-bold text-4xl md:text-6xl lg:text-7xl">Benvenuto, Pache!</p>
			<p class="font-bold text-4xl md:text-6xl lg:text-7xl">Bienvenue, Pache!</p>
		</Typewriter>
		<form
			class="flex flex-col items-center justify-center mt-8 relative max-w-xs bg-transparent"
			method="POST"
			action="?/exchangeCode"
		>
			<div class="absolute w-40 h-12 rounded-full bg-neutral-400 blur-2xl bg-opacity-70"></div>
			<input
				name="code"
				type="text"
				class="bg-neutral-800 text-white p-2 rounded-md w-full text-center card outline-0 text-sm md:text-base capitalize ring-0"
				placeholder="0B1C2A"
				on:input={(e) => {
					if (e.currentTarget) e.currentTarget.value = e.currentTarget.value.toUpperCase();
					if (!hasChanged) hasChanged = true;
				}}
			/>
			<button class="btn">Empezar experiencia?</button>
			{#if form?.message && !hasChanged}
				<p class="text-red-500 mt-2 text-sm">{form.message}</p>
			{/if}
		</form>
	</div>
</main>
