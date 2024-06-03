const formElement = document.getElementById("form");
const fileInput = document.getElementById("file");
const outputElement = document.querySelector(".output");
const progressBar = document.querySelector(".progress-bar");
const percentage = document.querySelector(".percentage");

let file;

async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await axios.post(
      "http://localhost:3001/upload",
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );

          console.log(
            `Loaded ${progressEvent.loaded} bytes of ${progressEvent.total} bytes are uploaded `
          );

          percentage.textContent = `${progress}%`;
          progressBar.parentElement.style.display = "block";
          progressBar.style.width = `${progress}%`;

          if (progress === 100) {
            alert("File successfully uploaded!");
            progressBar.parentElement.style.display = "none";
          }
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}

function handleFilesChange(e) {
  file = e.target.files[0];
}

// Event listeners
formElement.addEventListener("submit", handleFormSubmit);
fileInput.addEventListener("change", handleFilesChange);
