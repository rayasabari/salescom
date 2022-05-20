<template>
  <div class="w-[250px] text-center" v-if="pembanding">
    <h2 class="pb-1 text-lg font-medium text-gray-600">{{ pembanding.jenis_properti.jenis_objek }}</h2>
    <div class="text-xs">{{ pembanding.alamat }}</div>
    <div class="flex py-3">
      <div class="flex flex-col w-1/2 gap-1 text-center">
        <span class="text-xs font-medium">Luas Tanah</span>
        <span class="text-base font-bold">
          {{ numSeparator(100,1) }} m
          <sup>2</sup>
        </span>
      </div>
      <div class="flex flex-col w-1/2 gap-1 text-center">
        <span class="text-xs font-medium">Luas Bangunan</span>
        <span class="text-base font-bold">
          {{ numSeparator(100,1) }} m
          <sup>2</sup>
        </span>
      </div>
    </div>
    <div class="flex items-center justify-center mb-2">
      <button
        type="button"
        @click="$parent.$parent.$parent.getPembandingChilds(pembanding.id)"
        class="flex items-center justify-center gap-2 btn-primary btn-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
        <span>Details</span>
      </button>
    </div>
  </div>
</template>

<script>
import numFormat from "@/services/numFormat";
export default {
  name: "InfoWindowgAround",
  props: ["pembanding"],
  methods: {
    numSeparator(num, dec) {
      return numFormat.separator(num, dec);
    },
  },
};
</script>

<style>
</style>