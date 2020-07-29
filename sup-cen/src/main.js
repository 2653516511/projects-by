import 'babel-polyfill'
import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import './global-components'
import * as filters from './filters'


// new Vue({
//   el: '#app',
  // data: state,
  // render: h => h(AppLayout),

  // // provide the router to the App
  // router,
// })

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/',
})

Vue.use(VueState, state)

for (const key in filters) {
  Vue.filter(key, filters[key])
}

async function main() {

  // fetch user's information
  try {
    state.user = await $fetch('user')
  } catch (error) {
    console.warn(error);
  }

  // 启动应用
  new Vue ({
    el: '#app',
    data: state,
    render: h => h(AppLayout),

    // provide the router to the App
    router,
  })
}

main()
