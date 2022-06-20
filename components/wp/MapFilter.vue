<template>
  <div
    :class="showFilter ? 'h-[570px]' : 'h-0'"
    class="absolute w-3/12 p-3 transition-all duration-300 rounded-lg shadow bottom-3 left-1"
  >
    <div class="h-full">
      <div class="flex w-full">
        <div
          @click="showFilter = !showFilter"
          class="absolute flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg cursor-pointer bg-rose-500 hover:bg-rose-600"
          :class="showFilter ? '-mt-4': '-mt-6'"
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          <span>Filter</span>
        </div>
      </div>
      <div
        :class="showFilter ? 'py-2': 'py-0'"
        class="h-full px-3 text-sm bg-white rounded-lg shadow-lg"
      >
        <form @submit.prevent="updateSetting" class="h-full pt-4">
          <div class="w-full mb-4">
            <label for class="rhr-label">Radius</label>
            <div class="relative">
              <div class="absolute inset-y-0 flex items-center justify-center text-sm right-4">m</div>
              <input type="text" class="rhr-input" v-model="wpSetting.radius" />
            </div>
          </div>
          <div class="w-full mb-4">
            <label for class="rhr-label">Jenis Properti</label>
            <div v-for="(item, index) in options.jenis_properti" :key="index">
              <label :for="'jenis_properti_'+item.id" class="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  :id="'jenis_properti_'+item.id"
                  class="rhr-input-checkbox"
                  :value="item.id"
                  v-model="wpSetting.jenis_properti_id"
                />
                <div class="flex items-center gap-1">
                  <img
                    :src="require(`@/assets/icons/marker/${item.icon}`)"
                    class="h-4"
                    :alt="item.text"
                  />
                  <span class="text-xs">{{item.text}}</span>
                </div>
              </label>
            </div>
          </div>
          <div class="w-full">
            <div class="flex justify-center gap-2">
              <button @click="showFilter = false" class="btn-primary-outline btn-sm" type="button">Minimize</button>
              <button class="btn-primary btn-sm" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MapFilter",
  props: ["setting", "options"],
  data() {
    return {
      showFilter: true,
      wpSetting: this.setting,
    };
  },
  methods: {
    async updateSetting() {
      try {
        let response = await this.$axios.$post(
          "/wp/map/setting/update",
          {
            setting: this.wpSetting,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
        this.$root.$emit("fetchWp");
        this.$awn.success("Setting updated!");
      } catch (e) {
        console.log(e.response);
      }
    },
  },
};
</script>

<style>
</style>