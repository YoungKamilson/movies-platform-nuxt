<template>
   <div class="w-full min-h-screen h-screen flex flex-row">
      <Navigation/>
      <main class="bg-bg2 w-full text-text flex flex-col items-center gap-28 px-32 py-11 overflow-x-auto overflow-y-auto relative">
         <slot />
      </main>

      <main class="empty:hidden w-full h-screen flex flex-col items-center justify-center gap-28 px-32 py-11 overflow-hidden absolute text-text">
         <slot name="modal"/>
      </main>
   </div>
</template>
