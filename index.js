const dropzone = document.querySelector(".dropzone");
const fileInput = document.getElementById("fileInput");
const browseFilesBtn = document.getElementById("browseFilesBtn");
const uploadedFilesContainer = document.querySelector(".uploaded_files");

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  const selectedFiles = e.dataTransfer.files;
  handleUpload(selectedFiles);
});

browseFilesBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const selectedFiles = e.target.files;

  if (selectedFiles) {
    handleUpload(selectedFiles);
  }
});

async function handleUpload(files) {
  const formData = new FormData();

  for (const file in files) {
    formData.append("files", files[file]);
  }

  handleUploadedFilesCards(files);

  return;

  try {
    const response = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
        },
      }
    );

    if (response.status === 201) {
      console.log("Files uploaded");
    }
  } catch (error) {
    console.log(error);
  }
}

function handleUploadedFilesCards(files) {
  const filesArr = Array.from(files);

  if (filesArr.length > 0) {
    uploadedFilesContainer.parentElement.classList.add("visible");
  } else {
    uploadedFilesContainer.parentElement.classList.add("visible");
  }

  filesArr.forEach((file) => {
    let uploadedFileCard = document.createElement("div");
    uploadedFileCard.classList.add("uploaded_file_card");
    uploadedFileCard.innerHTML = `
    <span class="file_icon"
      ><i class="fa-solid fa-file-pdf"></i
    ></span>
    <div class="file_details_container">
      <div class="file_details">
        <div class="file_info">
          <p class="file_name">${file.name}</p>
          <span class="percentage">(50%)</span>
        </div>
        <p class="file_status">In progress</p>
      </div>
      <div class="progress">
        <span class="progress_bar"></span>
      </div>
    </div>
    `;
    uploadedFilesContainer.append(uploadedFileCard);
  });
}
