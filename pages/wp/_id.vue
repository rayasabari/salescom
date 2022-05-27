<template>
  <div class="relative flex justify-center w-full min-h-screen overflow-hidden wppage bg-gray-50">
    <template v-if="!loadingPage">
      <div class="w-full" v-if="!hasPembanding">
        <LazyWpSelectPembanding :objek="objek" />
      </div>
      <div class="w-full px-2 transition-all duration-200" v-if="hasPembanding">
        <WpTable :objek="objek" :pembandingSelected="pembandingSelected" />
      </div>
      <transition name="fade">
        <ModalBackdrop v-if="showSetting" :closeButton="true">
          <LazyWpSetting />
        </ModalBackdrop>
        <ModalBackdrop v-show="showMap" :closeButton="true">
          <WpGmap
            :objek="objek"
            :center="center"
            :loadMap="loadMap"
            :pembandingAround="pembandingAround"
            :pembandingSelected="pembandingSelected"
          />
        </ModalBackdrop>
        <ModalBackdrop v-if="showExportImport" :closeButton="true">
          <LazyWpExportImport />
        </ModalBackdrop>
      </transition>
      <LazyWpFloatMenu :hasPembanding="hasPembanding" :floatMenu="floatMenu" />
    </template>
  </div>
</template>

<script>
import { Block } from "notiflix/build/notiflix-block-aio";
export default {
  name: "WP",
  layout: "wp",
  scrollToTop: true,
  data() {
    return {
      loadingPage: true,
      loadMap: false,
      showMap: false,
      showExportImport: false,
      showSetting: false,
      floatMenu: true,
      breadcrumbs: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "WP",
          link: false,
        },
      ],
      radius: 1500,
      pembandingAround: [],
      pembandingSelected: [],
      selected_id: ["0"],
      hasPembanding: false,
      objek: {
        latitude: 0,
        longitude: 0,
      },
      center: {
        lat: 0,
        lng: 0,
      },
    };
  },
  mounted() {
    Block.hourglass(".wppage", "Mengambil data...", {
      svgColor: "#14b8a6",
    });
    this.fetchData();
    this.$root.$on("closeModal", () => {
      this.showSetting = false;
      this.showMap = false;
      this.showExportImport = false;
    });
    this.$root.$on("fetchWp", () => {
      this.fetchData();
    });
    this.$root.$on("setLoadMap", () => {
      this.loadMap = true;
    });
  },
  methods: {
    async fetchData() {
      try {
        let response = await this.$axios.$get(`/wp/${this.$route.params.id}`, {
          withCredentials: true,
        });
        console.log(response);
        this.objek = response.data.objek;
        this.pembandingAround = response.data.pembandingAround;
        this.pembandingSelected = response.data.pembandingSelected;
        this.hasPembanding = response.data.hasPembanding;
        this.center = {
          lat: parseFloat(this.objek.latitude),
          lng: parseFloat(this.objek.longitude),
        };
        this.loadingPage = false;
        Block.remove(".wppage");
      } catch (e) {
        console.log(e);
      }
    },
    toggleShow(component) {
      this[`show${component}`] = !this[`show${component}`];
    },
  },
};
</script>

<style>
</style>