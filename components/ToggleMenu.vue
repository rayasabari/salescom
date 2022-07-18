<template>
  <div class="flex md:hidden">
    <button @click="$root.$emit('toggleMenu')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    
  </div>
</template>

<script>
export default {
  name: "NavBarMobile",
};
</script>

<style>
</style>