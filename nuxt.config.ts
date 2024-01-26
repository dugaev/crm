export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
});
