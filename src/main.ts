import { createApp, DefineComponent } from "vue"
import { createPinia } from "pinia"
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify"
import router from "@/plugins/router.ts"
import "@/assets/scss/main.scss"
import App from "@/layouts/App.vue"
import VueSelect from "vue-select"
import Btn from "@/components/UI/Btn.vue"
const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.component("Btn", Btn)
app.component("VueSelect", VueSelect as DefineComponent)

app.use(Vue3Toastify, {
	autoClose: 4000,
	style: {
		opacity: "1",
		userSelect: "initial"
	}
} as ToastContainerOptions)
app.mount("#app")
