<template>
  <div class="min-h-screen pt-10 bg-gray-50">
    <Breadcrumb :data="breadcrumbs" class="transition duration-300">
      <button class="text-sm" @click="showMap = !showMap">ShowMap</button>
    </Breadcrumb>
    <Container class>
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
  layout: "wp",
  scrollToTop: true,
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