const fileUpload = function() {
	const link = document.querySelector(".js-upload-link");
	const input = document.querySelector("#files");
	const output = document.querySelector("#selectedFiles");
	var list = document.getElementById("fileList");

	// on link click trigger file input click
	link.addEventListener("click", triggerInput, false);

	function triggerInput(e) {
		input.click();
		e.preventDefault(); // prevent navigation to "#"
	}

	// init on DOM ready
	document.addEventListener("DOMContentLoaded", init, false);

	function init() {
		// input on change will generate list
		input.addEventListener("change", handleFileSelect, false);
	}

	// generate list
	function handleFileSelect(e) {
		if (!e.target.files || !window.FileReader) return;

		// empty container and append list
		// output.innerHTML = "";
		const list = document.createElement("ul");
		output.appendChild(list);

		// get array of files
		var files = e.target.files;
		console.log(files);
		var filesArr = [...files];

		// and on each file
		filesArr.forEach(function(file, i, readerEvt) {
			var file = files[i];

			// check if file is an image
			if (!file.type.match("image.*")) {
				return;
			}

			// create li container
			const li = document.createElement("li");
			list.appendChild(li);

			// create img-container and append > span > close > img
			const imgContainer = document.createElement("div");
			imgContainer.classList.add("image-container");

			const span = document.createElement("span");
			span.classList.add("close");
			span.innerHTML = "&times;";

			const img = document.createElement("img");
			img.classList.add("obj");
			img.file = file;
			img.height = 60;
			img.id = i;

			li.appendChild(imgContainer);
			imgContainer.appendChild(span);
			imgContainer.appendChild(img);

			// get img source
			// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
			const reader = new FileReader();
			reader.onload = function(e) {
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
		});
	}
};

fileUpload();

export default fileUpload;
