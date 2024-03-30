<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { onMount } from 'svelte';

	interface FormExtend {
		message: string | null;
	}

	export let form: FormExtend;
	let hasChanged: boolean = false;
	let blurRef: HTMLSpanElement;
  let moving: boolean = true;

	const handleMouseMovement = (e: MouseEvent) => {
		const { clientX, clientY } = e;
		if (!blurRef) {
			return;
		}

		blurRef.animate(
			{
				transform: `translate(${clientX - 112}px, ${clientY - 112}px)`
			},
			{
				duration: 250,
        fill: 'forwards'
			}
		);
    moving = true;

    setTimeout(() => {
      if (moving) {
        moving = false;
        blurRef.style.transform = `translate(${clientX - 112}px, ${clientY - 112}px)`;
        return;
      }
    }, 249);
	};

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMovement);
		return () => {
			window.removeEventListener('mousemove', handleMouseMovement);
		};
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
	<div class="fixed true-blur h-screen w-full top-0 left-0">
    <span class="h-56 w-56 absolute bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-transform duration-300 delay-300" bind:this={blurRef}></span>
	</div>
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
