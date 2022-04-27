import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

export default ({ $config: { googleMapsApiKey } }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: googleMapsApiKey,
      libraries: "places"
    }
  });
}
