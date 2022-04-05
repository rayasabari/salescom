<template>
  <div class="relative min-h-screen">
    <NavBar></NavBar>
    <main>
      <Nuxt></Nuxt>
    </main>
    <Footer></Footer>
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
      class: "font-poppins text-gray-600",
    },
  },
};
</script>

<style>
</style>