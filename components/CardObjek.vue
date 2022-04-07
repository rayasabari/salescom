<template>
  <div
    class="flex gap-4 p-4 mb-4 transition duration-300 bg-white rounded-lg shadow hover:translate-x-1 w-full2 group hover:shadow-md"
  >
    <div class="overflow-hidden bg-green-300 rounded-lg">
      <img :src="objek.foto" />
    </div>
    <div class="flex flex-col justify-between w-full">
      <div class="flex justify-between">
        <div>
          <div class="font-medium text-primary-500">
            <NuxtLink :to="`/wp/${objek.id}`">{{ objek.nama }}</NuxtLink>
          </div>
          <div class="text-xs text-gray-400">{{ objek.jenis_properti }}</div>
        </div>
        <div :class="objek.sistem == 'Standalone' ? 'text-indigo-400':'text-emerald-500 '" class="text-xs tracking-widest uppercase">{{ objek.sistem }}</div>
      </div>
      <div>
        <span
          class="text-sm text-gray-500"
        >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe, distinctio!</span>
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