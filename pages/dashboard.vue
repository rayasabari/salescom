<template>
  <div class="min-h-screen bg-slate-100">
    <Container class="pt-20">
      <Breadcrumb :data="breadcrumbs"></Breadcrumb>
    </Container>
    <Container class="flex flex-col gap-4 lg:gap-6 lg:flex-row">
      <div class="relative w-full lg:w-3/12">
        <DashboardFilter
          :filter="filter"
          :objek="objek"
          :optionsJenisProperti="options.jenis_properti"
        />
      </div>
      <div class="w-full lg:w-9/12">
        <transition name="page">
          <div class="objek-wrapper">
            <div v-if="objek.meta.total > 0">
              <CardObjek v-for="objek in objek.data" :key="objek.id" :objek="objek"></CardObjek>
              <div class="flex justify-center mb-16 md:justify-end">
                <Pagination :data="objek" />
              </div>
            </div>
            <div v-if="objek.meta.total === 0">
              <div class="alert alert-info">Data ditemukan</div>
            </div>
          </div>
        </transition>
      </div>
    </Container>
    <transition name="fade">
      <ModalBackdrop v-if="modalTambahObjek">
        <LazyFormAddObjek :optionsJenisProperti="options.jenis_properti"></LazyFormAddObjek>
      </ModalBackdrop>
    </transition>
  </div>
</template>

<script>
import { Block } from "notiflix/build/notiflix-block-aio";
export default {
  name: "Dashboard",
  data() {
    return {
      modalTambahObjek: false,
      breadcrumbs: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "List Objek",
          link: false,
        },
      ],
      filter: {
        nama_jalan: null,
        source: "",
        jenis_properti: "",
      },
      objek: {
        data: [],
        meta: {
          from: "",
          to: "",
          total: "",
        },
        links: {
          first: "",
          last: "",
        },
      },
      options: {
        jenis_properti: [],
      },
    };
  },
  mounted() {
    this.fetchData();
    this.getJenisProperti();
    this.$root.$on("closeModal", () => (this.modalTambahObjek = false));
  },
  methods: {
    async fetchData(url = "/objek?page=1") {
      Block.hourglass(".objek-wrapper", {
        svgColor: "#14b8a6",
      });
      try {
        let objek = await this.$axios.$get(url, {
          params: {
            nama_jalan: this.filter.nama_jalan,
            source: this.filter.source,
            jenis_properti: this.filter.jenis_properti,
          },
          withCredentials: true,
        });
        console.log(objek);
        this.objek = objek;
        setTimeout(() => {
          Block.remove(".objek-wrapper");
        }, 0);
      } catch (e) {
        console.log(e.response);
        Block.remove(".objek-wrapper");
      }
    },
    async getJenisProperti() {
      try {
        let jenis_properti = await this.$axios.$get(`/master/jenis_properti`);
        this.options.jenis_properti = jenis_properti.data;
      } catch (e) {
        console.log(e);
      }
    },
    close() {
      this.modalTambahObjek = false;
    },
    openModalTambah() {
      this.modalTambahObjek = true;
    },
  },
};
</script>

<style>
</style>