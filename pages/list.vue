<template>
  <div class="h-screen pt-24 bg-gray-100">
    <Container class="container flex justify-center mx-auto">
      <div class="flex flex-col w-9/12">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <CardObjek v-for="objek in listobjek" :key="objek.id" :objek="objek"></CardObjek>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  name: "ListObjek",
  data() {
    return {
      breadcrumbs: [
        {
          item: "Home",
          link: "/",
        },
        {
          item: "List Objek",
          link: false,
        },
      ],
      listobjek: [
        {
          id: "1",
          nama: "Rumah Tinggal di Ragunan",
          jenis_properti: "Rumah Tinggal",
          foto: "https://source.unsplash.com/random/100x100",
        },
        {
          id: "2",
          nama: "Tanah Kosong di Jagakarsa",
          jenis_properti: "Tanah Kosong",
          foto: "https://source.unsplash.com/random/100x100",
        },
        {
          id: "3",
          nama: "Ruko di Mampang Prapatan",
          jenis_properti: "Ruko",
          foto: "https://source.unsplash.com/random/100x100",
        },
      ],
    };
  },
};
</script>

<style>
</style>