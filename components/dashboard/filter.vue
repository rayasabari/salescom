<template>
  <div class="sticky p-4 bg-white rounded-lg shadow top-20">
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
      <div class="text-xs">
        <span class="font-semibold">{{ objek.meta.total }}</span> data
      </div>
      <div>
        <a href="#" @click.prevent="$parent.$parent.openModalTambah()" class="flex gap-1 text-xs link">
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
          Tambah Objek
        </a>
      </div>
    </div>
    <div class="mb-4">
      <label for="nama_jalan" class="rhr-label">Nama Jalan</label>
      <input
        type="text"
        id="nama_jalan"
        name="nama_jalan"
        class="rhr-input"
        v-model="filter.nama_jalan"
        @keyup="getFilter()"
      />
    </div>
    <div class="mb-4">
      <label for="source" class="rhr-label">Source</label>
      <select
        name="source"
        id="source"
        class="rhr-input"
        v-model="filter.source"
        @change="getFilter()"
      >
        <option value>- Pilih -</option>
        <option value="Standalone">Standalone</option>
        <option value="RIS">RIS</option>
      </select>
    </div>
    <div class="mb-4">
      <label for="filter_jenis_properti" class="rhr-label">Jenis Properti</label>
      <select
        name="filter_jenis_properti"
        id="filter_jenis_properti"
        class="rhr-input"
        v-model="filter.jenis_properti"
        @change="getFilter()"
      >
        <option value>- Pilih -</option>
        <template v-for="jenis_properti in optionsJenisProperti">
          <option :key="jenis_properti.id" :value="jenis_properti.id">{{ jenis_properti.text }}</option>
        </template>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardFilter",
  props: ["filter", "objek", "optionsJenisProperti"],
  data() {
    return {
      options: {
        jenis_properti: this.optionsJenisProperti,
      },
    };
  },
  methods: {
    getFilter() {
      this.$parent.$parent.fetchData();
    },
  },
};
</script>

<style>
</style>