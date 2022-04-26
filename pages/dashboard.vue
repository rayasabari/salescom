<template>
  <div class="h-screen bg-slate-100">
    <Container class="pt-20">
      <Breadcrumb :data="breadcrumbs"></Breadcrumb>
    </Container>
    <Container class="flex flex-col gap-4 lg:gap-6 lg:flex-row">
      <div class="w-full lg:w-3/12">
        <div class="p-4 bg-white shadow">
          <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
            <div>Data: 120</div>
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
        <CardObjek v-for="objek in listobjek" :key="objek.id" :objek="objek"></CardObjek>
      </div>
    </Container>
    <transition name="fade">
      <ModalBackdrop v-if="modalTambahObjek">
        <FormAddObjek></FormAddObjek>
      </ModalBackdrop>
    </transition>
  </div>
</template>

<script>
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
      listobjek: [
        {
          id: "1",
          nama: "Rumah Tinggal di Ragunan",
          jenis_properti: "Rumah Tinggal",
          foto: "https://system.rhr.co.id/storage/files/attachment/pembanding/properti/61445/original/1649751752-WhatsApp%20Image%202022-04-08%20at%2010.29.26%20AM%20(20).jpeg",
          sistem: "Integrated",
        },
        {
          id: "2",
          nama: "Tanah Kosong di Jagakarsa",
          jenis_properti: "Tanah Kosong",
          foto: "https://system.rhr.co.id/storage/files/attachment/pembanding/properti/61445/original/1649751752-WhatsApp%20Image%202022-04-08%20at%2010.29.26%20AM%20(20).jpeg",
          sistem: "Standalone",
        },
        {
          id: "3",
          nama: "Ruko di Mampang Prapatan",
          jenis_properti: "Ruko",
          foto: "https://system.rhr.co.id/storage/files/attachment/pembanding/properti/61445/original/1649751752-WhatsApp%20Image%202022-04-08%20at%2010.29.26%20AM%20(20).jpeg",
          sistem: "Integrated",
        },
      ],
    };
  },
  mounted() {
    this.$root.$on("closeModal", () => (this.modalTambahObjek = false));
  },
  methods: {},
};
</script>

<style>
</style>