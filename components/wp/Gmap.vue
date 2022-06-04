<template>
  <div class="relative w-full h-full overflow-hidden rounded-lg shadow-xl bg-sky-300">
    <template v-if="!loadMap">
      <div class="h-full w-full bg-[url('@/assets/images/mapbg.webp')] bg-center bg-cover">
        <div
          class="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-blur-md"
        >
          <button @click="setLoadMap()" class="flex items-center gap-2 btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 animate-pulse"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
              />
            </svg>
            <span class>Click to load Maps</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <GmapMap :center="center" :zoom="15" map-type-id="terrain" class="w-full h-full">
        <!-- Marker Objek -->
        <GmapMarker
          :position="center"
          :icon="require(`@/assets/icons/marker/markerobjek.png`)"
          :label="{text: 'OP', color: 'white', fontSize: '13px', fontWeight: ''}"
        />

        <!-- Marker Pembanding Sekitar -->
        <GmapMarker
          v-for="(pembanding, index) in pembandingAround"
          :key="index+'_around'"
          :icon="require(`@/assets/icons/marker/${pembanding.icon}`)"
          :position="{lat: parseFloat(pembanding.latitude), lng: parseFloat(pembanding.longitude)}"
          @click="openInfoWindow(pembanding, index, 'around')"
        />

        <!-- Marker Pembanding dipilih -->
        <GmapMarker
          v-for="(pembanding, index) in pembandingSelected"
          :key="index+'_selected'"
          :icon="require(`@/assets/icons/marker/markerpembandingselected.png`)"
          :label="{text: (index+1).toString(), color: 'black', fontSize: '18px', fontWeight: 'bold'}"
          :position="{lat: parseFloat(pembanding.latitude), lng: parseFloat(pembanding.longitude)}"
          @click="openInfoWindow(pembanding, index, 'selected')"
        />

        <!-- Radius  -->
        <GmapCircle
          :center="center"
          :radius="parseInt(1500)"
          :visible="true"
          :options="optionradius"
        />

        <!-- Info window -->
        <GmapInfoWindow
          :options="infoWindowOptions"
          :position="infoWindowPos"
          :opened="infoWindowOpen"
          @closeclick="infoWindowOpen=false"
        >
          <WpInfoWindowAround
            v-if="infoWindowType == 'around'"
            :pembanding="pembandingAround[currentIdx]"
          />
          <WpInfoWindowSelected
            v-if="infoWindowType == 'selected'"
            :pembanding="pembandingSelected[currentIdx]"
            :no="currentIdx+1"
          />
        </GmapInfoWindow>
      </GmapMap>
      <WpMapOptions />
      <transition name="fade">
        <WpDetailWindow v-if="detailWindow" :childs="pembandingChilds" />
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "GmapWp",
  props: [
    "objek",
    "center",
    "loadMap",
    "pembandingAround",
    "pembandingSelected",
  ],
  data() {
    return {
      detailWindow: false,
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      pembandingChilds: [],
      currentIdx: 0,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWindowOpen: false,
      infoWindowType: "",
      optionradius: {
        strokeWeight: 2,
        strokeColor: "#00b185",
        strokeOpacity: 0.9,
        fillColor: "#00b185",
        fillOpacity: 0.2,
      },
    };
  },
  mounted() {},
  methods: {
    setLoadMap() {
      this.$root.$emit("setLoadMap");
    },
    openInfoWindow(marker, idx, type) {
      this.infoWindowPos = {
        lat: parseFloat(marker.latitude),
        lng: parseFloat(marker.longitude),
      };
      if (this.currentIdx === idx) {
        this.infoWindowOpen = !this.infoWindowOpen;
      } else {
        this.infoWindowOpen = true;
        this.currentIdx = idx;
      }
      this.infoWindowType = type;
    },
    async getPembandingChilds(id) {
      try {
        let response = await this.$axios.$get(`/wp/pembanding/childs/${id}`, {
          withCredentials: true,
        });
        console.log(response);
        this.pembandingChilds = response.data;
        this.detailWindow = true;
      } catch (e) {
        console.log(e);
      }
    },
    closeDetail() {
      this.detailWindow = false;
    },
  },
};
</script>

<style>
</style>