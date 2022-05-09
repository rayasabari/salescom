<template>
  <div
    class="flex flex-col w-full mb-5 overflow-hidden transition duration-300 bg-white rounded-lg shadow md:flex-row hover:-translate-y-1 group hover:shadow-lg"
  >
    <div
      class="w-full md:w-2/12 h-[200px] md:h-[120px] bg-gray-100 bg-cover"
      :style="`background-image: url('${objek.foto}')`"
    ></div>
    <div class="flex flex-col justify-between w-full px-4 py-3">
      <div class="flex flex-col justify-between md:flex-row">
        <div>
          <div class="font-medium text-primary-500">
            <NuxtLink :to="`/wp/${objek.id}`">{{ objek.nama }}</NuxtLink>
          </div>
          <div class="text-xs text-gray-400">{{ objek.jenis_properti }}</div>
        </div>
        <div
          :class="objek.source == 'Standalone' ? 'text-indigo-400':'text-emerald-500 '"
          class="py-2 text-xs tracking-widest uppercase md:py-0"
        >{{ objek.source }}</div>
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