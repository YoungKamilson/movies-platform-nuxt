<template>
   <nav class="w-[320px] min-w-[320px] h-screen pt-[40px] pb-[24px] px-[28px] bg-bg1 text-text flex flex-col overflow-hidden">
      <nuxt-link to="/"><img src="../assets/logo.svg" class="mb-[28px] ml-2 w-[98px] h-4"></nuxt-link>
      <input @keydown.enter="navigateTo('/search')" v-model="searchStore.searchValue"  type="text" placeholder="Search" class="w-full h-[44px] p-[12px] rounded-[8px] bg-black border-[1px] border-secondary placeholder:text-lesstext text-text placeholder:text-[15px] placeholder:font-[400] mb-[16px]">


      <!-- nav tabs -->
      <div class="flex flex-col gap-[4px]">
         <NavTab link="/">
            <template #icon>
               <img src="../assets/home.svg" class="w-[24px] h-[24px]">
            </template>
            <template #title>Home</template>
         </NavTab>

         <NavTab link="/about">
            <template #icon>
               <img src="../assets/friends.svg" class="w-[24px] h-[24px]">
            </template>
            <template #title>About</template>
         </NavTab>
         

         <hr class="border-[#1E1E1E] my-[32px]">

         <!-- user lists -->
         <p class="uppercase text-[13px] text-lesstext tracking-wider mb-[20px]">My lists</p>

         <div class="min-h-[50px] max-h-[288px] overflow-auto flex flex-col items-center gap-1">

            <Loading class="w-fit h-fit" v-if="moviesListStore.loading"/>

            <p v-else-if="moviesListStore.userLists.length == 0" class="w-full text-lesstext2">No lists created already.</p>

            <NavTab v-else-if="moviesListStore.userLists.length > 0" v-for="(list, index) in moviesListStore.userLists" :key="index" :link="`/list/${list?.id}`">
               <template #icon>
                  <img src="../assets/john.png" class="w-[24px] h-[24px] rounded-[4px]">
               </template>
               <template #title>{{ list?.name }}</template>
            </NavTab>
         </div>


        
      </div>

      <Button class="mt-[24px]" @click="modalStore.createNewListModal = true; modalStore.saveToListModal = false;">+ Create list</Button>

      <div class="flex flex-col gap-2 mt-auto">
         <p class="text-[13px] text-lesstext font-[400]">Movies data from</p>
         <img class="w-[70%]" src="../assets/movieDB.svg" alt="Data from moviedb API">
      </div>

      <!-- profile details -->

      <div class="mt-auto flex flex-row items-center justify-between w-full px-3 py-[10px]">
         <div class="flex flex-row gap-3 items-center">
            <div class="relative">
               <img class="w-[32px] h-[32px] rounded-full" src="../assets/avatar.jpg"  alt="">
               <span class="w-[11px] h-[11px] rounded-full bg-[#84C00C] absolute z-10 bottom-[.5px] left-[22px] outline outline-[#1F1F1F]"></span>
            </div>
            <span class="flex flex-col">
            <p class="text-[15px] font-[700] text-text">{{user?.email}}</p>
            <p class="text-[13px] text-lesstext font-[400]">{{user?.id.slice(0, 20)}}...</p>
            </span>
      </div>
      </div>
      <button @click="signOut" class="py-2 px-4 bg-primary rounded-lg">Log Out</button>       
   </nav>
   
</template>

<script setup>
const modalStore = useModalsStore()
const searchStore = useSearchStore()
const moviesListStore = useMoviesListStore()

const route = useRoute()


watch(() => route, () => {
   searchStore.searchValue = ''
})

const client = useSupabaseAuthClient()

function signOut(){
   client.auth.signOut()
   navigateTo('/login')
}

const user = useSupabaseUser()


onMounted(() => {
   console.log(user.value)
   moviesListStore.getUserLists(user.value.id, client)
   
})
</script>