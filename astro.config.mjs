import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import mdx from '@astrojs/mdx'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
   integrations: [tailwind(), mdx(), react()],
   markdown: {
      shikiConfig: {
         // Choose from Shiki's built-in themes (or add your own)
         // https://shiki.style/themes
         theme: 'material-theme',
         // Alternatively, provide multiple themes
         // https://shiki.style/guide/dual-themes
         //  themes: {
         //     light: 'github-light',
         //     dark: 'github-dark',
         //  },
         // Add custom languages
         // Note: Shiki has countless langs built-in, including .astro!
         // https://shiki.style/languages
         langs: [],
         // Enable word wrap to prevent horizontal scrolling
         wrap: true,
         // Add custom transformers: https://shiki.style/guide/transformers
         // Find common transformers: https://shiki.style/packages/transformers
         transformers: [],
      },
   },
})
