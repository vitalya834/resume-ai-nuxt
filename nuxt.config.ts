export default defineNuxtConfig({
  css: ['~/assets/tailwind.css'], // этот путь к CSS-файлу Tailwind
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
