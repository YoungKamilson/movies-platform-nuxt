<template>
   <div v-if="modalStore.infoModal.active" class="absolute z-[200] w-full h-full flex items-center justify-center bg-bg1 bg-opacity-90">
      <div class="w-[512px] bg-bg1 rounded-lg p-6">
            
            <div class="flex flex-row justify-between items-center">
               <h2 class="text-[32px] font-semibold">Information</h2>
               
            </div>
            
            <div class="h-full w-full flex flex-col justify-between pt-8 gap-16">
               <p>{{modalStore.infoModal.message}}</p>

               <Button @click="handleExit()" class="w-full">Ok</Button>
            </div>
         
         </div>
   </div>
</template>

<script setup>
const modalStore = useModalsStore()


function handleExit(){
   modalStore.infoModal.active = false
   modalStore.infoModal.message = ''
}

</script>