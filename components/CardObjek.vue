<template>
  <div
    class="flex flex-col w-full mb-2 overflow-hidden transition duration-300 bg-white rounded-lg shadow md:flex-row hover:-translate-y-1 group hover:shadow-lg"
  >
    <div class="w-full overflow-hidden md:w-2/12">
      <div
        class="w-full h-[200px] md:h-[120px] bg-slate-300 flex items-center text-center"
        :class="!imgLoaded && objek.foto.uploaded ? 'animate-pulse':''"
      >
        <img
          v-if="objek.foto.uploaded"
          @load="onImgLoaded"
          v-show="imgLoaded"
          :src="objek.foto.thumbnail"
          alt="Foto Objek"
          class="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
        />
        <span v-if="!objek.foto.uploaded" class="w-full p-4 text-sm font-medium text-slate-400">Foto belum diupload</span>
      </div>
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
  data() {
    return {
      imgLoaded: false,
    };
  },
  methods: {
    onImgLoaded() {
      this.imgLoaded = true;
    },
  },
};
</script>

<style>
</style>