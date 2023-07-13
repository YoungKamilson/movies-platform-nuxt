<template>
   <NuxtLink :to="`/movie/${id}`" class="flex flex-col gap-1 w-[250px] min-w-[250px] cursor-pointer relative group">
      <img :src="image" class=" rounded-lg object-cover z-10">
      <p class="w-full text-[18px] font-[700] text-text">{{title}}</p>
      <p v-if="category" class="w-full text-[14px] text-lesstext">{{category}}</p>
      <span class="group-hover:opacity-100 opacity-0 bg-gradient absolute top-12 left-10 blur-[60px] rounded-full w-[250px] h-3/5 transition-all duration-700 ease-in-out"></span>
   </NuxtLink>
</template>

<script setup>
const {image, title = 'Default title', category, id} = defineProps(["image", "title", "category", "id"])
</script>
