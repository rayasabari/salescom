<template>
  <div class="max-w-[220px] text-center">
    <h2 class="mb-2 text-lg font-semibold text-sky-500">Pembanding {{no}}</h2>
    <div class="mb-1 font-medium text-md">{{pembanding.jenis_properti}}</div>
    <div class="text-xs">{{pembanding.alamat}}</div>
    <div class="flex py-3">
      <div class="flex flex-col w-1/2 gap-1 text-center">
        <span class="text-xs font-medium">Luas Tanah</span>
        <span class="text-base font-bold">
          {{ numSeparator(pembanding.luas_tanah,1) }}
          <Mpersegi />
        </span>
      </div>
      <div class="flex flex-col w-1/2 gap-1 text-center">
        <span class="text-xs font-medium">Luas Bangunan</span>
        <span class="text-base font-bold">
          {{ numSeparator(pembanding.luas_bangunan,1) }}
          <Mpersegi />
        </span>
      </div>
    </div>
    <div class="flex items-center justify-center mb-2">
      <button
        type="button"
        @click="removePembanding(pembanding.id, no)"
        class="flex items-center justify-center gap-2 btn-danger btn-sm"
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>Remove</span>
      </button>
    </div>
  </div>
</template>

<script>
import { numFormat } from "@/services/numFormat";
export default {
  name: "InfoWindowSelected",
  props: ["pembanding", "no"],
  methods: {
    removePembanding(id, index) {
      this.$root.$emit("removePembanding", id, index);
    },
    numSeparator(num, dec) {
      return numFormat(num, dec);
    },
  },
};
</script>

<style>
</style>