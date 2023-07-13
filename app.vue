<template>
  <div>
    <NuxtLayout>
    <NuxtPage/>
    <template #modal>
        <SaveToListModal/>
        <CreateListModal/>
        <InfoModal/>
    </template>
    
    </NuxtLayout>
  </div>
</template>

<script setup>
   const moviesListStore = useMoviesListStore()

   watch(() => moviesListStore.userLists, () => {
    console.log('%cPinia state updated', 'color: red;', toRaw(moviesListStore.userLists), );
   })

</script>