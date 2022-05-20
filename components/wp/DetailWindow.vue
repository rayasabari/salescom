<template>
  <div class="absolute inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-30">
    <FormCard :title="'Detail Pembanding'" class="max-h-full">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col w-full gap-4 lg:flex-row">
          <div class="flex flex-col w-full gap-2 mb-3 top-50 lg:w-4/12">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              class="object-cover w-full mb-2 rounded-lg"
            />
            <div class="mb-4">
              <h2 class="mb-1 font-semibold text-center text-md text-primary-500">
                {{ childs[0].jenis_properti.jenis_objek }}
              </h2>
              <div class="text-xs text-center text-gray-400">
                {{ childs[0].alamat }}
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full gap-3 lg:w-8/12">
            <WpCardPembanding v-for="(child, index) in childs" :key="index" :data="child"/>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn-primary-outline" @click="$parent.closeDetail()">Cancel</button>
        </div>
      </div>
    </FormCard>
  </div>
</template>

<script>
export default {
  name: "DetailWindow",
  props: ["childs"],
  methods: {
    closeFormCard() {
      this.$parent.closeDetail();
    },
  },
};
</script>

<style>
</style>