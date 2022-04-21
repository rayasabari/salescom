<template>
  <nav class="px-4 py-3 mb-5 bg-white rounded-lg shadow">
    <div class="flex justify-between">
      <ul class="flex items-center text-sm">
        <li v-for="(item, index) in data" :key="index">
          <template v-if="item.link">
            <div class="flex">
              <NuxtLink
                class="font-medium transition duration-200 hover:text-primary-600 text-primary-500"
                :to="item.link"
              >{{ item.name }}</NuxtLink>
              <div class="flex items-center px-2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </template>
          <template v-else>
            <span class="text-gray-400">{{item.name}}</span>
          </template>
        </li>
      </ul>
      <div>
        <slot></slot>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["data"],
};
</script>

<style>
</style>