<template>
  <div class="bg-white h-[50vh] w-full md:w-9/12 rounded-lg shadow-xl">
    <div class="flex items-center justify-center w-full h-full gap-2">
      <button
        class=" btn-primary"
        :class="loadingButton ? 'btn-disabled':''"
        @click="exportWp"
        :disabled="loadingButton ? 'disabled' : false"
      >
        <span v-if="loadingButton" class="flex items-center justify-center gap-1">
          <IconSpinner class="w-5 h-5" />Loading...
        </span>
        <span v-else>Export</span>
      </button>
      <button class="btn-primary-outline">Import</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExportImport",
  props: ["objek", "pembandingSelected"],
  data() {
    return {
      loadingButton: false,
    };
  },
  methods: {
    exportWp() {
      this.loadingButton = true;
      this.$axios
        .post(
          "/wp/export",
          {
            objek: this.objek,
            pembandingSelected: this.pembandingSelected,
          },
          {
            withCredentials: true,
            responseType: "blob",
          }
        )
        .then((response) => {
          console.log(response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          const filename = `Salescom - ${this.objek.jenis_properti} di ${this.objek.nama_jalan}.xlsx`;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.loadingButton = false;
          console.log(err.response);
        })
        .finally(() => {
          this.loadingButton = false;
        });
    },
  },
};
</script>

<style>
</style>