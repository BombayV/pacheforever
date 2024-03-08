<script lang="ts">
  import {onMount} from "svelte";

  interface Breakpoint {
    value: number;
    columns: number;
  }

  interface Image {
    name: string;
    src: any;
    loaded: boolean;
  }

  const BREAKPOINTS: Record<string, Breakpoint> = {
    sm: {
      value: 640,
      columns: 2,
    },
    lg: {
      value: 1024,
      columns: 3,
    },
    xl: {
      value: 1280,
      columns: 4,
    },
    '2xl': {
      value: 1536,
      columns: 5,
    }
  }
  const MAX_LOAD = 10;

  const allImagesModules = import.meta.glob('/src/lib/assets/*.jpeg');
  const allImages = Object.keys(allImagesModules).map((modulePath) => {
    const imageName = modulePath.replace('/src/lib/assets/', '');
    return {
      name: imageName,
      src: allImagesModules[modulePath]
    }
  })
  let loadedImages = allImages.slice(0, MAX_LOAD).map((image) => {
    return {
      ...image,
      loaded: false,
    }
  });
  let displayedImages: Array<Image[]> = [];

  const increaseLoad = () => {
    const newLoad = loadedImages.length + MAX_LOAD;
    const newImages = allImages.slice(loadedImages.length, newLoad).map((image) => {
      return {
        ...image,
        loaded: false,
      }
    });
    loadedImages = [...loadedImages, ...newImages];
  }

  const getColumns = () => {
    const width = window.innerWidth;
    const breakpoint = Object.keys(BREAKPOINTS).find((key) => {
      return width < BREAKPOINTS[key].value;
    }) || '2xl';
    return BREAKPOINTS[breakpoint].columns;
  }

  const distributeImages = (images: Image[], columns: number) => {
    for (const image of images) {
      console.log('image', image);
    }
    const newContainers: Array<Image[]> = Array.from({length: columns}, () => []);
    for (let i = 0; i < images.length; i++) {
      const column = i % columns;
      newContainers[column].push(images[i]);
    }
    displayedImages = newContainers;
  }

  onMount(() => {
    distributeImages(loadedImages, getColumns());
    window.addEventListener('resize',() => distributeImages(loadedImages, getColumns()));

    return () => {
      window.removeEventListener('resize', () => distributeImages(loadedImages, getColumns()));
    }
  })
</script>

<div class="text-white flex flex-col relative w-full py-8 gap-y-8">
  <h1 class="font-playfair text-center text-3xl md:text-5xl lg:text-6xl">Tu Vida A Color</h1>
  <div class="w-full relative flex mx-auto gap-2 px-8">
    {#each displayedImages as column}
      <div class={`flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 gap-y-2`}>
        {#each column as image}
          <img class="aspect-auto rounded-sm drop-shadow-md" src={`/images/${image.name}`} alt="imagen" />
        {/each}
      </div>
    {/each}
  </div>
</div>