export const inputNumber = value => {
	console.log("event keycode", event.keyCode)
	if (event.keyCode < 46 || event.keyCode > 57) {
		event.returnValue = false
	}
}
