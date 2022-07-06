<template>
  <div class="relative flex justify-center w-full min-h-screen overflow-hidden wppage bg-gray-50">
    <template v-if="!loadingPage">
      <div class="w-full" v-if="!hasPembanding">
        <LazyWpSelectPembanding :objek="objek" />
      </div>
      <div class="w-full px-2 transition-all duration-200" v-if="hasPembanding">
        <section class="pt-2 shadow-sm">
          <div class="w-full h-[99vh] overflow-auto bg-white">
            <div class="min-w-full bg-white" id="wptable">
              <WpTable
                :objek="objek"
                :elemenPerbandingan="elemenPerbandingan"
                :pembandingSelected="pembandingSelected"
              />
            </div>
          </div>
        </section>
      </div>
      <transition-group name="fade">
        <ModalBackdrop key="wpSetting" v-if="showSetting" :closeButton="true">
          <LazyWpSetting />
        </ModalBackdrop>
        <ModalBackdrop key="wpMap" v-show="showMap" :closeButton="true">
          <WpGmap
            :objek="objek"
            :setting="setting"
            :options="options"
            :center="center"
            :loadMap="loadMap"
            :pembandingAround="pembandingAround"
            :pembandingSelected="pembandingSelected"
          />
        </ModalBackdrop>
        <ModalBackdrop key="wpExpoertImport" v-if="showExportImport" :closeButton="true">
          <LazyWpExportImport :objek="objek" :pembandingSelected="pembandingSelected" />
        </ModalBackdrop>
        <ModalBackdrop key="wpEditObjek" v-show="showEditObjek" :closeButton="false">
          <WpEditObjek :markerObjek="center" :pembandingSelected="pembandingSelected" />
        </ModalBackdrop>
      </transition-group>
      <LazyWpFloatMenu :hasPembanding="hasPembanding" :floatMenu="floatMenu" />
    </template>
  </div>
</template>

<script>
import { Block } from "notiflix/build/notiflix-block-aio";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
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
      showEditObjek: false,
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
      elemenPerbandingan: [],
      pembandingAround: [],
      pembandingSelected: [],
      selected_id: ["0"],
      hasPembanding: false,
      objek: {
        latitude: 0,
        longitude: 0,
      },
      setting: {},
      options: [],
      center: {
        lat: 0,
        lng: 0,
      },
    };
  },
  mounted() {
    Block.hourglass(".wppage", "Mengambil data...");
    this.fetchData();
    this.$root.$on("closeModal", () => {
      this.showSetting = false;
      this.showMap = false;
      this.showExportImport = false;
      this.showEditObjek = false;
    });
    this.$root.$on("fetchWp", () => {
      this.fetchData();
    });
    this.$root.$on("setLoadMap", () => {
      this.loadMap = true;
    });
    this.$root.$on("removePembanding", (id, index) => {
      this.confirmRemovePembanding(id, index);
    });
    this.$root.$on("updateSetting", (data) => {
      this.setting = data;
    });
  },
  methods: {
    async fetchData() {
      try {
        let response = await this.$axios.$get(`/wp/${this.$route.params.id}`, {
          withCredentials: true,
        });
        console.log(response);
        this.elemenPerbandingan = response.data.elemenPerbandingan;
        this.objek = response.data.objek;
        this.pembandingAround = response.data.pembandingAround;
        this.pembandingSelected = response.data.pembandingSelected;
        this.hasPembanding = response.data.hasPembanding;
        this.setting = response.data.setting;
        this.options = response.data.options;
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
    toggleFloatMenu() {
      this.floatMenu = !this.floatMenu;
    },
    confirmRemovePembanding(id, index) {
      const remove = () => this.removePembanding(id, index);
      Confirm.show(
        "Konfirmasi",
        `Remove Pembanding ${index}?`,
        "Ya",
        "Batal",
        () => {
          remove();
        },
        () => {}
      );
    },
    async removePembanding(id) {
      try {
        let response = await this.$axios.$post(
          `/wp/pembanding/remove`,
          {
            id: id,
          },
          {
            withCredentials: true,
          }
        );
        this.$awn.success(response.message);
        this.$root.$emit("closeInfoWindow");
        this.fetchData();
      } catch (e) {
        this.$awn.alert(e.response.data.message);
        console.log(e.response);
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