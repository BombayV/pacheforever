<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Image } from '$lib/components/types';
	import UseImageViewer from '$lib/components/UseImageViewer.svelte';

	interface Breakpoint {
		value: number;
		columns: number;
	}

	const BREAKPOINTS: Record<string, Breakpoint> = {
		sm: {
			value: 640,
			columns: 2
		},
		lg: {
			value: 1024,
			columns: 3
		},
		xl: {
			value: 1280,
			columns: 4
		},
		'2xl': {
			value: 1536,
			columns: 5
		}
	};
	let MAX_LOAD = 8;
	let lastMaxLoad = MAX_LOAD;

	const allImagesModules = import.meta.glob('/src/lib/assets/*.jpg', {
		eager: true,
		query: {
			enhanced: true
		}
	});
	const allImages = Object.keys(allImagesModules).map(
		(modulePath) => (allImagesModules[modulePath] as any).default
	);
	let displayedImages: Image[][] = [];
	let hasMoreImages = true;
	let selectedImage: Image | null = null;
	let mounted = {
		title: false,
		images: false,
		button: false
	};

	const increaseLoad = () => {
		const toBeLoaded = lastMaxLoad + MAX_LOAD;
		if (toBeLoaded >= allImages.length) {
			hasMoreImages = false;
		}

		const newImages = allImages.slice(
			lastMaxLoad,
			toBeLoaded >= allImages.length ? allImages.length : toBeLoaded
		);
		const columns = displayedImages.length;
		for (let i = 0; i < newImages.length; i++) {
			displayedImages[i % columns] = [...displayedImages[i % columns], newImages[i]];
		}
		lastMaxLoad += MAX_LOAD;
		handleImageSize();
	};

	const handleImageSize = () => {
		const columnsHeights = [];
		for (let i = 0; i < displayedImages.length; i++) {
			let columnHeight = 0;
			columnsHeights.push(columnHeight);
			for (const image of displayedImages[i]) {
				columnsHeights[i] += (image as unknown as { img: { h: number } }).img.h;
			}
		}

		const MAX_DIFFERENCE = 2000;
		const shortestColumn = columnsHeights.indexOf(Math.min(...columnsHeights));

		// Move images to the shortest column
		for (let i = 0; i < displayedImages.length; i++) {
			const column = displayedImages[i];
			const columnHeight = columnsHeights[i];
			if (columnHeight - columnsHeights[shortestColumn] > MAX_DIFFERENCE) {
				const image = column.pop();
				displayedImages[shortestColumn].push(image as Image);
				columnsHeights[i] -= (image as unknown as { img: { h: number } }).img.h;
				columnsHeights[shortestColumn] += (image as unknown as { img: { h: number } }).img.h;
			}
		}
	};

	const initialCols = (columns: number): Image[][] => {
		const newColumns = new Array(columns).fill(0).map(() => []) as Image[][];
		const images = allImages.slice(0, lastMaxLoad);
		for (let i = 0; i < images.length; i++) {
			newColumns[i % columns].push(images[i]);
		}
		return newColumns;
	};

	const getColumns = () => {
		const width = window.innerWidth;
		const breakpoint =
			Object.keys(BREAKPOINTS).find((key) => {
				return width < BREAKPOINTS[key].value;
			}) || '2xl';
		const COLUMNS = BREAKPOINTS[breakpoint].columns;
		if (COLUMNS === displayedImages.length) return;
		displayedImages = initialCols(COLUMNS);
	};

	onMount(() => {
		getColumns();

		mounted.title = true;
		setTimeout(() => {
			mounted.images = true;
			window.addEventListener('resize', () => getColumns());
			setTimeout(() => {
				mounted.button = true;
			}, 500);
		}, 500);
		return () => {
			window.removeEventListener('resize', () => getColumns());
		};
	});
</script>

<div class="text-white flex flex-col relative w-full py-8 gap-y-8">
	{#if mounted.title}
		<h1 transition:fade class="font-script text-center text-4xl md:text-5xl lg:text-6xl">
			Tu Vida A Color
		</h1>
		<span class="block h-0.5 w-1/6 bg-white mx-auto"></span>
	{/if}
	{#if mounted.images}
		<div
			transition:fade={{
				duration: 1000,
				delay: 500
			}}
			class="w-full relative flex mx-auto gap-2 px-8 z-20"
			id="height"
		>
			{#each displayedImages as column, colIdx}
				<div class={`flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 gap-y-2`}>
					{#each column as image, imgIdx}
						<button
							class="relative flex justify-center items-center"
							transition:fade={{
								duration: 1000,
								delay: (colIdx + 1 + imgIdx) * 250
							}}
							on:click={() => (selectedImage = image)}
						>
							<enhanced:img
								class={`aspect-auto rounded-sm drop-shadow-lg w-full h-auto`}
								src={image}
								alt={`Imagen ${imgIdx * colIdx + 1}`}
								draggable={false}
							/>
							<span
								class="absolute opacity-0 bg-black transition-opacity duration-500 hover:opacity-30 w-full h-full"
							></span>
						</button>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
	{#if mounted.button && hasMoreImages}
		<button
			transition:fade={{
				duration: 1000,
				delay: 1000
			}}
			on:click={increaseLoad}
			class="btn w-fit mx-auto z-10"
		>
			Cargar más
		</button>
	{/if}
	<UseImageViewer bind:selectedImage />
</div>
