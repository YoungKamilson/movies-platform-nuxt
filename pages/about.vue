<template>
   <Section>
      <template #title>
         About
      </template>
      <template #content>
         <div class="flex flex-col justify-start h-full gap-2 mt-auto">
            <p class="text-[13px] text-lesstext font-[400]">Created by</p>
            <h1>Kamil Kubiczek</h1>
         </div>


         <div class="flex flex-col justify-start h-full gap-2 mt-auto">
            <p class="text-[13px] text-lesstext font-[400]">Designed by</p>
            <h1>Misha Sosnin</h1>

            <nuxt-link to="https://www.figma.com/community/file/1112007048163058271/Movielist-App-Challenge" class="flex flex-row gap-2">
            Figma file
            <svg class='scale-75 fill-text' width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/></svg>
            </nuxt-link>

         </div>


         <div class="flex flex-col justify-start h-full gap-2 mt-auto">
            <p class="text-[13px] text-lesstext font-[400]">Movies data from</p>
            <img class="w-[70%]" src="../assets/movieDB.svg" alt="Data from moviedb API">
         </div>
      </template>
   </Section>
</template>