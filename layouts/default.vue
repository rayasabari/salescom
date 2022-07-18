<template>
  <div class="relative min-h-screen bg-slate-100">
    <NavBar />
    <transition name="fade">
      <NavMobile v-if="showNav" />
    </transition>
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Block } from "notiflix/build/notiflix-block-aio";
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
  data() {
    return {
      showNav: false,
    };
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
  mounted() {
    this.$root.$on("toggleMenu", () => {
      this.showNav = !this.showNav;
      console.log('toggle');
    });
  },
};
</script>

<style>
</style>