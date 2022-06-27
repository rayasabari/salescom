<template>
  <FormCard
    :title="'Objek Penilaian'"
    :custumWidth="title == 'Jarak Terhadap' ? 'lg:w-9/12' : 'lg:w-4/12'"
  >
    <div class="w-full">
      <form @submit.prevent="update">
        <div class="mb-4" v-for="(field, index) in fields" :key="index">
          <label
            v-if="field.type != 'map'"
            :for="field.slug"
            class="rhr-label"
            :class="title == 'Elevasi' && data.kedudukan_tapak == 'Sama Rata' ? 'hidden' : ''"
          >{{field.label}}</label>

          <!-- Number & Text -->
          <div v-if="field.type == 'number' || field.type == 'text'" class="relative">
            <div
              v-if="field.unit && data.kedudukan_tapak != 'Sama Rata'"
              class="absolute inset-y-0 flex items-center justify-center text-sm right-4"
            >
              <span v-if="field.unit == 'm2'">
                <Mpersegi />
              </span>
              <span v-else>{{field.unit}}</span>
            </div>
            <input
              :name="field.slug"
              :id="field.slug"
              :type="field.type"
              step="any"
              class="rhr-input"
              :class="title == 'Elevasi' && data.kedudukan_tapak == 'Sama Rata' ? 'hidden' : ''"
              v-model="data[field.slug]"
              required
            />
          </div>

          <!-- Textarea  -->
          <div v-if="field.type == 'textarea'">
            <textarea
              :name="field.slug"
              :id="field.slug"
              rows="3"
              class="rhr-input"
              v-model="data[field.slug]"
            ></textarea>
          </div>

          <!-- Options -->
          <div v-if="field.type == 'options'">
            <!-- Hak Atas Properti -->
            <template v-if="title == 'Hak Atas Properti'">
              <select
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data.hak_atas_properti_id"
              >
                <template v-for="(item, idx) in options.hak_atas_properti">
                  <option :value="item.id" :key="idx">{{item.singkatan}}</option>
                </template>
              </select>
            </template>

            <!-- Peruntukan -->
            <template v-else-if="title == 'Peruntukan'">
              <select
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data.peruntukan_id"
              >
                <template v-for="(item, idx) in options.peruntukan">
                  <option :value="item.id" :key="idx">{{item.text}}</option>
                </template>
              </select>
            </template>

            <!-- Default  -->
            <template v-else>
              <select
                @change="changeOptions($event, field.slug)"
                class="rhr-input"
                :name="field.slug"
                :id="field.slug"
                v-model="data[field.slug]"
              >
                <template v-for="(item, idx) in options[field.slug]">
                  <option :value="item" :key="idx">{{item}}</option>
                </template>
              </select>
            </template>
          </div>

          <!-- FIle  -->
          <div v-if="field.type == 'file'">
            <input
              @change="handleFileUpload()"
              type="file"
              ref="file"
              accept=".jpg, .jpeg, .png, .webp"
              class="rhr-input-file"
            />
            <span class="text-xs">
              Ukkuran file maksimal
              <b class="font-semibold text-rose-500">5 MB</b>
            </span>
          </div>

          <!-- Gmap  -->
          <div v-if="field.type == 'map'" class="flex gap-4">
            <div class="w-8/12 h-[60vh]">
              <GmapAutocomplete
                @place_changed="setPlace"
                placeholder="Cari lokasi"
                class="block w-full px-3 py-2 text-sm transition duration-300 border border-gray-200 rounded-t-lg focus:outline-none focus:ring-primary-300 focus:border-primary-300 bg-gray-50"
              />
              <GmapMap
                :center="center"
                :zoom="zoomlevel"
                map-type-id="terrain"
                class="w-full h-full"
                ref="map"
              >
                <!-- Rute Jalur  -->
                <GmapPolyline
                  :path="pathpolyline"
                  :options="{strokeColor: '#0f766e',strokeWeight: 8, strokeOpacity: 0.8}"
                ></GmapPolyline>

                <!-- Marker Objek  -->
                <GmapMarker
                  :draggable="false"
                  :position="markerObjek"
                  :icon="require('@/assets/icons/marker/markerobjek.png')"
                  :label="{text: 'OP', color: 'white', fontSize: '13px', fontWeight: ''}"
                />

                <!-- Marker POI -->
                <GmapMarker
                  :draggable="true"
                  :position="{lat: poi.lat, lng: poi.lng }"
                  :icon="require(`@/assets/icons/marker/markerpembandingselected.png`)"
                  :label="{text: 'POI', color: 'black', fontSize: '12px', fontWeight: 'bold'}"
                  @dragend="dragsearchaddress($event)"
                />
              </GmapMap>
            </div>
            <div class="w-4/12">Form</div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
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
var polyline = require("polyline");
import { Loading } from "notiflix/build/notiflix-loading-aio";
export default {
  name: "EditObjek",
  props: ["markerObjek"],
  data() {
    return {
      title: "",
      fields: [],
      data: {
        hak_atas_properti_id: null,
        kedudukan_tapak: null,
        kedudukan_tapak_m: 0,
      },
      center: {
        lat: 0,
        lng: 0,
      },
      options: {},
      file: "",
      poi: {
        nama: null,
        jarak: null,
        lat: 0,
        lng: 0,
      },
      pathpolyline: [],
      isLoadingMapPoi: false,
      zoomlevel: 16,
    };
  },
  mounted() {
    this.center = this.markerObjek;
    this.fetchOptions();
    this.$root.$on("getFieldsModal", (title, fields, objek) => {
      this.title = title;
      this.fields = fields;
      fields.map((item) => {
        this.data[item.slug] = objek[item.slug];
      });
    });
  },
  methods: {
    async fetchOptions() {
      try {
        let response = await this.$axios.$get("/wp/options/list", {
          withCredentials: true,
        });
        console.log(response);
        this.options = response;
      } catch (e) {
        console.log(e.response);
      }
    },
    setPlace(place) {
      this.currentPlace = place;
      this.zoomlevel = 13;
      let lat = place.geometry.location.lat();
      let lng = place.geometry.location.lng();
      this.poi = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
      this.center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
      this.calcJarakObjek();
      // this.preCalcPbd();
    },
    dragsearchaddress(event) {
      this.calcJarakObjek();
      this.poi = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.center = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      // this.preCalcPbd();
    },
    calcJarakObjek() {
      this.isLoadingMapPoi = true;
      this.$refs.map[0].$mapPromise.then(() => {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.$refs.map[0].$mapObject);
        var vm = this;
        vm.directionsService.route(
          {
            origin: this.poi,
            destination: this.markerObjek,
            travelMode: "DRIVING",
          },
          function (response, status) {
            if (status === "OK") {
              //set google map direction
              let leg = response.routes[0].legs[0];
              let jarakpoiobjek = leg.distance;
              vm.poi.jarak = jarakpoiobjek.value;
              vm.poi.nama = vm.currentPlace.name;
              let arrpolyline = polyline.decode(
                response.routes[0].overview_polyline
              );
              let getcor = [];
              arrpolyline.map((item) => {
                getcor.push({
                  lat: item[0],
                  lng: item[1],
                });
              });
              vm.pathpolyline = getcor;
              vm.isLoadingMapPoi = false;
            } else {
              console.log("Directions request failed due to " + status);
              vm.isLoadingMapPoi = false;
            }
          }
        );
      });
    },
    changeOptions(e, slug) {
      if (slug == "kedudukan_tapak") {
        if (e.target.value == "Sama Rata") {
          this.data.kedudukan_tapak_m = 0;
          console.log(this.data.kedudukan_tapak_m);
        }
      }
    },
    closeFormCard() {
      this.$root.$emit("closeModal");
    },
    handleFileUpload() {
      this.file = this.$refs.file[0].files[0];
    },
    async update() {
      if (this.title == "Foto") {
        Loading.hourglass("Uploading...");
      }
      const params = {
        fields: this.fields,
        objek: this.data,
        id: this.$route.params.id,
        title: this.title,
      };
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("params", JSON.stringify(params));
      try {
        let response = await this.$axios.$post("/objek/update", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        this.$refs.cancelButton.click();
        this.$root.$emit("fetchWp");
        this.$awn.success(response.message);
        Loading.remove();
      } catch (e) {
        this.$awn.alert(e.response.data);
        Loading.remove();
      }
    },
  },
};
</script>

<style>
</style>