<template>
  <section class="mt-5 shadow-sm">
    <!-- <table class="w-full text-sm bg-white">
      <thead>
        <tr>
          <th>Deskripsi</th>
          <th>Objek</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alamat</td>
          <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td>
        </tr>
        <tr>
          <td>Koordinat</td>
          <td>3.61386, 98.71646</td>
        </tr>
        <tr>
          <td>Alamat</td>
          <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td>
        </tr>
        <tr>
          <td>Koordinat</td>
          <td>3.61386, 98.71646</td>
        </tr>
      </tbody>
    </table>-->

    <el-table :data="tableData" style="width: 100%" height="300">
      <el-table-column fixed prop="date" label="Date" width="150"></el-table-column>
      <el-table-column prop="name" label="Name" width="120"></el-table-column>
      <el-table-column prop="state" label="State" width="120"></el-table-column>
      <el-table-column prop="city" label="City" width="120"></el-table-column>
      <el-table-column prop="address" label="Address" width="300"></el-table-column>
      <el-table-column prop="zip" label="Zip" width="120"></el-table-column>
    </el-table>
  </section>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          state: "California",
          city: "Los Angeles",
          address: "No. 189, Grove St, Los Angeles",
          zip: "CA 90036",
        },
      ],
    };
  },
};
</script>

<style>
</style>