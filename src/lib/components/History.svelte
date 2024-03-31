<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Delay } from '$lib/utils/Delay';

	const dispatch = createEventDispatcher();

	interface StoryTimeline {
		title: string;
		loaded?: boolean;
		hideTitle?: boolean;
		image?: string;
	}

	let currentStory = 0;
	const storyTimeline: StoryTimeline[] = [
		{
			title: '',
			hideTitle: false
		},
		{
			title: 'En 1936, nacio una mujer muy especial',
			image: '/images/IMG_7612.JPG',
			loaded: false,
			hideTitle: false
		},
		{
			title: 'Ella es la madre de todos nosotros',
			hideTitle: false
		},
		{
			title: 'La que nos dio la vida',
			hideTitle: false
		}
	];

	const nextStory = async () => {
		currentStory++;

		// Text delay
		await Delay(6500);
		storyTimeline[currentStory].hideTitle = true;
		if (storyTimeline[currentStory].image) {
			// Hide text delay
			await Delay(3000);
			storyTimeline[currentStory].loaded = true;
			await Delay(6500);
			storyTimeline[currentStory].loaded = false;
		}
		await Delay(3000);
		if (currentStory + 1 >= storyTimeline.length) {
			dispatch('historyEnd');
			return;
		}
		nextStory();
	};

	onMount(() => {
		nextStory();
	});
</script>

<div class="relative h-screen w-full flex items-center justify-center">
	{#if storyTimeline[currentStory].title && !storyTimeline[currentStory].hideTitle}
		<h1
			class="text-white text-4xl md:text-5xl 2xl:text-6xl px-12 text-center font-script font-extralight drop-shadow-md"
			in:fade={{
				duration: 4000
			}}
			out:fade={{
				duration: 3000
			}}
		>
			{storyTimeline[currentStory].title}
		</h1>
	{/if}
	{#if storyTimeline[currentStory].image && storyTimeline[currentStory].loaded}
		<img
			in:fade={{
				duration: 4000
			}}
			out:fade={{
				duration: 3000
			}}
			src={storyTimeline[currentStory].image}
			alt={storyTimeline[currentStory].title}
			class="aspect-auto w-5/6 h-auto md:w-auto md:h-3/5 z-10 rounded drop-shadow-md"
		/>
	{/if}
</div>
