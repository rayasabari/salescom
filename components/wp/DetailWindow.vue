<template>
  <div class="absolute inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-30">
    <FormCard :title="'Detail Pembanding'" class="max-h-full" custumWidth="lg:w-11/12 xl:w-9/12">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col w-full gap-4 lg:flex-row">
          <div class="flex flex-col w-full gap-2 mb-3 top-50 lg:w-4/12">
            <div
              class="overflow-hidden bg-slate-300 w-full rounded-lg h-[210px] mb-2"
              :class="!imgLoaded ? 'animate-pulse':''"
            >
              <transition name="fade">
                <img
                  :src="`https://system.rhr.co.id/storage/files/attachment/pembanding/properti/${childs[0].id}/original/${childs[0].foto.storage_name}`"
                  class="object-cover min-h-[210px] w-full rounded-lg"
                  @error="$event.target.src='https://digitiket.com/blog/assets/images/nopic.png'"
                  @load="onImgLoaded"
                  v-show="imgLoaded"
                />
              </transition>
            </div>
            <div class="mb-4">
              <h2
                class="mb-1 font-semibold text-center text-md text-primary-500"
              >{{ childs[0].jenis_properti }}</h2>
              <div class="text-xs text-center text-gray-400">{{ childs[0].alamat }}</div>
            </div>
          </div>
          <div class="flex flex-col w-full gap-3 lg:w-8/12">
            <WpCardPembanding v-for="(child, index) in childs" :key="index" :pembanding="child" />
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" class="btn-primary-outline" @click="$parent.closeDetail()">Batal</button>
        </div>
      </div>
    </FormCard>
  </div>
</template>

<script>
export default {
  name: "DetailWindow",
  props: ["childs"],
  data() {
    return {
      imgLoaded: false,
    };
  },
  methods: {
    onImgLoaded() {
      this.imgLoaded = true;
    },
    closeFormCard() {
      this.$parent.closeDetail();
    },
  },
};
</script>

<style>
</style>