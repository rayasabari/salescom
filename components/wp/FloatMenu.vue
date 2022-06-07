<template>
  <div class="absolute z-20 flex flex-col gap-4 bottom-5 right-5">
    <transition name="fade">
      <div
        v-show="floatMenu"
        class="flex flex-col w-full gap-2 p-2 transition-all duration-300 bg-gray-300 rounded-full shadow-lg backdrop-blur bg-opacity-40"
        :class="floatMenu ? 'h-auto':'h-100'"
      >
        <div v-tooltip.left="'Dashboard'" class="p-2 text-white transition duration-300 rounded-full bg-rose-400 hover:bg-rose-500">
          <NuxtLink to="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </NuxtLink>
        </div>
        <button
          v-shortkey="['s']"
          @shortkey="toggleSetting"
          @click="toggleSetting"
          v-tooltip.left="'Setting (S)'"
          type="button"
          class="p-2 text-white transition duration-300 bg-orange-400 rounded-full cursor-pointer focus:outline-none hover:bg-orange-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          v-shortkey="['m']"
          @shortkey="toggleMap"
          @click="toggleMap"
          v-tooltip.left="'Maps (M)'"
          type="button"
          class="p-2 text-white transition duration-300 rounded-full cursor-pointer bg-sky-400 focus:outline-none hover:bg-sky-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          v-shortkey="['e']"
          @shortkey="toggleExportImport"
          @click="toggleExportImport"
          v-tooltip.left="'Export/Import (E)'"
          v-if="hasPembanding"
          type="button"
          class="p-2 text-white transition duration-300 bg-indigo-400 rounded-full cursor-pointer hover:bg-indigo-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
        </button>
      </div>
    </transition>
    <div class="p-2">
      <div
        @click="$parent.toggleFloatMenu()"
        class="flex items-center justify-center p-2 text-white rounded-full shadow-lg cursor-pointer bg-primary-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            v-if="floatMenu"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "floatMenu",
  props: ["hasPembanding", "floatMenu"],
  methods: {
    toggleSetting() {
      this.$parent.toggleShow("Setting");
    },
    toggleMap() {
      this.$parent.toggleShow("Map");
    },
    toggleExportImport() {
      this.$parent.toggleShow("ExportImport");
    },
  },
};
</script>

<style>
</style>