<template>
   <section class="w-full flex flex-col">
      <div class="flex flex-row w-full justify-between items-center mb-[20px]">
         <h3 class="uppercase text-[13px] text-lesstext tracking-wider">
            <slot name='title'/>
         </h3>
         <Button @click="removeList">Remove list</Button>
      </div>
      


   
      <div class="w-full gap-8 flex flex-row flex-wrap">
         <slot name="content"/>
      </div>
     </section>
</template>

<script setup>
const {listID} = defineProps(["listID"])
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const modalStore = useModalsStore()
const moviesListStore = useMoviesListStore()


async function removeList(){
   const { error } = await supabase
         .from('MovieList')
         .delete()
         .eq('userId', user.value.id)
         .eq('id', listID)
   
   if(error) handleError('Error when removing list.')
   else handleSuccess('List has been removed.')
}

function handleError(errorMessage){
   modalStore.infoModal.active = true
   modalStore.infoModal.message = errorMessage
}

function handleSuccess(message){
   modalStore.infoModal.active = true
   modalStore.infoModal.message = message
   moviesListStore.getUserLists(user.value.id, supabase)
   navigateTo('/')
}
</script>