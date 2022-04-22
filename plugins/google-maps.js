import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAIVrZdcP5FhOmSeEvBFMx8HsAJKK0arXM",
    libraries: "places"
  }
});