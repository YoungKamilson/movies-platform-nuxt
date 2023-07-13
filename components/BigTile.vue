<template>
   <NuxtLink :to="`/movie/${id}`" class="flex flex-col gap-1 w-[400px] min-w-[400px] cursor-pointer relative group">
      <img :src="image" class="rounded-lg object-cover  h-[240px] object-top z-10">
      <p class="w-full text-[18px] font-[700] text-text">{{title}}</p>
      <p class="w-full text-[14px] text-lesstext2">{{description}}</p>
      <p v-if="category" class="w-full text-[14px] text-lesstext">{{category}}</p>
      <span class="group-hover:opacity-100 opacity-0 bg-gradient absolute blur-[70px] rounded-full w-[250px] h-3/5 transition-all duration-700 ease-in-out z-0 left-2"></span>
   </NuxtLink>
</template>

<script setup>
const {image, title = 'Default title', category, description, id} = defineProps(["image", "title", "description", "category", 'id'])

</script>