/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
   content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
   theme: {
      extend: {
         colors: {
            primary: {
               50: '#EAEAF1',
               100: '#D4D6E2',
               200: '#AAACC6',
               300: '#7F83A9',
               400: '#5A5F86',
               500: '#3D405B',
               600: '#313449',
               700: '#252737',
               800: '#191A25',
               900: '#0C0D12',
               950: '#060609',
            },
            secondary: {
               50: '#FCF1EE',
               100: '#F9E6E1',
               200: '#F3CABF',
               300: '#EDB1A1',
               400: '#E6957F',
               500: '#E07A5F',
               600: '#D64F29',
               700: '#A23C1F',
               800: '#6B2715',
               900: '#38140B',
               950: '#1A0905',
            },
            tertiary: {
               50: '#F2F7F5',
               100: '#E6F0EB',
               200: '#CCE0D7',
               300: '#B3D1C2',
               400: '#9AC1AE',
               500: '#81B29A',
               600: '#5D987B',
               700: '#46725D',
               800: '#2E4C3E',
               900: '#17261F',
               950: '#0C130F',
            },
            light: {
               50: '#FEFDFB',
               100: '#FCFCF7',
               200: '#FBFAF4',
               300: '#F9F7EC',
               400: '#F6F4E4',
               500: '#F4F1DE',
               600: '#DDD398',
               700: '#C6B653',
               800: '#8E812F',
               900: '#453F17',
               950: '#221F0B',
            },
         },
         fontFamily: {
            sans: [
               'Noto Sans SC Variable',
               'Inter',
               ...defaultTheme.fontFamily.sans,
            ],
            mono: ['JetBrains Mono Variable', ...defaultTheme.fontFamily.sans],
         },
      },
   },
   plugins: [],
}
