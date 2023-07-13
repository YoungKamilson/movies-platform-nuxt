import {defineStore} from 'pinia'


export const useMoviesListStore = defineStore({
   id: 'movies-list-store',
   state: () => (
      {
         userLists: [],
         loading: false,
         selectedListId: null,
         currentMovieId: null
      }
   ),
   actions: {
      async getUserLists(userId, supabaseClient){
         this.loading = true

         const { data: listData, error: listError } = await supabaseClient
         .from('MovieList')
         .select('name, id, movies')
         .eq('userId', userId)

         this.loading = false

         this.userLists = listData
         console.log('Data of user lists', listData, this.userLists)
         console.log('Error when getting user lists', listError)
      },

      updateList(listIndex, newValue){
         this.userLists[listIndex] = newValue
      }
   }
})

