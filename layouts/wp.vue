<template>
  <div class="relative min-h-screen">
    <!-- <NavBar /> -->
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Block } from "notiflix/build/notiflix-block-aio";
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
  created() {
    Confirm.init({
      width: "320px",
      borderRadius: "8px",
      titleColor: "#0d9488",
      okButtonBackground: "#14b8a6",
    });
    Block.init({
      svgColor: "#14b8a6",
    });
  },
};
</script>

<style>
</style>