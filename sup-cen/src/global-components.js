import Vue from 'vue'
import Loading from './components/Loading.vue'
import SmartForm from './components/SmartForm.vue'
import FormInput from './components/FormInput.vue'

// register the loading component globally with the vue.component() method
Vue.component("Loading", Loading)
Vue.component('SmartForm', SmartForm)
Vue.component('FormInput', FormInput)

