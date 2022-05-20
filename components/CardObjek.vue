<template>
  <div
    class="flex flex-col w-full mb-2 overflow-hidden transition duration-300 bg-white rounded-lg shadow md:flex-row hover:-translate-y-1 group hover:shadow-lg"
  >
    <div
      class="w-full md:w-2/12 h-[200px] md:h-[120px] bg-slate-300 bg-cover flex items-center text-center"
      :style="`background-image: url('${objek.foto}')`"
    >
      <span v-if="objek.foto == null" class="text-slate-100">No image available</span>
    </div>
    <div class="flex flex-col justify-between w-full px-4 py-3">
      <div class="flex flex-col justify-between md:flex-row">
        <div class="flex flex-col gap-1">
          <div
            class="font-semibold transition-all duration-300 text-primary-500 group-hover:text-primary-400"
          >
            <NuxtLink :to="`/wp/${objek.id}`">{{ objek.jenis_properti }}</NuxtLink>
          </div>
          <div class="text-xs text-gray-500">{{ objek.alamat }}</div>
        </div>
        <div
          :class="objek.source == 'Standalone' ? 'text-indigo-400':'text-emerald-500 '"
          class="py-2 text-xs tracking-widest uppercase md:py-0"
        >{{ objek.source }}</div>
      </div>
      <div>
        <span
          class="text-xs text-gray-400"
          v-tooltip.right="objek.created_at.formatted"
        >{{objek.created_at.forhumans}}</span>
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