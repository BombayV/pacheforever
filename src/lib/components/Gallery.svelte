<script lang="ts">
  import {onMount} from 'svelte';
  import {fade} from 'svelte/transition';

  interface Breakpoint {
		value: number;
		columns: number;
	}

	interface Image {
		name: string;
		src: any;
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
	let MAX_LOAD = 4;
  let lastMaxLoad = MAX_LOAD;

	const allImagesModules = import.meta.glob('/src/lib/assets/*.jpeg');
	const allImages = Object.keys(allImagesModules).map((modulePath) => {
		const imageName = modulePath.replace('/src/lib/assets/', '');
		return {
			name: imageName,
			src: allImagesModules[modulePath]
		};
	});
  let displayedImages: Image[][] = [];
  let hasMoreImages = true;
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

    const newImages = allImages.slice(lastMaxLoad, toBeLoaded >= allImages.length ? allImages.length : toBeLoaded);
    const columns = displayedImages.length;
    for (let i = 0; i < newImages.length; i++) {
      displayedImages[i % columns] = [...displayedImages[i % columns], newImages[i]];
    }
    lastMaxLoad += MAX_LOAD;
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

	// const handleScroll = (e: any) => {
	// 	const currentScrollY = window.scrollY;
	// 	console.log(currentScrollY + window.innerHeight, lastMaxScroll, heightContainer);
	// 	if (currentScrollY > lastMaxScroll) {
	// 		increaseLoad();
	// 		heightContainer = document.getElementById('height')!.offsetHeight;
	// 	}
	// };

	onMount(() => {
		getColumns();

		mounted.title = true;
		setTimeout(() => {
			mounted.images = true;
			// heightContainer = document.getElementById('height')?.offsetHeight || 0;
			window.addEventListener('resize', () => getColumns());
			// window.addEventListener('scroll', handleScroll);
			setTimeout(() => {
				mounted.button = true;
			}, 500);
		}, 500);
		return () => {
			window.removeEventListener('resize', () => getColumns());
			// window.addEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="text-white flex flex-col relative w-full py-8 gap-y-8">
	{#if mounted.title}
		<h1 transition:fade class="font-playfair text-center text-3xl md:text-5xl lg:text-6xl">
			Tu Vida A Color
		</h1>
	{/if}
	{#if mounted.images}
		<div
			transition:fade={{
				duration: 1000,
				delay: 500
			}}
			class="w-full relative flex mx-auto gap-2 px-8"
			id="height"
		>
			{#each displayedImages as column}
				<div class={`flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 gap-y-2`}>
					{#each column as image, i}
						<img
							transition:fade={{
								duration: 1000,
								delay: (i + 1) * 500
							}}
							class="aspect-auto rounded-sm drop-shadow-md"
							src={`/images/${image.name}`}
							alt="imagen"
						/>
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
			class="btn w-fit mx-auto"
		>
			Cargar más
		</button>
	{/if}
</div>
