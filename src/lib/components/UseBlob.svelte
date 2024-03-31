<script lang="ts">
	import { onMount } from 'svelte';

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

<div class="fixed true-blur h-screen w-full top-0 left-0 pointer-events-none">
	<span
		class="h-56 w-56 absolute bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-transform duration-300 delay-300"
		bind:this={blurRef}
	></span>
</div>
