const btnUploadFile = document.querySelector("#btn-upload-file");
const fileInput = document.querySelector("#fileInput");

btnUploadFile.addEventListener('click', () => {
	fileInput.click();
})

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0];
	if (file) {
		console.log(file);
	}
	else {
		console.log('deu ruim')
	}
})