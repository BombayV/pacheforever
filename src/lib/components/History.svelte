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
		},
		{
			title: 'Esta es la historia de Leonor',
      image: '7.jpg'
		},
		{
			title: 'Una niña que creció en el pequeño pueblo de Rayón, San Luis Potosí',
      image: '12.jpeg',
		},
    {
      title: 'Esposa desde los 19 años',
      image: '1.jpg',
    },
    {
      title: 'Mamá de 7 hijos',
      image: '9.jpg',
    },
    {
      title: 'Abuela de 17 hermosos nietos',
      image: '10.jpg',
    },
    {
      title: 'Y bisabuela de 10 bisnietos',
      image: '8.jpg'
    },
    {
      title: 'Una mujer que siempre ofrecia a todos un lugar en la cocina',
    },
    {
      title: 'Unos dias tacos, otros frijoles negros y hasta pozole en ocasiones especiales',
    },
    {
      title: 'Siempre dedicada al hogar y madrugadora para preparar el desayuno',
      image: '3.jpg'
    },
    {
      title: 'Una cual ha viajado atravez del mundo gracias a sus hijos/hijas',
      image: '4.jpg'
    },
    {
      title: 'Una madre que siempre atendio a sus hijos y busco la manera de darles una oportunidad de seguir adelante',
      image: '6.JPG'
    },
    {
      title: 'Una amiga la cual hace platica cuando se puede, aunque esten en una fila',
      image: '11.jpg'
    },
    {
      title: 'Y pesar de todos los eventos que han occurido, aquella mujer sigue parada con nosotros',
      image: '2.jpg'
    },
    {
      title: 'Y por eso y mas, te damos las gracias Pache ❤️',
      image: '5.jpg'
    },
	];

	const nextStory = async () => {
		currentStory++;
    if (currentStory >= storyTimeline.length) {
      return;
    }

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
		await nextStory();
	};

	onMount(() => {
    for (let i = 0; i < storyTimeline.length; i++) {
      storyTimeline[i].hideTitle = false;
      storyTimeline[i].loaded = false;
    }
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
			src={`https://leonorpache.com/${storyTimeline[currentStory].image}`}
			alt={storyTimeline[currentStory].title}
			class="aspect-auto w-5/6 h-auto md:w-auto md:h-3/5 z-10 rounded drop-shadow-md"
		/>
	{/if}
</div>
