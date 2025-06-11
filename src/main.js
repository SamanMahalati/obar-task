import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AddressForm from './components/AddressForm.vue'
import AddressList from './components/AddressList.vue'
import './style.css'

const routes = [
  { path: '/', component: AddressForm, name: 'add-address' },
  { path: '/addresses', component: AddressList, name: 'address-list' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app') 