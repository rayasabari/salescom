<template>
  <FormCard :title="title" custumWidth="lg:w-11/12 xl:w-9/12">
    <div class="w-full lg:w-8/12">
      <transition name="fade">
        <div
          class="mb-4 alert alert-danger"
          v-if="errors['objek.latitude']"
        >{{ errors['objek.latitude'][0] }}</div>
      </transition>
      <GmapAutocomplete
        @place_changed="setPlace"
        placeholder="Cari lokasi"
        class="block w-full px-3 py-2 text-sm transition duration-300 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-primary-300 focus:border-primary-300 bg-gray-50"
      />
      <GmapMap :center="center" :zoom="15" map-type-id="terrain" class="w-full h-[438px]">
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
        <div class="mt-4 alert alert-info" v-if="objek.alamat_gmap">
          <div>
            <strong class="font-bold">Koordinat:</strong>
            <span>{{objek.latitude +', '+ objek.longitude}}</span>
          </div>
          <strong class="font-bold">Alamat:</strong>
          <span>{{objek.alamat_gmap}}</span>
        </div>
      </transition>
    </div>
    <div class="w-full lg:w-4/12">
      <form @submit.prevent="create">
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
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.jenis_properti_id']"
            >{{errors['objek.jenis_properti_id'][0]}}</span>
          </transition>
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
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.nama_jalan']"
            >{{errors['objek.nama_jalan'][0]}}</span>
          </transition>
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
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.provinsi_id']"
            >{{errors['objek.provinsi_id'][0]}}</span>
          </transition>
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
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.kota_id']"
            >{{errors['objek.kota_id'][0]}}</span>
          </transition>
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
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.kecamatan_id']"
            >{{errors['objek.kecamatan_id'][0]}}</span>
          </transition>
        </div>
        <div class="mb-4">
          <label for="kelurahan" class="rhr-label">Kelurahan/Desa</label>
          <select name="kelurahan" id="kelurahan" class="rhr-input" v-model="objek.kelurahan_id">
            <template v-for="kelurahan in options.kelurahan">
              <option :key="kelurahan.id" :value="kelurahan.id">{{ kelurahan.text }}</option>
            </template>
          </select>
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.kelurahan_id']"
            >{{errors['objek.kelurahan_id'][0]}}</span>
          </transition>
        </div>
        <div class="mb-6">
          <label for="kode_pos" class="rhr-label">Kode Pos</label>
          <input
            type="number"
            id="kode_pos"
            name="kode_pos"
            class="rhr-input"
            v-model="objek.kode_pos"
          />
          <transition name="fade">
            <span
              class="mt-1 text-xs text-rose-400"
              v-if="errors['objek.kode_pos']"
            >{{errors['objek.kode_pos'][0]}}</span>
          </transition>
        </div>
        <div class="flex justify-end">
          <div class="flex gap-2">
            <button
              type="button"
              ref="cancelButton"
              @click="closeFormCard"
              class="btn-primary-outline"
            >Batal</button>
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
  props: ["optionsJenisProperti"],
  data() {
    return {
      title: "Tambah Objek",
      center: {
        lat: 0,
        lng: 0,
      },
      zoomlevel: 13,
      source: "Standalone",
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
        jenis_properti: this.optionsJenisProperti,
        provinsi: [],
        kota: [],
        kecamatan: [],
        kelurahan: [],
      },
      errors: [],
    };
  },
  mounted() {
    this.getProvinsi();
  },
  methods: {
    async create() {
      try {
        let response = await this.$axios.$post(
          `/objek/create`,
          {
            objek: this.objek,
            source: this.source,
          },
          {
            withCredentials: true,
          }
        );
        this.$awn.success("Objek berhasil ditambah!");
        this.$refs.cancelButton.click();
        this.$router.push(`/wp/${response.id}`);
      } catch (e) {
        this.$awn.alert("Submit gagal!");
        if (e.response.data.errors) {
          this.errors = e.response.data.errors;
        }
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
            this.errors = [];
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
    closeFormCard() {
      this.$root.$emit("closeModal");
    },
  },
};
</script>

<style>
</style>