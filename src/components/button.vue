<template>
    <div class="flex bg-[#0f131b] rounded-[10px] p-1 cursor-pointer">
     <p class="p-3 font-bold text-[#00ff6f]">{{ nameButton }}</p>
     <button title="Add New" class="group cursor-pointer outline-none hover:rotate-90 duration-300">
     <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px"viewBox="0 0 24 24" class="stroke-[#00ff6f] fill-none group-hover:fill-[#00ff6e9c] group-active:stroke-[#d8ffe9] group-active:fill-[#00ff6e8f] group-active:duration-0 duration-300"
  >
    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke-width="1.5"></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg>
</button> 
    </div>
</template>

<script setup>
defineProps({
  nameButton: String,
})


</script>