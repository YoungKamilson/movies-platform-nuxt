<template>


      <div v-if="topRatedPending" class="h-[480px]"><Loading/></div>
      
      <Section v-else-if="topRated">
         <template #title>
            Top rated
         </template>
         <template #content>
            <SmallTile v-for="(movie, index) in topRated.results" :key="index"
            :image="runtimeConfig.public.imageApiUrl + movie.poster_path"
            :title="movie.title"
            :id="movie.id"
            />
         </template>
      </Section>


      
      
      <div v-if="nowPlayingPending" class="h-[480px]"><Loading/></div>
      
      <Section v-else-if="nowPlaying">
         <template #title>
            Now playing
         </template>
         <template #content>
            <SmallTile v-for="(movie, index) in nowPlaying.results" :key="index"
            :image="runtimeConfig.public.imageApiUrl + movie.poster_path"
            :title="movie.title"
            :id="movie.id"
            />
         </template>
      </Section>



      <div v-if="popularPending" class="h-[480px]"><Loading/></div>
      
      <Section v-else-if="popular">
         <template #title>
            Recommended
         </template>
         <template #content>
            <BigTile v-for="(movie, index) in popular.results" :key="index"
            :image="runtimeConfig.public.imageApiUrl + movie.poster_path"
            :title="movie.title"
            :description="(movie.overview.length > 220) ? movie.overview.slice(0, 220) + '...' : movie.overview"
            :id="movie.id"
            />
         </template>
      </Section>

      
      
      
      
      
      
      
</template>
   
<script setup>


const runtimeConfig = useRuntimeConfig()


const {pending: nowPlayingPending, data: nowPlaying, error: nowPlayingError} = useFetch('https://api.themoviedb.org/3/movie/now_playing',{
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
   }
})

const {pending: popularPending, data:  popular, error: popularError} = useFetch('https://api.themoviedb.org/3/movie/popular',{
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
   }
})

const {pending: topRatedPending, data: topRated, error: topRatedError} = useFetch('https://api.themoviedb.org/3/movie/top_rated',{
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
   }
})

// watchEffect(() => {
//    console.log('Now playing', toRaw(nowPlaying.value))
//    console.log('Popular', toRaw(popular.value))
//    console.log('Top rated / recommended', toRaw(topRated.value))
// })


useSeoMeta({
  title: 'Movielist',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, vero illum. Ducimus consequatur sint nisi neque debitis velit similique, quia illum numquam facere, placeat ipsam perspiciatis officia adipisci, dolor sequi?',
  ogTitle: 'Movielist',
  ogDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, vero illum. Ducimus consequatur sint nisi neque debitis velit similique, quia illum numquam facere, placeat ipsam perspiciatis officia adipisci, dolor sequi?',
  ogImage: 'https://image.tmdb.org/t/p/w500/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg',
  ogUrl: 'url',
  twitterTitle: 'Movielist',
  twitterDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, vero illum. Ducimus consequatur sint nisi neque debitis velit similique, quia illum numquam facere, placeat ipsam perspiciatis officia adipisci, dolor sequi?',
  twitterImage: 'https://image.tmdb.org/t/p/w500/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico'
    }
  ]
})

definePageMeta({
   middleware: ['auth']
})




</script>