<template>
  <ul class="flex gap-1 text-xs">
    <li
      v-if="data.links.prev !== null"
      class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
      @click="fetchData(data.links.first)"
    >
      <div
        class="transition-all duration-300 cursor-pointer text-primary-400 hover:text-primary-500"
      >First</div>
    </li>
    <li
      v-for="(link,index) in data.meta.links"
      :key="index"
      class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
      @click="link.url !== null ? fetchData(link.url) : ''"
    >
      <div
        v-html="link.label"
        class="transition-all duration-300"
        :class="link.active || link.url == null ? 'text-gray-400':'text-primary-400 hover:text-primary-500 cursor-pointer'"
      ></div>
    </li>
    <li
      v-if="data.links.next !== null"
      class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
      @click="fetchData(data.links.last)"
    >
      <div
        class="transition-all duration-300 cursor-pointer text-primary-400 hover:text-primary-500"
      >Last</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: ["data"],
  methods: {
    fetchData(url) {
      this.$parent.$parent.fetchData(url);
    },
  },
};
</script>

<style>
</style>