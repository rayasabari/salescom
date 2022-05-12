<template>
  <div class="relative flex justify-center w-full min-h-screen overflow-hidden bg-gray-50">
    <div class="w-full" v-if="!hasPembanding">
      <LazyWpSelectPembanding :objek="objek" />
    </div>
    <div class="w-full px-2 transition-all duration-200" v-if="hasPembanding">
      <WpTable />
    </div>
    <transition name="fade">
      <ModalBackdrop v-if="showSetting" :closeButton="true">
        <LazyWpSetting />
      </ModalBackdrop>
      <ModalBackdrop v-if="showMap" :closeButton="true">
        <LazyWpGmap :objek="objek" :pembandingAround="pembandingAround" />
      </ModalBackdrop>
      <ModalBackdrop v-if="showExportImport" :closeButton="true">
        <LazyWpExportImport />
      </ModalBackdrop>
    </transition>
    <LazyWpFloatMenu :hasPembanding="hasPembanding" :floatMenu="floatMenu" />
  </div>
</template>

<script>
export default {
  name: "WP",
  layout: "wp",
  scrollToTop: true,
  data() {
    return {
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
      radius: 2000,
      pembandingAround: [],
      selected_id: ["0"],
      hasPembanding: false,
      objek: {
        latitude: 0,
        longitude: 0,
      },
    };
  },
  mounted() {
    this.fetchData();
    this.$root.$on("closeModal", () => {
      this.showSetting = false;
      this.showMap = false;
      this.showExportImport = false;
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
        this.hasPembanding = response.data.hasPembanding;
      } catch (e) {
        console.log(e);
      }
    },
    toggleShow(component) {
      this[`show${component}`] = !this[`show${component}`];
    },
    // async getPembandingAround() {
    //   try {
    //     let response = await this.$axios.$get("/wp/pembanding/around", {
    //       params: {
    //         latitude: this.objek.latitude,
    //         longitude: this.objek.longitude,
    //         radius: this.radius,
    //         selected_id: this.selected_id,
    //       },
    //       withCredentials: true,
    //     });
    //     console.log(response);
    //     this.pembandingAround = response;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
};
</script>

<style>
</style>