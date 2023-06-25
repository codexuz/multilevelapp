/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	'./node_modules/flowbite/**/*.js',     
],

 daisyui: {
      themes: [
        {
          mytheme: {
          
 "primary": "#570df8",
          
 "secondary": "#f000b8",
          
 "accent": "#1dcdbc",
          
 "neutral": "#2b3440",
          
 "base-100": "#ffffff",
          
 "info": "#3abff8",
          
 "success": "#36d399",
          
 "warning": "#fbbd23",
          
 "error": "#f87272",
          },
        },
      ],
    },

darkMode: 'class', 
	theme: {
		extend: {},
	},
	plugins: [
	    require('@tailwindcss/typography'),
		require("daisyui"),
		require('flowbite/plugin')
	],
}
