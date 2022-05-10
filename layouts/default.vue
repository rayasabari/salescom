<template>
  <div class="relative min-h-screen bg-slate-100">
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
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