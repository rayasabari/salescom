<template>
  <div class="h-screen relativw">
    <NavBar />
    <main>
      <Nuxt />
    </main>
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
      class: "font-poppins text-gray-600",
    },
  },
};
</script>

<style>
</style>