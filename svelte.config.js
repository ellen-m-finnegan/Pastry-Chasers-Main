import { vitePreprocess } from "@astrojs/svelte";

export default {
  preprocess: vitePreprocess(),
  outDir: "dist", // Explicitly set the output directory
};
