<template>
<div class="h-full flex items-center">
   <div v-if="!pending" class="flex flex-row gap-5">
      <img :src="runtimeConfig.public.imageApiUrl + data.poster_path" alt="" class="w-[350px] rounded-lg object-cover max-h-[600px]">
      <div class="flex flex-col gap-1 divide-lesstext">
         <p class="text-[50px] font-semibold">{{data.title}}</p>
         <p class="text-lesstext2">{{data.overview}}</p>
         <div class="mt-10 flex flex-col gap-1">
            <p><span class="text-lesstext2">Original language: </span> {{data.original_language ? data.original_language : 'Unknown'}}</p>
         <p><span class="text-lesstext2">Vote average: </span>{{data.vote_average ? data.vote_average : 'Unknown'}}</p>
         <p><span class="text-lesstext2">Vote count: </span>{{data.vote_count ? data.vote_count : 'Unknown'}}</p>
         <p v-if="data.adult !== null || undefined"><span class="text-lesstext2">For adults: </span>{{data.adult ? 'Yes' : 'No'}}</p>
         <p v-if="data.adult == null || undefined">Unknown</p>
         <p class="text-lesstext2">Genres:
            <span class="text-text">{{ data.genres.map((genre) => genre.name).join(", ") }}</span>
         </p>
         <p class="flex flex-row gap-1"><span class="text-lesstext2">Movie homepage: </span><nuxt-link :to="data.homepage" class="flex flex-row gap-2">{{data.homepage ? data.homepage : 'Unknown'}} 
            <svg v-if="data.homepage" class='scale-75 fill-text' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>
         </nuxt-link></p>
         <p><span class="text-lesstext2">Budget: </span>{{data.budget ? data.budget : 'Unknown'}} $</p>
         <p class="text-lesstext2">Production countries:
            <span class="text-text">{{ data.production_countries.map((country) => country.name).join(", ") }}</span>
         </p>
         
         <p><span class="text-lesstext2">Release date: </span>{{data.release_date ? data.release_date  : 'Unknown'}}</p>
         </div>

      </div>
      <div class="min-h-full flex flex-col items-center justify-center">
         <Button @click="modalStore.saveToListModal = true" class="min-h-[150px] min-w-[150px] px-0 py-0 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-primary transition-shadow duration-300 ease-in-out">Add to list</Button>
      </div>
   </div>
   
   <Loading v-else/>
   




   

</div>
</template>

<script setup>
const modalStore = useModalsStore()
const moviesListStore = useMoviesListStore()

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const {data, pending, error} = useFetch(`https://api.themoviedb.org/3/movie/${route.params.movieID}`,{
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
   }
})

watchEffect(() => {
   console.log('Movie data', toRaw(data.value))
   moviesListStore.currentMovieId = data.value?.id
})





//seo handling
onUpdated(() => {
   useSeoMeta({
      title: data.value.title,
      description: data.value.overview,
      ogTitle: data.value.title,
      ogDescription: data.value.overview,
      ogImage: runtimeConfig.public.imageApiUrl + data.value.poster_path,
      ogUrl: 'localhost:3000',
      twitterTitle: data.value.title,
      twitterDescription: data.value.overview,
      twitterImage: runtimeConfig.public.imageApiUrl + data.value.poster_path,
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
         href: '/favicon.png'
      }
   ]
   })
})

definePageMeta({
   middleware: ['auth']
})
</script>