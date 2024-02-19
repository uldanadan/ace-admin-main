//--------------------------------------------------------------------------------------------------
import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";
import router from "@/plugins/router.ts";
import "@/assets/scss/main.scss";
import App from "@/layouts/App.vue";
//--------------------------------------------------------------------------------------------------
const pinia = createPinia()

//--------------------------------------------------------------------------------------------------
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(Vue3Toastify, {
	autoClose: 4000,
	style: {
		opacity: "1",
		userSelect: "initial"
	}
} as ToastContainerOptions);
app.mount("#app")
