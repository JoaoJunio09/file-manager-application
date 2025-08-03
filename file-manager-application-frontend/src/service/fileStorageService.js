const API_BASE_URL_UPLOADFILE = "localhost:8080/api/file/v1/uploadFile";

async function uploadFile(file) {
	const formData = new FormData();
	formData.append('file', file);

	const response = await fetch(API_BASE_URL_UPLOADFILE, {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		throw new Error("Não foi possível realizar upload");
	}

	return await response.json();
}

export const FileStorageService = {
	uploadFile,
};