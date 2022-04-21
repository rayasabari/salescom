<template>
  <div class="relative min-h-screen">
    <!-- <NavBar /> -->
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: "wpLayout",
  head: {
    htmlAttrs: {
      class: "scroll-smooth",
    },
    bodyAttrs: {
      class: "font-poppins text-gray-500",
    },
  },
};
</script>

<style>
</style>