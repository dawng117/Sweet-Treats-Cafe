import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { init } from '@emailjs/browser'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


init("JdREvUiM9vRAj4EZi")

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
});
app.mount('#app')
