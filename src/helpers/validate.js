import { toast } from "vue3-toastify"

export const validate = (data, exceptions = [], showToast = true) => {
	console.log("validate", data, exceptions)
	const errors = []
	if (data.length > 0) {
		data.forEach(item => {
			const element = {
				id: Math.abs(item.id),
				data: []
			}

			for (const [key, value] of Object.entries(item)) {
				if (value === null && !exceptions.includes(key)) {
					element.data.push(key)
				}
			}
			if (element.data.length > 0) {
				errors.push(element)
			}
		})
	} else {
		for (const [key, value] of Object.entries(data)) {
			if ((value === null || value === "") && !exceptions.includes(key)) {
				errors.push(key)
			}
		}
	}
	if (errors.length > 0 && showToast) {
		toast("Заполните обязательные поля!", {
			theme: "auto",
			type: "error",
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: true,
			dangerouslyHTMLString: true
		})
	}
	return errors
}
