<template lang="">
   <section class="w-full flex flex-col">
      <h3 class="uppercase text-[13px] text-lesstext tracking-wider mb-[20px]">
         <slot name='title'/>
      </h3>
   
      <div class="w-full flex flex-row gap-7 overflow-x-auto pb-4">
         <slot name='content'/>
      </div>
     </section>
</template>
