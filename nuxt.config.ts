// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      moviesApiToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmFiZDViNmMxNTg1MmUzNTdkMGIyOWJhMzc4ZWM3OSIsInN1YiI6IjY0YTQwZGJkMTEzODZjMDBmZmZhNGJmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E0lSBMl68k1_fQ0AB7NVyvfFX3sGIMOLE_tBEqJqCTA',
      imageApiUrl: 'https://image.tmdb.org/t/p/w500'
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    [
      '@pinia/nuxt',
    {
      autoImports: ['defineStore', 'acceptHMRUpdate']
    }
    ]
  ],
  imports: {
    dirs: ['stores']
  }
})