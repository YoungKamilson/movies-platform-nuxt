<template>
   <div  class="w-full flex flex-row gap-[16px] hover:bg-secondary text-text p-[12px] rounded-[8px] cursor-pointer transition-all duration-200">
      <slot name="icon"/>
      <p class="font-[500]">
         <slot name="title"/>
      </p>
   </div>
</template>