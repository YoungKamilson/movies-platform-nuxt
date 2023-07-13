<template>
   <div v-if="modalStore.saveToListModal" class="absolute z-[200] w-full h-screen flex items-center justify-center bg-bg1 bg-opacity-90">
      <div class="w-[512px] bg-bg2 rounded-lg p-6">
            <div class="flex flex-row justify-between items-center">
               <div>
                  <h2 class="text-[32px] font-semibold">Save to list</h2>
                  <p class="text-lesstext">Choose your list</p>
               </div>
               <button @click="modalStore.saveToListModal = !modalStore.saveToListModal" class="bg-primary rounded-[8px] h-[44px] text-white px-6">
                  Close
               </button>
            </div>
            <div class="mt-6 flex flex-col gap-2 max-h-[400px] overflow-auto">
               <p v-if="!moviesListStore.userLists" class="text-lesstext2">No lists created already.</p>
               <List v-if="moviesListStore.userLists" v-for="(list, index) in moviesListStore.userLists" :key="index" @click="saveInList(list.id)">
                  <template #icon>
                     <img src="../assets/detective.png" class="w-[24px] h-[24px] rounded-[4px]">
                  </template>
                  <template #title>{{list.name}}</template>
               </List>
            </div>
            <hr class="my-4 border-lesstext">
            <p v-if="success" class="text-green-600">Successfully saved in list!</p>
            <p v-if="error" class="text-primary">{{ error }}</p>
            <p class="text-lesstext mb-4">You want to create new list?</p>
            <Button @click="modalStore.saveToListModal = !modalStore.saveToListModal; modalStore.createNewListModal = true" class="w-full">Create new list</Button>
         </div>
   </div>
</template>

<script setup>
const modalStore = useModalsStore()
const moviesListStore = useMoviesListStore()
const success = ref(false)
const error = ref(false)

const supabase = useSupabaseClient()
const user = useSupabaseUser()


//clear data when opened
watch(() => modalStore.saveToListModal, () => {
   success.value = null
   error.value = null
})


async function saveInList(listId){

   if(valideMovies(listId)){
      handleError('Movie is already on this list.')
   }
   else{
      const { data, error } = await supabase
      .from('MovieList')
      .update({ movies: handleMoviesPush(listId)})
      .eq('id', listId)
      .select()

      if(error){
      handleError('Error when saving in list.'); console.log(error)
      }
      else{
      handleSuccess()
      }
   }

   
}

function handleError(errorMessage) {
   error.value = errorMessage
}

function handleSuccess() {
   success.value = true
}

function handleMoviesPush(listId){
   console.log('Movie id to push', moviesListStore.currentMovieId);


   let userLists = toRaw(moviesListStore.userLists)

   console.log('User lists', userLists);
   //find list to be updated
   let searchedList = userLists.find((list) => list.id == listId)
   let indexOfSearchedList = userLists.indexOf(searchedList)

   console.log('Index of searched list', indexOfSearchedList);


   if(searchedList){
      if(searchedList.movies) 
      {
         searchedList.movies.push(moviesListStore.currentMovieId)

         console.log('Searched movies', searchedList);



         //update pinia
         moviesListStore.updateList(indexOfSearchedList, searchedList)


         // moviesListStore.userLists = userLists.map((list) => {
         //    if(list.id == searchedList.id){
         //       return searchedList
         //    }
         //    else return list
         // })

         console.log('Updated pinia list', moviesListStore.userLists);

         return searchedList.movies
      }
      else
      {
         searchedList.movies = []
         searchedList.movies.push(moviesListStore.currentMovieId)

         //update pinia
         moviesListStore.updateList(indexOfSearchedList, searchedList)

         // moviesListStore.userLists = userLists.map((list) => {
         //    if(list.id == searchedList.id){
         //       return searchedList
         //    }
         //    else return list
         // })

         console.log('Updated pinia list', moviesListStore.userLists);
         

         return searchedList.movies
      }
   }
   else{
      console.log('ERROR: List is not in Pinia state');
      handleError('Error when saving list.')
   }
}

function valideMovies(listId){
   let userLists = toRaw(moviesListStore.userLists)

   //find list to be updated
   let searchedList = userLists.find((list) => list.id == listId)
   let existInArray = searchedList.movies.includes(moviesListStore.currentMovieId)
   return existInArray
}
</script>