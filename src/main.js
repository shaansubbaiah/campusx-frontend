import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import VeeValidate from 'vee-validate';
import VueClipboard from 'vue-clipboard2'

require('./assets/stylesheets/style.css')

Vue.config.productionTip = false;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueClipboard)
Vue.use(VueMaterial)
Vue.use(VeeValidate)
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: "",
    userId: null,
    username: "Stranger",
    login: false,
    register: false,
    message: "",
  },
  mutations: {
    Login(state, persisted_state) {
      state.username = persisted_state.name;
      state.userId = persisted_state.id;
      state.token = persisted_state.tk;
    },
    Logout(state) {
      state.username = "Stranger";
      state.userId = null;
      state.token = "";
      state.message = "";
    }
  }
})

// useful filters
Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
})

Vue.filter('datestring', function (value) {
  if (!value) return '';
  value = new Date(value);
  return value.toDateString();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");