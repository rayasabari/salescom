<template>
  <FormCard :title="title">
    <div class="w-full lg:w-8/12">
      <GmapAutocomplete
        @place_changed="setPlace"
        class="block w-full px-3 py-2 text-sm transition duration-300 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-primary-300 focus:border-primary-300 bg-gray-50"
      />
      <GmapMap :center="center" :zoom="15" map-type-id="terrain" class="w-full h-[590px]">
        <GmapMarker
          :draggable="true"
          :position="{
                  lat: parseFloat(this.objek.latitude),
                  lng: parseFloat(this.objek.longitude),
                }"
          @dragend="dragsearchaddress($event)"
        />Î
      </GmapMap>
      <transition name="fade">
        <div class="mt-4 alert-info" v-if="objek.alamat_gmap">
          <strong class="font-bold">Alamat:</strong>
          <span>{{objek.alamat_gmap}}</span>
        </div>
      </transition>
    </div>
    <div class="w-full lg:w-4/12">
      <form @submit.prevent="create">
        <div class="flex gap-4 mb-4">
          <div class="w-1/2">
            <label for="latitude" class="rhr-label">Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              class="bg-gray-100 rhr-input"
              disabled
              v-model="objek.latitude"
            />
          </div>
          <div class="w-1/2">
            <label for="longitude" class="rhr-label">Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              class="bg-gray-100 rhr-input"
              disabled
              v-model="objek.longitude"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="jenis_properti" class="rhr-label">Jenis Properti</label>
          <select
            name="jenis_properti"
            id="jenis_properti"
            class="rhr-input"
            v-model="objek.jenis_properti_id"
          >
            <template v-for="jenis_properti in options.jenis_properti">
              <option :key="jenis_properti.id" :value="jenis_properti.id">{{ jenis_properti.text }}</option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label for="nama_jalan" class="rhr-label">Nama Jalan</label>
          <input
            type="text"
            id="nama_jalan"
            name="nama_jalan"
            class="rhr-input"
            v-model="objek.nama_jalan"
          />
          <span class="text-xs">
            <b class="italic font-bold">Contoh:</b>
            Jl. Karet Karya VII No. 9
          </span>
        </div>
        <div class="mb-4">
          <label for="provinsi" class="rhr-label">Provinsi</label>
          <select
            name="provinsi"
            id="provinsi"
            class="rhr-input"
            v-model="objek.provinsi_id"
            @input="getKotaByProvinsi($event.target.value)"
          >
            <template v-for="provinsi in options.provinsi">
              <option :key="provinsi.id" :value="provinsi.id">{{ provinsi.text }}</option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label for="kota" class="rhr-label">Kota/Kabupaten</label>
          <select
            name="kota"
            id="kota"
            class="rhr-input"
            v-model="objek.kota_id"
            @input="getKecamatanByKota($event.target.value)"
          >
            <template v-for="kota in options.kota">
              <option :key="kota.id" :value="kota.id">{{ kota.text }}</option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label for="kecamatan" class="rhr-label">Kecamatan</label>
          <select
            name="kecamatan"
            id="kecamatan"
            class="rhr-input"
            v-model="objek.kecamatan_id"
            @input="getKelurahanByKecamatan($event.target.value)"
          >
            <template v-for="kecamatan in options.kecamatan">
              <option :key="kecamatan.id" :value="kecamatan.id">{{ kecamatan.text }}</option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label for="kelurahan" class="rhr-label">Kelurahan/Desa</label>
          <select name="kelurahan" id="kelurahan" class="rhr-input" v-model="objek.kelurahan_id">
            <template v-for="kelurahan in options.kelurahan">
              <option :key="kelurahan.id" :value="kelurahan.id">{{ kelurahan.text }}</option>
            </template>
          </select>
        </div>
        <div class="mb-4">
          <label for="kode_pos" class="rhr-label">Kode Pos</label>
          <input
            type="number"
            id="kode_pos"
            name="kode_pos"
            class="rhr-input"
            v-model="objek.kode_pos"
          />
        </div>
        <div class="flex justify-end">
          <div class="flex gap-2">
            <button type="button" @click="cancel" class="btn-primary-outline">Cancel</button>
            <button type="submit" class="btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </FormCard>
</template>

<script>
export default {
  name: "formAddObjek",
  data() {
    return {
      title: "Tambah Objek",
      center: {
        lat: 0,
        lng: 0,
      },
      zoomlevel: 13,
      objek: {
        jenis_properti_id: null,
        nama_jalan: "",
        alamat_gmap: null,
        latitude: null,
        longitude: null,
        provinsi_id: null,
        kota_id: null,
        kecamatan_id: null,
        kelurahan_id: null,
      },
      options: {
        jenis_properti: [],
        provinsi: [],
        kota: [],
        kecamatan: [],
        kelurahan: [],
      },
    };
  },
  mounted() {
    this.getProvinsi();
    this.getJenisProperti();
  },
  methods: {
    async create() {
      try {
        let response = await this.$axios.$post(
          `/objek/create`,
          {
            params: this.objek,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async getJenisProperti() {
      try {
        let jenis_properti = await this.$axios.$get(`/master/jenis_properti`);
        this.options.jenis_properti = jenis_properti.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProvinsi() {
      try {
        let provinsi = await this.$axios.$get(`/master/provinsi`);
        this.options.provinsi = provinsi.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getKotaByProvinsi(provinsi_id) {
      try {
        let kota = await this.$axios.$get(`/master/kota/${provinsi_id}`);
        this.options.kota = kota.data;
      } catch (error) {
        console.log(error);
      }
      this.options.kecamatan = [];
      this.options.kelurahan = [];
      this.objek.kota_id = null;
      this.objek.kecamatan_id = null;
      this.objek.kelurahan_id = null;
    },
    async getKecamatanByKota(kota_id) {
      try {
        let kecamatan = await this.$axios.$get(`/master/kecamatan/${kota_id}`);
        this.options.kecamatan = kecamatan.data;
      } catch (error) {
        console.log(error);
      }
      this.options.kelurahan = [];
      this.objek.kecamatan_id = null;
      this.objek.kelurahan_id = null;
    },
    async getKelurahanByKecamatan(kecamatan_id) {
      try {
        let kelurahan = await this.$axios.$get(
          `/master/kelurahan/${kecamatan_id}`
        );
        this.options.kelurahan = kelurahan.data;
      } catch (error) {
        console.log(error);
      }
      this.objek.kelurahan_id = null;
    },
    cancel() {
      this.$root.$emit("closeModal");
    },
    setPlace(place) {
      this.center = {
        lat: parseFloat(place.geometry.location.lat()),
        lng: parseFloat(place.geometry.location.lng()),
      };
      this.zoomlevel = 19;
      this.geocodebycoordinate(this.center.lat, this.center.lng);
    },
    dragsearchaddress(event) {
      this.geocodebycoordinate(event.latLng.lat(), event.latLng.lng());
    },
    geocodebycoordinate(latitude, longitude) {
      let geocoder = new google.maps.Geocoder();
      let latLng = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      };
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.objek.alamat_gmap = results[0].formatted_address;
            this.objek.nama_jalan = results[0].address_components[2].short_name;
            this.objek.latitude = parseFloat(latitude);
            this.objek.longitude = parseFloat(longitude);
            console.log(results[0]);
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    },
    copyalamat_gmap() {
      this.objek.alamat = this.objek.alamat_gmap;
    },
  },
};
</script>

<style>
</style>