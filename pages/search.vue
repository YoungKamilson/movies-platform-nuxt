<template>
   <Section v-if="!fetchState.pending">
      <template #title>
         Search
      </template>
      <template #content>
         <BigTile v-for="(movie, index) in fetchState.moviesData.results" :key="index"
         :image="runtimeConfig.public.imageApiUrl + movie.poster_path"
         :title="movie.title"
         :description="(movie.overview.length > 220) ? movie.overview.slice(0, 220) + '...' : movie.overview"
         :id="movie.id"
         />
      </template>
   </Section>


   <Loading v-else/>

   
   <p v-if="fetchState.moviesData?.results?.length == 0">No search results. Try to find something else.</p>



   <nuxt-link to="/"><Button>Go home</Button></nuxt-link>
</template>


<script setup>

const runtimeConfig = useRuntimeConfig()

//pinia search store
const searchStore = useSearchStore()

let timeout = null

const fetchState  = reactive({
   moviesData: null,
   pending: true,
   error: null,
}) 

watch(fetchState, () => {
   console.log(fetchState);
})

onMounted(async () => {
   handleSearch()
})

watch(() => searchStore.searchValue, () => {
   if(searchStore.searchValue.length == 0) navigateTo('/')
   clearTimeout(timeout)
   timeout = setTimeout(() => {
      handleSearch()
   }, 300)
})

async function handleSearch () {
   const fetchData = () => {
      return new Promise((resolve, reject) => {
      setTimeout(() => {
         const { pending, data, error } = useFetch('https://api.themoviedb.org/3/search/movie',
         {
         params: {
            query: searchStore.searchValue,
            include_adult: false,
         },
         headers: {
            accept: 'application/json',
            Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
         }})
         resolve({ pending, data, error })
   }
   , 500)
   })
   }

   const result = await fetchData()
   fetchState.pending = result.pending
   fetchState.moviesData = result.data
   fetchState.error = result.error
}

definePageMeta({
   middleware: ['auth']
})
</script>