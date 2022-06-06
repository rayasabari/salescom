<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute right-0 w-4 h-4 transition duration-300 cursor-pointer focus:outline-none text-sky-400 hover:text-sky-500"
    v-tooltip="'Edit'"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
    />
  </svg>
</template>

<script>
export default {
  name: "EditIcon",
};
</script>

<style>
</style>