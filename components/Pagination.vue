<template>
  <ul class="flex gap-1 text-xs" v-if="data.meta.total > data.meta.per_page">
    <li
      v-if="data.links.prev !== null"
      class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
      @click="fetchData(data.links.first)"
    >
      <div
        class="transition-all duration-300 cursor-pointer text-primary-400 hover:text-primary-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </li>
    <template v-for="(link,index) in data.meta.links">
      <li
        :key="index"
        v-if="index != 0 && index != data.meta.links.length - 1"
        class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
        @click="link.url !== null ? fetchData(link.url) : ''"
      >
        <div
          v-html="link.label"
          class="transition-all duration-300"
          :class="link.active || link.url == null ? 'text-gray-400':'text-primary-400 hover:text-primary-500 cursor-pointer'"
        ></div>
      </li>
    </template>
    <li
      v-if="data.links.next !== null"
      class="px-3 py-1 transition-all duration-300 bg-white rounded-lg shadow hover:shadow-md"
      @click="fetchData(data.links.last)"
    >
      <div
        class="transition-all duration-300 cursor-pointer text-primary-400 hover:text-primary-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
          <path
            fill-rule="evenodd"
            d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
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