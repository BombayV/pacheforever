<script lang="ts">
	import { fade } from 'svelte/transition';

	export let selectedImage: string | null = null;
</script>

{#if selectedImage}
	<button
		type="button"
		on:keydown={(e) => e.key === 'Escape' && (selectedImage = null)}
		on:click|self={() => (selectedImage = null)}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
		transition:fade
	>
		<img
			src={`/${selectedImage}`}
			alt="Preview of the selected photograph"
			class="max-w-full max-h-full h-auto w-auto aspect-auto"
		/>
	</button>
{/if}
