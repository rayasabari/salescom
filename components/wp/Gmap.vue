<template>
  <div class="relative w-full h-full overflow-hidden rounded-lg shadow-xl bg-sky-200">
    <GmapMap :center="center" :zoom="15" map-type-id="terrain" class="w-full h-full">
      <!-- Marker Objek -->
      <GmapMarker
        :position="center"
        :icon="require(`@/assets/icons/marker/markerobjek.png`)"
        :label="{text: 'OP', color: 'white', fontSize: '13px', fontWeight: ''}"
      />

      <!-- Marker Pembanding Sekitar -->
      <GmapMarker
        v-for="(pembanding, idxaround) in pembandingAround"
        :key="idxaround"
        :icon="require(`@/assets/icons/marker/${pembanding.jenis_properti.marker}`)"
        :position="{lat: parseFloat(pembanding.latitude), lng: parseFloat(pembanding.longitude)}"
        @click="openInfoWindow(pembanding, idxaround, 'available')"
      />

      <!-- Radius  -->
      <GmapCircle
        :center="center"
        :radius="parseInt(2000)"
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
        <WpInfoWindowAround :pembanding="pembandingAround[currentMidx]" />
      </GmapInfoWindow>
    </GmapMap>
    <WpMapOptions />
  </div>
</template>

<script>
export default {
  name: "GmapWp",
  props: ["objek", "pembandingAround"],
  data() {
    return {
      center: {
        lat: parseFloat(this.objek.latitude),
        lng: parseFloat(this.objek.longitude),
      },
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      pembandingChilds: [],
      currentMidx: 0,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWindowOpen: false,
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
    openInfoWindow(marker, idx, type) {
      this.infoWindowPos = {
        lat: parseFloat(
          type === "available"
            ? marker.latitude
            : marker.one_pembanding.latitude
        ),
        lng: parseFloat(
          type === "available"
            ? marker.longitude
            : marker.one_pembanding.longitude
        ),
      };
      if (this.currentMidx === idx) {
        this.infoWindowOpen = !this.infoWindowOpen;
      } else {
        this.infoWindowOpen = true;
        this.currentMidx = idx;
      }
    },
    async getPembandingChilds(id) {
      try {
        let response = await this.$axios.$get(`/wp/pembanding/childs/${id}`, {
          withCredentials: true,
        });
        console.log(response);
        this.pembandingChilds = response;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
</style>