<template>
  <div
    :class="showOptions ? 'h-56' : 'h-0'"
    class="absolute w-3/12 p-3 transition-all duration-100 rounded-lg shadow bottom-3 left-1"
  >
    <div class="h-full">
      <div class="flex w-full">
        <div
          @click="showOptions = !showOptions"
          class="absolute flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg cursor-pointer bg-rose-500 hover:bg-rose-600"
          :class="showOptions ? '-mt-4': '-mt-6'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>Options</span>
        </div>
      </div>
      <div
        :class="showOptions ? 'py-2': 'py-0'"
        class="h-full px-3 text-sm bg-white rounded-lg shadow-lg"
      >
        <form @submit.prevent="submitSetting" class="h-full pt-4">
          <div class="w-full mb-4">
            <label for class="rhr-label">Radius</label>
            <div class="relative">
              <div class="absolute inset-y-0 flex items-center justify-center text-sm right-4">m</div>
              <input type="text" class="rhr-input" @keyup.enter="submitSetting" />
            </div>
          </div>
          <div class="w-full mb-4">
            <label for class="rhr-label">Jenis Properti</label>
            <div>
              <label for="jenis_properti" class="inline-flex items-center gap-2">
                <input type="checkbox" id="jenis_properti" class="rhr-input-checkbox" />
                <span class="text-xs">Tanah Kosong</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapOptions",
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    async submitSetting() {
      try {
        let response = await this.$axios.$post(
          "/wp/map/options/submit",
          {
            id: this.$route.params.id,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>

<style>
</style>