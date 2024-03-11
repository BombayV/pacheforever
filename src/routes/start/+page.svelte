<script lang="ts">
  import Countdown from "$lib/components/Countdown.svelte";
  import History from "$lib/components/History.svelte";
  import Gallery from "$lib/components/Gallery.svelte";
  import { fade } from 'svelte/transition';
  import {onMount} from "svelte";

  let steps = [
    'countdown',
    'history',
    'gallery'
  ]
  let currentStep = 2;

  const startMusic = () => {
    // Interact with the DOM first
    const audio = new Audio('/Aviva.mp3');
    audio.loop = true;
    audio.volume = 1.0;
    audio.autoplay = true;
    audio.muted = false;
    audio.play();

    currentStep = 1;
  }
</script>

<svelte:head>
  <title>Tu Historia | ILovePache</title>
  <meta name="description" content="Esta es tu historia, tu vida, tu legado. Lo que haces, lo que eres, lo que quieres ser. Mi amiga, mi abuela, mi madre, Pache.">
</svelte:head>

<div class="bg-neutral-950 relative w-full min-h-screen font-raleway flex justify-center">
  {#if currentStep === 0}
    <Countdown on:countdownEnd={startMusic} />
  {:else if currentStep === 1}
    <History/>
  {:else if currentStep === 2}
    <Gallery/>
  {/if}
</div>