<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 right-0 z-50 w-full h-screen overflow-hidden bg-gray-900 bg-opacity-30 backdrop-blur"    >
      <Container class="flex flex-col items-center justify-center h-screen py-4">
        <slot></slot>
        <div class="flex justify-center w-full mt-3" v-if="closeButton">
          <div
            @click="close"
            v-shortkey="['esc']"
            @shortkey="close"
            class="px-3 py-1 font-medium text-white transition duration-300 rounded-lg cursor-pointer bg-rose-500 hover:bg-rose-600"
          >Close</div>
        </div>
      </Container>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalBackdrop",
  props: ["closeButton"],
  methods: {
    close() {
      this.$root.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>