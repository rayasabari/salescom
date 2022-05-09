import Vue from 'vue';
import VueAWN from 'vue-awesome-notifications'
import 'vue-awesome-notifications/dist/styles/style.css'
const awn_options = {
  position: 'bottom-right',
  labels: {
    success: 'Success',
    alert: 'Oops...'
  },
  durations: {
    success: 1200,
    alert: 3000
  }
};
Vue.use(VueAWN, awn_options);