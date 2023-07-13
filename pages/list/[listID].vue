<template>

      <div v-if="loading" class="h-[480px]"><Loading/></div>
      <ListSection v-else :listID="route.params.listID">
         <template #title>Your {{ listName }} list</template>
         <template #content>
            
            <ListMovie v-if="movies?.length > 0" v-for="(movie, index) in movies" :key="index"
            :image="runtimeConfig.public.imageApiUrl + movie.poster_path"
            :title="movie.title"
            :id="movie.id"
            :listId="route.params.listID"
            @movieRemoved="getMovies()"
            />
            <div v-else>
               <p class="text-lesstext2">No movies in this list.</p>
            </div>
         </template>
      </ListSection>
</template>

<script setup>
const route = useRoute()
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()
const loading = ref(false)
const movies = ref(null)
const listName = ref(null)

const moviesListStore = useMoviesListStore()

onMounted(() => {
   console.log('User list state on page load', moviesListStore.userLists);
})


watchEffect(() => {
   console.log('Movies data ==>', movies.value);
})




onMounted(async () => {
   getMovies()
})

async function getMovies(){
   loading.value = true
   let moviesIds = await fetchMoviesIds(route.params.listID, user.value.id, supabase)

   console.log('Movies IDs ==>', moviesIds);

   let moviesData = await Promise.all(moviesIds.map((id) => {
      console.log('Getting', id);
      return fetchMovie(id)
   }))

   movies.value = moviesData.map((movie) => toRaw(movie))
   loading.value = false
}


async function fetchMoviesIds(listId, userId, supabase){

         const { data: listData, error: listError } = await supabase
         .from('MovieList')
         .select('name, movies')
         .eq('userId', userId)
         .eq('id', listId)
         
         console.log('Data of list -->', listData)

         if(listError) console.log('!!!Error when getting user lists!!!', listError)
         
         listName.value = listData[0].name

         return listData[0].movies
}


async function fetchMovie(movieId){
   const {data, pending, error} = await useFetch(`https://api.themoviedb.org/3/movie/${movieId}`,{
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${runtimeConfig.public.moviesApiToken}`
   }
   })
   if (error) console.log(error);
   return data.value
}

definePageMeta({
   middleware: ['auth']
})
</script>
