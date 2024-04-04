<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
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

  const ALL_IMAGES: string[] = ['IMG_0259.jpeg', 'IMG_0609.jpeg', 'IMG_0520.jpeg', 'IMG_0465.jpeg', 'IMG_0577.jpeg', 'IMG_0598.jpeg', 'IMG_0432.jpeg', 'IMG_0648.jpeg', 'IMG_0561.jpeg', 'IMG_0424.jpeg', 'IMG_0536.jpeg', 'IMG_0473.jpeg', 'IMG_0664.jpeg', 'IMG_0234.jpeg', 'IMG_0371.jpeg', 'IMG_0408.jpeg', 'IMG_0263.jpeg', 'IMG_0633.jpeg', 'IMG_0326.jpeg', 'IMG_0625.jpeg', 'IMG_0275.jpeg', 'IMG_0330.jpeg', 'IMG_0449.jpeg', 'IMG_0222.jpeg', 'IMG_0388.jpeg', 'IMG_0672.jpeg', 'IMG_0367.jpeg', 'IMG_0486.jpeg', 'IMG_0469.jpeg', 'IMG_0310.jpeg', 'IMG_0605.jpeg', 'IMG_0255.jpeg', 'IMG_0594.jpeg', 'IMG_0347.jpeg', 'IMG_0202.jpeg', 'IMG_0652.jpeg', 'IMG_0582.jpeg', 'IMG_0428.jpeg', 'IMG_0351.jpeg', 'IMG_0644.jpeg', 'IMG_0214.jpeg', 'IMG_0490.jpeg', 'IMG_0306.jpeg', 'IMG_0243.jpeg', 'IMG_0613.jpeg', 'IMG_0404.jpeg', 'IMG_0541.jpeg', 'IMG_0238.jpeg', 'IMG_0392.jpeg', 'IMG_0668.jpeg', 'IMG_0453.jpeg', 'IMG_0516.jpeg', 'IMG_0280.jpeg', 'IMG_0445.jpeg', 'IMG_0500.jpeg', 'IMG_0279.jpeg', 'IMG_0629.jpeg', 'IMG_0296.jpeg', 'IMG_0412.jpeg', 'IMG_0557.jpeg', 'IMG_0384.jpeg', 'IMG_0385.jpeg', 'IMG_0413.jpeg', 'IMG_0556.jpeg', 'IMG_0278.jpeg', 'IMG_0628.jpeg', 'IMG_0297.jpeg', 'IMG_0444.jpeg', 'IMG_0501.jpeg', 'IMG_0281.jpeg', 'IMG_0452.jpeg', 'IMG_0517.jpeg', 'IMG_0239.jpeg', 'IMG_0393.jpeg', 'IMG_0669.jpeg', 'IMG_0405.jpeg', 'IMG_0540.jpeg', 'IMG_0307.jpeg', 'IMG_0242.jpeg', 'IMG_0612.jpeg', 'IMG_0491.jpeg', 'IMG_0350.jpeg', 'IMG_0645.jpeg', 'IMG_0215.jpeg', 'IMG_0583.jpeg', 'IMG_0429.jpeg', 'IMG_0346.jpeg', 'IMG_0203.jpeg', 'IMG_0653.jpeg', 'IMG_0595.jpeg', 'IMG_0311.jpeg', 'IMG_0604.jpeg', 'IMG_0254.jpeg', 'IMG_0487.jpeg', 'IMG_0468.jpeg', 'IMG_0223.jpeg', 'IMG_0389.jpeg', 'IMG_0673.jpeg', 'IMG_0366.jpeg', 'IMG_0448.jpeg', 'IMG_0624.jpeg', 'IMG_0274.jpeg', 'IMG_0331.jpeg', 'IMG_0262.jpeg', 'IMG_0632.jpeg', 'IMG_0327.jpeg', 'IMG_0409.jpeg', 'IMG_0665.jpeg', 'IMG_0235.jpeg', 'IMG_0370.jpeg', 'IMG_0537.jpeg', 'IMG_0472.jpeg', 'IMG_0560.jpeg', 'IMG_0425.jpeg', 'IMG_0219.jpeg', 'IMG_0649.jpeg', 'IMG_0576.jpeg', 'IMG_0599.jpeg', 'IMG_0433.jpeg', 'IMG_0521.jpeg', 'IMG_0464.jpeg', 'IMG_0258.jpeg', 'IMG_0608.jpeg', 'IMG_0480.jpeg', 'IMG_0195.jpeg', 'IMG_0316.jpeg', 'IMG_0603.jpeg', 'IMG_0253.jpeg', 'IMG_0438.jpeg', 'IMG_0592.jpeg', 'IMG_0341.jpeg', 'IMG_0204.jpeg', 'IMG_0654.jpeg', 'IMG_0584.jpeg', 'IMG_0357.jpeg', 'IMG_0642.jpeg', 'IMG_0212.jpeg', 'IMG_0496.jpeg', 'IMG_0479.jpeg', 'IMG_0300.jpeg', 'IMG_0245.jpeg', 'IMG_0615.jpeg', 'IMG_0402.jpeg', 'IMG_0547.jpeg', 'IMG_0394.jpeg', 'IMG_0681.jpeg', 'IMG_0455.jpeg', 'IMG_0510.jpeg', 'IMG_0639.jpeg', 'IMG_0269.jpeg', 'IMG_0286.jpeg', 'IMG_0443.jpeg', 'IMG_0506.jpeg', 'IMG_0290.jpeg', 'IMG_0414.jpeg', 'IMG_0551.jpeg', 'IMG_0382.jpeg', 'IMG_0678.jpeg', 'IMG_0228.jpeg', 'IMG_0526.jpeg', 'IMG_0199.jpeg', 'IMG_0463.jpeg', 'IMG_0658.jpeg', 'IMG_0208.jpeg', 'IMG_0571.jpeg', 'IMG_0434.jpeg', 'IMG_0567.jpeg', 'IMG_0422.jpeg', 'IMG_0588.jpeg', 'IMG_0619.jpeg', 'IMG_0249.jpeg', 'IMG_0530.jpeg', 'IMG_0475.jpeg', 'IMG_0398.jpeg', 'IMG_0662.jpeg', 'IMG_0232.jpeg', 'IMG_0377.jpeg', 'IMG_0265.jpeg', 'IMG_0635.jpeg', 'IMG_0320.jpeg', 'IMG_0459.jpeg', 'IMG_0623.jpeg', 'IMG_0273.jpeg', 'IMG_0336.jpeg', 'IMG_0224.jpeg', 'IMG_0674.jpeg', 'IMG_0361.jpeg', 'IMG_0418.jpeg', 'IMG_0419.jpeg', 'IMG_0225.jpeg', 'IMG_0675.jpeg', 'IMG_0360.jpeg', 'IMG_0622.jpeg', 'IMG_0272.jpeg', 'IMG_0337.jpeg', 'IMG_0458.jpeg', 'IMG_0264.jpeg', 'IMG_0634.jpeg', 'IMG_0321.jpeg', 'IMG_0399.jpeg', 'IMG_0663.jpeg', 'IMG_0233.jpeg', 'IMG_0376.jpeg', 'IMG_0531.jpeg', 'IMG_0474.jpeg', 'IMG_0618.jpeg', 'IMG_0248.jpeg', 'IMG_0566.jpeg', 'IMG_0423.jpeg', 'IMG_0589.jpeg', 'IMG_0570.jpeg', 'IMG_0435.jpeg', 'IMG_0659.jpeg', 'IMG_0209.jpeg', 'IMG_0527.jpeg', 'IMG_0198.jpeg', 'IMG_0462.jpeg', 'IMG_0218.gif', 'IMG_0383.jpeg', 'IMG_0679.jpeg', 'IMG_0229.jpeg', 'IMG_0415.jpeg', 'IMG_0550.jpeg', 'IMG_0291.jpeg', 'IMG_0442.jpeg', 'IMG_0507.jpeg', 'IMG_0638.jpeg', 'IMG_0268.jpeg', 'IMG_0287.jpeg', 'IMG_0454.jpeg', 'IMG_0511.jpeg', 'IMG_0395.jpeg', 'IMG_0680.jpeg', 'IMG_0403.jpeg', 'IMG_0546.jpeg', 'IMG_0301.jpeg', 'IMG_0244.jpeg', 'IMG_0614.jpeg', 'IMG_0497.jpeg', 'IMG_0478.jpeg', 'IMG_0356.jpeg', 'IMG_0643.jpeg', 'IMG_0213.jpeg', 'IMG_0585.jpeg', 'IMG_0340.jpeg', 'IMG_0205.jpeg', 'IMG_0655.jpeg', 'IMG_0439.jpeg', 'IMG_0593.jpeg', 'IMG_0317.jpeg', 'IMG_0602.jpeg', 'IMG_0252.jpeg', 'IMG_0481.jpeg', 'IMG_0380.jpeg', 'IMG_0553.jpeg', 'IMG_0416.jpeg', 'IMG_0338.jpeg', 'IMG_0292.jpeg', 'IMG_0504.jpeg', 'IMG_0441.jpeg', 'IMG_0284.jpeg', 'IMG_0512.jpeg', 'IMG_0457.jpeg', 'IMG_0683.jpeg', 'IMG_0379.jpeg', 'IMG_0396.jpeg', 'IMG_0545.jpeg', 'IMG_0400.jpeg', 'IMG_0247.jpeg', 'IMG_0617.jpeg', 'IMG_0302.jpeg', 'IMG_0494.jpeg', 'IMG_0640.jpeg', 'IMG_0210.jpeg', 'IMG_0355.jpeg', 'IMG_0586.jpeg', 'IMG_0569.jpeg', 'IMG_0206.jpeg', 'IMG_0656.jpeg', 'IMG_0343.jpeg', 'IMG_0590.jpeg', 'IMG_0601.jpeg', 'IMG_0251.jpeg', 'IMG_0314.jpeg', 'IMG_0197.jpeg', 'IMG_0482.jpeg', 'IMG_0528.jpeg', 'IMG_0363.jpeg', 'IMG_0226.jpeg', 'IMG_0676.jpeg', 'IMG_0508.jpeg', 'IMG_0334.jpeg', 'IMG_0621.jpeg', 'IMG_0271.jpeg', 'IMG_0322.jpeg', 'IMG_0288.jpeg', 'IMG_0267.jpeg', 'IMG_0637.jpeg', 'IMG_0549.jpeg', 'IMG_0375.jpeg', 'IMG_0660.jpeg', 'IMG_0230.jpeg', 'IMG_0477.jpeg', 'IMG_0498.jpeg', 'IMG_0532.jpeg', 'IMG_0420.jpeg', 'IMG_0565.jpeg', 'IMG_0359.jpeg', 'IMG_0436.jpeg', 'IMG_0573.jpeg', 'IMG_0461.jpeg', 'IMG_0524.jpeg', 'IMG_0318.jpeg', 'IMG_0319.jpeg', 'IMG_0460.jpeg', 'IMG_0525.jpeg', 'IMG_0437.jpeg', 'IMG_0572.jpeg', 'IMG_0358.jpeg', 'IMG_0421.jpeg', 'IMG_0564.jpeg', 'IMG_0476.jpeg', 'IMG_0499.jpeg', 'IMG_0533.jpeg', 'IMG_0374.jpeg', 'IMG_0661.jpeg', 'IMG_0231.jpeg', 'IMG_0548.jpeg', 'IMG_0323.jpeg', 'IMG_0289.jpeg', 'IMG_0266.jpeg', 'IMG_0636.jpeg', 'IMG_0335.jpeg', 'IMG_0620.jpeg', 'IMG_0270.jpeg', 'IMG_0509.jpeg', 'IMG_0362.jpeg', 'IMG_0227.jpeg', 'IMG_0677.jpeg', 'IMG_0196.jpeg', 'IMG_0483.jpeg', 'IMG_0529.jpeg', 'IMG_0600.jpeg', 'IMG_0250.jpeg', 'IMG_0315.jpeg', 'IMG_0591.jpeg', 'IMG_0207.jpeg', 'IMG_0657.jpeg', 'IMG_0342.jpeg', 'IMG_0587.jpeg', 'IMG_0568.jpeg', 'IMG_0641.jpeg', 'IMG_0211.jpeg', 'IMG_0354.jpeg', 'IMG_0495.jpeg', 'IMG_0246.jpeg', 'IMG_0616.jpeg', 'IMG_0303.jpeg', 'IMG_0544.jpeg', 'IMG_0401.jpeg', 'IMG_0682.jpeg', 'IMG_0378.jpeg', 'IMG_0397.jpeg', 'IMG_0513.jpeg', 'IMG_0456.jpeg', 'IMG_0285.jpeg', 'IMG_0505.jpeg', 'IMG_0440.jpeg', 'IMG_0339.jpeg', 'IMG_0293.jpeg', 'IMG_0552.jpeg', 'IMG_0417.jpeg', 'IMG_0381.jpeg', 'IMG_0559.jpeg', 'IMG_0365.jpeg', 'IMG_0220.jpeg', 'IMG_0670.jpeg', 'IMG_0298.jpeg', 'IMG_0332.jpeg', 'IMG_0627.jpeg', 'IMG_0277.jpeg', 'IMG_0518.jpeg', 'IMG_0324.jpeg', 'IMG_0261.jpeg', 'IMG_0631.jpeg', 'IMG_0373.jpeg', 'IMG_0666.jpeg', 'IMG_0236.jpeg', 'IMG_0471.jpeg', 'IMG_0534.jpeg', 'IMG_0308.jpeg', 'IMG_0426.jpeg', 'IMG_0563.jpeg', 'IMG_0430.jpeg', 'IMG_0575.jpeg', 'IMG_0349.jpeg', 'IMG_0467.jpeg', 'IMG_0522.jpeg', 'IMG_0488.jpeg', 'IMG_0369.jpeg', 'IMG_0386.jpeg', 'IMG_0555.jpeg', 'IMG_0410.jpeg', 'IMG_0294.jpeg', 'IMG_0502.jpeg', 'IMG_0447.jpeg', 'IMG_0282.jpeg', 'IMG_0328.jpeg', 'IMG_0514.jpeg', 'IMG_0451.jpeg', 'IMG_0390.jpeg', 'IMG_0543.jpeg', 'IMG_0406.jpeg', 'IMG_0241.jpeg', 'IMG_0611.jpeg', 'IMG_0304.jpeg', 'IMG_0538.jpeg', 'IMG_0492.jpeg', 'IMG_0646.jpeg', 'IMG_0216.jpeg', 'IMG_0353.jpeg', 'IMG_0580.jpeg', 'IMG_0200.jpeg', 'IMG_0650.jpeg', 'IMG_0345.jpeg', 'IMG_0596.jpeg', 'IMG_0579.jpeg', 'IMG_0607.jpeg', 'IMG_0257.jpeg', 'IMG_0312.jpeg', 'IMG_0484.jpeg', 'IMG_0485.jpeg', 'IMG_0606.jpeg', 'IMG_0256.jpeg', 'IMG_0313.jpeg', 'IMG_0597.jpeg', 'IMG_0578.jpeg', 'IMG_0201.jpeg', 'IMG_0651.jpeg', 'IMG_0344.jpeg', 'IMG_0581.jpeg', 'IMG_0647.jpeg', 'IMG_0217.jpeg', 'IMG_0352.jpeg', 'IMG_0539.jpeg', 'IMG_0493.jpeg', 'IMG_0240.jpeg', 'IMG_0610.jpeg', 'IMG_0305.jpeg', 'IMG_0542.jpeg', 'IMG_0407.jpeg', 'IMG_0391.jpeg', 'IMG_0515.jpeg', 'IMG_0450.jpeg', 'IMG_0283.jpeg', 'IMG_0329.jpeg', 'IMG_0503.jpeg', 'IMG_0446.jpeg', 'IMG_0295.jpeg', 'IMG_0554.jpeg', 'IMG_0411.jpeg', 'IMG_0368.jpeg', 'IMG_0387.jpeg', 'IMG_0466.jpeg', 'IMG_0523.jpeg', 'IMG_0489.jpeg', 'IMG_0348.jpeg', 'IMG_0431.jpeg', 'IMG_0574.jpeg', 'IMG_0427.jpeg', 'IMG_0562.jpeg', 'IMG_0309.jpeg', 'IMG_0470.jpeg', 'IMG_0535.jpeg', 'IMG_0372.jpeg', 'IMG_0667.jpeg', 'IMG_0237.jpeg', 'IMG_0325.jpeg', 'IMG_0260.jpeg', 'IMG_0630.jpeg', 'IMG_0519.jpeg', 'IMG_0299.jpeg', 'IMG_0333.jpeg', 'IMG_0626.jpeg', 'IMG_0276.jpeg', 'IMG_0364.jpeg', 'IMG_0221.jpeg', 'IMG_0671.jpeg', 'IMG_0558.jpeg'];
	let displayedImages: string[][] = [];
	let hasMoreImages = true;
	let selectedImage: string | null = null;
	let mounted = {
		title: false,
		images: false,
		button: false
	};

	const increaseLoad = () => {
		const toBeLoaded = lastMaxLoad + MAX_LOAD;
		if (toBeLoaded >= ALL_IMAGES.length) {
			hasMoreImages = false;
		}

		const newImages = ALL_IMAGES.slice(
			lastMaxLoad,
			toBeLoaded >= ALL_IMAGES.length ? ALL_IMAGES.length : toBeLoaded
		);
		const columns = displayedImages.length;
    let smallestColumn = 0;
    for (let i = 0; i < columns; i++) {
      if (displayedImages[i].length < displayedImages[smallestColumn].length) {
        smallestColumn = i;
      }
    }

		for (let i = 0; i < newImages.length; i++) {
      displayedImages[(smallestColumn + i) % columns] = [...displayedImages[(smallestColumn + i) % columns], newImages[i]];
		}
		lastMaxLoad += MAX_LOAD;
	};

	const initialCols = (columns: number): string[][] => {
		const newColumns: string[][] = new Array(columns).fill(null).map(() => []);
		const images = ALL_IMAGES.slice(0, lastMaxLoad);
		for (let i = 0; i < images.length; i++) {
			newColumns[i % columns].push(images[i]);
		}

    if (images.length <= 0) hasMoreImages = false;
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
							<img
								class={`aspect-auto rounded-sm drop-shadow-lg w-full h-auto`}
								src={`https://leonorpache.com/${image}`}
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
	{:else}
    <p class="text-center text-xl">No hay más imágenes para cargar</p>
	{/if}
	<UseImageViewer bind:selectedImage />
</div>
