export const formatDate = date => {
	return date.split("T")[0] + ", " + date.slice(11, 19) + " pm"
}
