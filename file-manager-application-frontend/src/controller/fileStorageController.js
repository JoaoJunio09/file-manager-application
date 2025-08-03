const btnUploadFile = document.querySelector("#btn-upload-file");
const fileInput = document.querySelector("#fileInput");

const containerConfirmFilesForupload = document.querySelector(".container-confirm-files-for-upload");
const btnConfirmFileUpload = document.querySelector("#btn-confirm-file-upload");
const btnOpenFileConfirmUpload = document.querySelector(".filename");

const modalOpenFile = document.querySelector(".modal-open-file");
const iframe = document.querySelector("#iframe");

btnUploadFile.addEventListener('click', () => {
     fileInput.click();
});

btnConfirmFileUpload.addEventListener('click', () => {
    listFiles.forEach(file => {
        console.log(file);
    });
});

let listFiles = [];

fileInput.addEventListener('change', () => {
	const file = fileInput.files[0];

	if (file) {
        listFiles.push(file);
		getContentFile(file, (result) => {
			switch(result.type) {
				case "text":
					containerConfirmFilesForupload.style.display = "flex";
                    btnConfirmFileUpload.style.display = "initial";
                    fillInConfirmUpload(result.type, result.fileName, result.content);
					break;
				case "image":
					containerConfirmFilesForupload.style.display = "flex";
                    btnConfirmFileUpload.style.display = "initial";
                    fillInConfirmUpload(result.type, result.fileName, result.content);
					break;
				case "blob":
                    containerConfirmFilesForupload.style.display = "flex";
                    btnConfirmFileUpload.style.display = "initial";
                    fillInConfirmUpload(result.type, result.fileName, result.content);
					break;
			}
		}); 
	}
});

function getContentFile(file, callback) {
	const reader = new FileReader();
	const type = file.type;

	if (type.startsWith("text/") || file.name.endsWith(".csv") || file.name.endsWith(".json")) {
		reader.onload = (e) => callback({ type: "text", fileName: file.name, content: e.target.result });
		reader.readAsText(file);
	} 
	else if (type.startsWith("image/")) {
		reader.onload = (e) => callback({ type: "image", fileName: file.name, content: e.target.result });
		reader.readAsDataURL(file);
  	} 
	else {
		reader.onload = (e) => callback({ type: "blob", fileName: file.name, content: e.target.result });
		reader.readAsArrayBuffer(file);
  }
}

function fillInConfirmUpload(type, fileName, content) {
    const confirmUpload = document.createElement('div');
    confirmUpload.classList.add("confirm-upload");
    
    if (type === "text") {
        confirmUpload.innerHTML += `
            <p class="filename">${fileName}</p>
            <img src="src/assets/img/multiply_5664686.png" alt="">
        `;
    } 
    
    if (type === "image") {
        confirmUpload.innerHTML += `
            <p class="filename">${fileName}</p>
            <img src="src/assets/img/multiply_5664686.png" alt="">
        `;
    }
    
    if (type === "blob") {
        confirmUpload.innerHTML += `
            <p class="filename">${fileName}</p>
            <img src="src/assets/img/multiply_5664686.png" alt="">
        `;
    }

    confirmUpload.querySelector(".filename").addEventListener('click', () => {
        console.log('Arquivo clicado : ' + fileName);
        listFiles.forEach(file => {
            if (fileName === file.name) {

                const fade = document.querySelector(".fade");
                fade.classList.add("show-fade");
                modalOpenFile.classList.add("show-modal-open-file");

                if (type === "blob") {

                    const blob = new Blob([content], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    
                    const openNewTab = document.querySelector("#btnOpenInNewTab");

                    iframe.src = url;
                    modalOpenFile.classList.remove("hidden");
                    
                    openNewTab.onclick = () => window.open(url, '_blank');
                }
            }
        });
    });

    containerConfirmFilesForupload.append(confirmUpload);
}