<template>
  <div class="relative flex w-full min-h-screen overflow-hidden bg-gray-50">
    <div class="w-full px-2 transition-all duration-200">
      <!-- <div class="transition-all duration-100" :class="!showMap ? 'h-0':'h-[500px]'">
        <transition name="page">
          <LazyWpGmap v-if="showMap" :show="showMap" />
        </transition>
      </div>-->
      <WpTable />
    </div>
    <transition name="page">
      <ModalBackdrop v-if="showMap">
        <WpGmap />
      </ModalBackdrop>
    </transition>
    <transition name="page">
      <ModalBackdrop v-if="showExportImport">
        <WpHistory />
      </ModalBackdrop>
    </transition>
    <div class="absolute z-20 flex flex-col gap-4 bottom-5 right-5">
      <transition name="fade">
        <div
          v-if="floatMenu"
          class="flex flex-col w-full gap-2 p-2 transition-all duration-300 bg-gray-300 rounded-full shadow-lg backdrop-blur bg-opacity-40"
          :class="floatMenu ? 'h-auto':'h-100'"
        >
          <div class="p-2 text-white bg-red-400 rounded-full">
            <NuxtLink to="/list">
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
          <div class="p-2 text-white rounded-full cursor-pointer bg-sky-400">
            <div @click="showMap = !showMap">
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
            </div>
          </div>
          <div class="p-2 text-white bg-indigo-400 rounded-full cursor-pointer">
            <div @click="showExportImport = !showExportImport">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
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
            </div>
          </div>
        </div>
      </transition>
      <div class="p-2">
        <div
          @click="floatMenu = !floatMenu"
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
  </div>
</template>

<script>
export default {
  layout: "wp",
  scrollToTop: true,
  data() {
    return {
      showMap: false,
      showExportImport: false,
      floatMenu: false,
      breadcrumbs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "List Objek",
          link: "/list",
        },
        {
          name: "Nama Objek",
          link: false,
        },
      ],
    };
  },
  mounted() {
    this.$root.$on("closeModal", () => {
      this.showMap = false;
      this.showExportImport = false;
    });
  },
};
</script>

<style>
</style>