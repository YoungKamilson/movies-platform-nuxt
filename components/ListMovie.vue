<template>
   <div class="flex flex-col gap-1 w-[200px] min-w-[200px] relative group">
      <nuxt-link :to="`/movie/${id}`"><img :src="image" class="rounded-lg object-cover z-10 w-[200px] cursor-pointer hover:outline outline-primary transition-all duration-100"></nuxt-link>
      <span class=" z-10 flex flex-row gap-2 mt-2 items-start">
         <div class="flex flex-col gap-1 justify-between w-full">
            <p class="w-full text-[18px] font-[700] text-text">{{title}}</p>
            <p class="w-full text-[14px] text-lesstext">{{category}}</p>
         </div>
         <Button @click="removeMovieFromList" class="min-w-[44px] flex items-center justify-center p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
               <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>         
         </Button>
      </span>
   </div>
</template>

<script setup>
   const { image, title ,category , id , listId } = defineProps(["image", "title" ,"category" ,"id", "listId"])
   const emit = defineEmits(['movieRemoved'])

   const supabase = useSupabaseClient()
   const user = useSupabaseUser()
   const moviesListStore = useMoviesListStore()



   async function removeMovieFromList(){
      
      console.log('ID to remove', id)
      console.log('pinia befpre update', toRaw(moviesListStore.userLists));

      //get user list from db
      const { data: listData, error: listError } = await supabase
         .from('MovieList')
         .select('movies')
         .eq('userId', user.value.id)
         .eq('id', listId)

         if (listError) console.log('getting list from db error', listError);
        
        //get movies of that list
         let listMovies = listData[0].movies

        //filter movies
        let updatedMovies = listMovies.filter(movieId => movieId != id)

        //update movies in db
        
        const { data: newListData, error: newListError } = await supabase
         .from('MovieList')
         .update({movies: updatedMovies})
         .eq('userId', user.value.id)
         .eq('id', listId)
         .select()

         console.log('new list in db', newListData);
         if (newListError) console.log('updating list in db error', newListError);



        //update movies in pinia

        let userLists = toRaw(moviesListStore.userLists)

        let updatedUserLists = userLists.map((list) => {
         if(list.id == listId) {
            list.movies = updatedMovies
            return list
         }
        })


        console.log("updatedUserLists", updatedUserLists);
        moviesListStore.userLists = updatedUserLists

        console.log('pinia after update', toRaw(moviesListStore.userLists));

        emit('movieRemoved')

   }
</script>