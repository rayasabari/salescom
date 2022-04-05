<template>
  <div class="flex gap-4 p-4 mb-4 transition duration-300 bg-white rounded-lg shadow-sm hover:translate-x-1 w-full2 group hover:shadow-lg">
    <div class="overflow-hidden bg-green-300 rounded-lg">
      <img :src="objek.foto" />
    </div>
    <div class="w-full">
      <div>
        <div class="font-medium text-primary-500">
          <NuxtLink :to="`/objek/${objek.id}`">{{ objek.nama }}</NuxtLink>
        </div>
        <div class="text-xs text-gray-400">{{ objek.jenis_properti }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardObjek",
  props: ["objek"],
};
</script>

<style>
</style>