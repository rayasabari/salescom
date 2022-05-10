<template>
  <div class="min-h-screen bg-slate-100">
    <Container class="pt-20">
      <Breadcrumb :data="breadcrumbs"></Breadcrumb>
    </Container>
    <Container class="flex flex-col gap-4 lg:gap-6 lg:flex-row">
      <div class="w-full lg:w-3/12">
        <div class="p-4 bg-white shadow">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
            <div class="text-xs">
              <span class="font-semibold">{{ objek.meta.from }}</span> -
              <span class="font-semibold">{{ objek.meta.to }}</span> dari
              <span class="font-semibold">{{ objek.meta.total }}</span> data
            </div>
            <div>
              <button
                @click="modalTambahObjek = true"
                type="button"
                class="btn-primary btn-sm"
                v-tooltip="'Tambah Objek'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
          <div class="mb-4">
            <label for="alamat" class="rhr-label">Alamat</label>
            <input type="text" id="alamat" name="alamat" class="rhr-input" />
          </div>
          <div class="mb-4">
            <label for="source" class="rhr-label">Source</label>
            <select name="source" id="source" class="rhr-input">
              <option value>--Pilih--</option>
              <option value="Standalone">Standalone</option>
              <option value="RIS">RIS</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="jenis_objek" class="rhr-label">Jenis Objek</label>
            <select name="jenis_objek" id="jenis_objek" class="rhr-input">
              <option value>--Pilih--</option>
            </select>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-9/12">
        <transition name="page">
          <div class="objek-wrapper">
            <CardObjek v-for="objek in objek.data" :key="objek.id" :objek="objek"></CardObjek>
            <div class="flex justify-center mb-16 md:justify-end">
              <Pagination :data="objek" />
            </div>
          </div>
        </transition>
      </div>
    </Container>
    <transition name="fade">
      <ModalBackdrop v-if="modalTambahObjek">
        <LazyFormAddObjek></LazyFormAddObjek>
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
    };
  },
  mounted() {
    const url = "/objek/index?page=1";
    this.fetchData(url);
    this.$root.$on("closeModal", () => (this.modalTambahObjek = false));
  },
  methods: {
    async fetchData(url) {
      Block.hourglass(".objek-wrapper", {
        svgColor: '#14b8a6',
      });
      try {
        let objek = await this.$axios.$get(url, {
          withCredentials: true,
        });
        console.log(objek);
        console.log(objek.meta.links.length);
        this.objek = objek;
        setTimeout(() => {
          Block.remove(".objek-wrapper");
        }, 0);
      } catch (e) {
        console.log(e.response);
        Block.remove(".objek-wrapper");
      }
    },
  },
};
</script>

<style>
</style>