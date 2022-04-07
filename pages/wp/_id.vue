<template>
  <div class="min-h-screen pb-16 bg-gray-50">
    <Container class="pt-24">
      <Breadcrumb :data="breadcrumbs" class="transition duration-300">
        <button @click="showMap = !showMap">ShowMap</button>
      </Breadcrumb>
      <div class="transition-all duration-100" :class="!showMap ? 'h-0':'h-[500px]'">
        <transition name="page">
          <LazyWpGmap v-if="showMap" :show="showMap" />
        </transition>
      </div>
      <WpTable />
    </Container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMap: false,
      breadcrumbs: [
        {
          name: "Home",
          link: "/",
        },
        {
          name: "List Objek",
          link: "/list",
        },
        {
          name: "Nama Objek",
          link: false,
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style>
</style>