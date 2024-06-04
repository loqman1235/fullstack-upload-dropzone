const dropzone = document.querySelector(".dropzone");
const fileInput = document.getElementById("fileInput");
const browseFilesBtn = document.getElementById("browseFilesBtn");
const uploadedFilesContainer = document.querySelector(".uploaded_files");
const dropzoneMessage = document.getElementById("dropzoneMessage");

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
  handleSelectFilesMessage(selectedFiles);
});

browseFilesBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (e) => {
  const selectedFiles = e.target.files;

  if (selectedFiles) {
    handleSelectFilesMessage(selectedFiles);
    handleUpload(selectedFiles);
  }
});

async function handleUpload(files) {
  const formData = new FormData();

  let filesWithProgress = [];

  for (const file in files) {
    formData.append("files", files[file]);
    filesWithProgress = Array.from(files).map((file) => ({
      file,
      progress: 0,
    }));
  }

  try {
    const response = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 0)
          );

          filesWithProgress = filesWithProgress.map((file) => ({
            ...file,
            progress: percentage,
          }));
        },
      }
    );

    console.log(filesWithProgress);
    handleUploadedFilesCards(filesWithProgress);

    if (response.status === 201) {
      console.log("Files uploaded");
    }
  } catch (error) {
    console.log(error);
  }
}

function handleUploadedFilesCards(files) {
  if (files.length > 0) {
    uploadedFilesContainer.parentElement.classList.add("visible");
  } else {
    uploadedFilesContainer.parentElement.classList.add("visible");
  }

  console.log(files, "Files with Progress in cards");

  files.forEach((file) => {
    let uploadedFileCard = document.createElement("div");
    uploadedFileCard.classList.add("uploaded_file_card");
    uploadedFileCard.innerHTML = `
    <span class="file_icon"
      ><i class="fa-solid fa-file-pdf"></i
    ></span>
    <div class="file_details_container">
      <div class="file_details">
        <div class="file_info">
          <p class="file_name">${file.file.name}</p>
          <span class="percentage">(${file.progress}%)</span>
        </div>
        <p class="file_status">In progress</p>
      </div>
      <div class="progress">
        <span class="progress_bar" style="width: ${file.progress}%"></span>
      </div>
    </div>
    `;
    uploadedFilesContainer.append(uploadedFileCard);
  });
}

function handleSelectFilesMessage(files) {
  dropzoneMessage.textContent =
    files.length === 1
      ? `Selected ${files.length} file: ${Array.from(files)
          .map((file) => file.name)
          .join(", ")}`
      : `Selected ${files.length} files: ${Array.from(files)
          .map((file) => file.name)
          .join(", ")}`;
}
