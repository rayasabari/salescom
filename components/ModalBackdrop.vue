<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen p-4 overflow-hidden bg-gray-900 bg-opacity-40 md:px-6 backdrop-blur-md"
    >
      <slot></slot>
      <div class="flex justify-center w-full mt-3" v-if="closeButton">
        <div
          @click="close"
          class="px-3 py-1 font-medium text-white transition duration-300 bg-gray-500 rounded-lg cursor-pointer text-opacity-80 hover:text-opacity-100 bg-opacity-30 hover:bg-opacity-50"
        >Close</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalBackdrop",
  props: ['closeButton'],
  methods: {
    close() {
      this.$root.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>