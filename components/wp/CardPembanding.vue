<template>
  <div class="w-full p-4 transition-all duration-300 border rounded-lg hover:shadow-md">
    <div class="flex flex-col gap-2 mb-1 lg:items-center lg:flex-row lg:justify-between">
      <span class="font-medium text-green-500">Penawaran</span>
      <div>
        <button
          @click="confirmPembanding(pembanding)"
          class="flex items-center gap-1 text-xs btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="uppercase">Pilih</span>
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-4 mb-4 text-xs text-gray-400 lg:mt-2 lg:flex">
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          />
        </svg>
        <span>Pak Bambang</span>
      </div>
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
          />
        </svg>
        <span>08123234567</span>
      </div>
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clip-rule="evenodd"
          />
        </svg>
        <span>MTH</span>
      </div>
      <div class="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>3 hours ago</span>
      </div>
    </div>
    <div class="grid grid-cols-2 grid-rows-3 gap-3 lg:gap-4 lg:grid-cols-3 lg:grid-rows-2">
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">Tanggal Data</span>
        <span class="font-medium">10 Mei 2022</span>
      </div>
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">Luas Tanah</span>
        <span class="font-medium">
          100 m
          <sup>2</sup>
        </span>
      </div>
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">Luas Bangunan</span>
        <span class="font-medium">
          100 m
          <sup>2</sup>
        </span>
      </div>
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">Indikasi Harga</span>
        <span class="font-medium">6.156.000.000</span>
      </div>
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">
          per m
          <sup>2</sup> Tanah
        </span>
        <span class="font-medium">3.800.000</span>
      </div>
      <div class="flex flex-col w-full gap-1">
        <span class="text-xs text-gray-400">
          per m
          <sup>2</sup> Bangunan
        </span>
        <span class="font-medium">3.800.000</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
export default {
  name: "CardPembanding",
  props: ["pembanding"],
  methods: {
    confirmPembanding(pbd) {
      const pilih = () => this.pilihPembanding(pbd);
      Confirm.show(
        "Konfirmasi",
        "Jadikan Pembanding?",
        "Ya",
        "Batal",
        () => pilih(),
        () => {},
        {
          width: "320px",
          borderRadius: "8px",
          titleColor: "#0d9488",
          okButtonBackground: "#14b8a6",
        }
      );
    },
    async pilihPembanding(pbd) {
      try {
        const response = await this.$axios.$post(
          "/wp/pembanding/pilih",
          {
            selected: pbd,
            objek_id: this.$route.params.id
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        this.$awn.success('Berhasil!');
        this.$root.$emit('fetchWp');
        this.$parent.$parent.closeFormCard();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>