<template>
  <div class="h-screen pt-16 bg-gray-50">
    <Container class="container flex justify-center mx-auto">
      <div class="flex flex-col w-9/12">
        <Breadcrumb :data="breadcrumbs"></Breadcrumb>
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
          name: "Home",
          link: "/",
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
          foto: "https://source.unsplash.com/random/100x100",
          sistem: 'Integrated'
        },
        {
          id: "2",
          nama: "Tanah Kosong di Jagakarsa",
          jenis_properti: "Tanah Kosong",
          foto: "https://source.unsplash.com/random/100x100",
          sistem: 'Standalone'
        },
        {
          id: "3",
          nama: "Ruko di Mampang Prapatan",
          jenis_properti: "Ruko",
          foto: "https://source.unsplash.com/random/100x100",
          sistem: 'Integrated'
        },
      ],
    };
  },
};
</script>

<style>
</style>