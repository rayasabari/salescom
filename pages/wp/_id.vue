<template>
  <div class="min-h-screen pb-16 bg-gray-50">
    <Container class="pt-24">
      <Breadcrumb :data="breadcrumbs" class="transition duration-300">
        <button @click="showMap = !showMap">ShowMap</button>
      </Breadcrumb>
      <transition name="page">
        <LazyWpGmap v-if="showMap" />
      </transition>
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