import http from "@/http-common"

class FiletransferDataService {
	postImage(data) {
		return http.post(`/filetransfer/image/`, data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
	}
}

export default new FiletransferDataService()
