<template>
  <transition name="fade">
    <div
      class="absolute z-50 flex flex-col items-center justify-center w-full h-full px-4 bg-gray-900 bg-opacity-50 md:px-6 backdrop-blur-sm"
    >
      <slot></slot>
      <div class="flex justify-end w-full mt-2">
        <div
          @click="close"
          class="px-2 py-1 font-medium text-white bg-gray-500 rounded-lg cursor-pointer bg-opacity-30"
        >Close</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalBackdrop",
  methods: {
    close() {
      this.$root.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>