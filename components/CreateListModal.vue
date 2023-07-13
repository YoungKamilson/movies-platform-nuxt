<template>
   <div v-if="modalStore.createNewListModal" class="absolute z-[200] w-full h-full flex items-center justify-center bg-bg1 bg-opacity-90">
      <div class="w-[512px] bg-bg1 rounded-lg p-6">
            <div class="flex flex-row justify-between items-center">
               <h2 class="text-[32px] font-semibold">Create new list</h2>
               <button @click="modalStore.createNewListModal = !modalStore.createNewListModal" class="bg-primary rounded-[8px] h-[44px] text-white px-6">
                  Close
               </button>
            </div>
            <form @submit.prevent class="mt-12 flex flex-col items-start gap-3">
            <label for="email">List name</label>
            <input v-model="listName" required type="text" placeholder="My list" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">
            <p v-if="success" class="text-green-600">Successfully created list!</p>
            <p v-if="error" class="text-primary">{{ error }}</p>
            <Button @click="handleAddList()" class="w-full">Create list</Button>
         </form>
         </div>
   </div>
</template>

<script setup>
const modalStore = useModalsStore()
const moviesListStore = useMoviesListStore()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const listName = ref()
const success = ref(false)
const error = ref(false)


//clear data when opened
watch(() => modalStore.createNewListModal, () => {
   listName.value = ''
   success.value = null
   error.value = null
})

async function handleAddList() {

   if(listName.value.length == 0) return handleError('Your list name cannot be empty!')

   // query users data
   const { data: usersData, error: usersError } = await supabase
  .from('User')
  .select()

  //if users table is empty
  if(usersData?.length == 0 || !usersData){
   console.log('Users table is empty')
   createUser(user.value.id)
   createList(user.value.id, listName.value)
  }
  else if(usersError)
  {
   console.log('Users table error', usersError)
  }
  else {
   //find current user in table
   console.log('Finding user in table', usersData)
   const userExistInTable = usersData.filter((u) =>{
      if(u.id == user.value.id) return true
   })

   if(userExistInTable){
      console.log('Users is in table')
      createList(user.value.id, listName.value)
   }
   else{
      console.log('Users is not in table, creating')
      createUser(user.value.id) 
      createList(user.value.id, listName.value)
   }
   }
}


async function createUser(userId) {
   const { error: usersError } = await supabase
  .from('User')
  .insert({
   id: userId
   })

   if(usersError) {
      handleError("Error when creating list (user hasn't been created)")
      return
   }
   else handleSuccess()

   return usersError
}

async function createList(userId, listName) {
   const { error: moviesListError } = await supabase
  .from('MovieList')
  .insert({
   userId: userId,
   name: listName
   })

   if(moviesListError) {
      handleError('Error when creating list')
      return
   }
   else handleSuccess()


   return moviesListError
}

function handleSuccess(){
   success.value = true
   listName.value = ''
   moviesListStore.getUserLists(user.value.id, supabase)
}

function handleError(errorMessage){
   error.value = errorMessage
}
</script>