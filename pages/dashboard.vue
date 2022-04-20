<template>
  <div class="h-screen pt-20 bg-gray-50">
    <Container class="container flex justify-center mx-auto">
      <div class="flex flex-col w-full md:w-8/12">
        <Breadcrumb :data="breadcrumbs"></Breadcrumb>
        <CardObjek v-for="objek in listobjek" :key="objek.id" :objek="objek"></CardObjek>
      </div>
    </Container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      breadcrumbs: [
        {
          name: "Dashboard",
          link: "/dashboard",
        },
        {
          name: "List WP",
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
};
</script>

<style>
</style>