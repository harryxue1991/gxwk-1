import Vue from 'vue';
import App from './app';
import vueResource from 'vue-resource';
import VueRouter from 'vue-router';
import $ from  './assets/js/jquery-1.9.1.js';
import routes from './router';

import './assets/css/public_style.css';
import './assets/font/typicons.min.css';


import pic from './components/Picture.vue';
import vid from './components/Videosm.vue';
import cho from './components/Choice.vue';
import mcho from './components/Mchoice.vue';
import videosss from './pages/videosss.vue';

Vue.use(vueResource);
Vue.use(VueRouter);
var router = new VueRouter({
   mode:"hash",
   base: __dirname,
   routes
});

new Vue({ 
  el: '#app',
  router,
  render: h => h(App)
});
