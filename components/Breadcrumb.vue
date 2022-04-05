<template>
  <nav class="px-4 py-3 mb-4 bg-white rounded-lg shadow-sm">
    <ul class="flex space-x-3 text-sm">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <template v-if="breadcrumb.link">
          <NuxtLink class="font-medium text-gray-500" :to="breadcrumb.link">{{ breadcrumb.item }}</NuxtLink>
        </template>
        <template v-else>
          <span class="text-gray-400">{{breadcrumb.item}}</span>
        </template>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["breadcrumbs"],
};
</script>

<style>
</style>