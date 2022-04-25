<template>
  <div class="w-full overflow-y-auto bg-white rounded-lg shadow-lg md:w-9/12">
    <div
      class="flex items-center justify-between px-4 py-3 font-medium border-b border-primary-200 bg-primary-50 text-primary-600"
    >
      <h2>{{title}}</h2>
      <button
        @click="close"
        class="p-1 transition duration-300 rounded-lg cursor-pointer bg-primary-500 hover:bg-primary-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-primary-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="flex flex-col gap-4 p-4 align-top md:flex-row">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCard",
  props: ["title"],
  methods: {
    close() {
      this.$root.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>