// Code logic time okay so. Drag and drop, must be positioned absolute
// When you click on a draggable item and move it out of the div, it adds a class that positions it absolute
// this should be the IMAGE I think? not the div. The div with the title can stay
// todo: add docstrings to explain the functions for reference later

// god this is a nightmare

document.addEventListener("DOMContentLoaded", () => {
	// Get references to the items and stage
	const items = document.querySelectorAll('.item');
	const stage = document.getElementById('stage');

	// handles clicking an item to add it to the stage
	items.forEach(item => {
		item.addEventListener('click', () => {
			// Get the image source of the clicked item
			const imageSrc = item.querySelector('img').src;

			// Create a new div to represent the item on the stage
			const newItem = document.createElement('div');
			newItem.classList.add('stage-item');
			newItem.setAttribute('draggable', 'true');
			newItem.innerHTML = `
                <img src="${imageSrc}" alt="Item" class="stage-item-img">
            `;

			// Center the new item on the stage
			const stageWidth = stage.offsetWidth;
			const stageHeight = stage.offsetHeight;
			const itemWidth = newItem.offsetWidth;
			const itemHeight = newItem.offsetHeight;

			newItem.style.position = 'absolute';
			newItem.style.left = `${(stageWidth - itemWidth) / 2}px`;
			newItem.style.top = `${(stageHeight - itemHeight) / 2}px`;

			// Append the new item to the stage
			stage.appendChild(newItem);

			// Make the new item draggable
			makeItemDraggable(newItem);
		});
	});
});

	// Function to handle dragging and repositioning of items on the stage
	function makeItemDraggable(item) {
		let offsetX = 0;
		let offsetY = 0;

		item.addEventListener('dragstart', (e) => {
			// Get the initial offset when the drag starts
			offsetX = e.clientX - item.getBoundingClientRect().left;
			offsetY = e.clientY - item.getBoundingClientRect().top;
		});

		item.addEventListener('dragover', (e) => {
			e.preventDefault();

			// Reposition the item while it's being dragged
			item.style.position = 'absolute';
			item.style.left = `${e.clientX - offsetX}px`;
			item.style.top = `${e.clientY - offsetY}px`;
		});

		item.addEventListener('dragend', () => {
			// Reset the position after the drag ends
			item.style.position = 'absolute'; // Keeps the item in its new position
		});
	}

// background functionality
// get all backdrops
	const backdrops = document.querySelectorAll('.backdrop');

// Loop through backdrops array to add event listeners
	backdrops.forEach((backdrop) => {
		backdrop.addEventListener('click', () => backdropSwitch());
	})

	// function that causes the backdrop switch
	function backdropSwitch() {
		let backdropImage = event.target.src;
		let dollImage = document.getElementById('doll');

		// If the clicked BG is equipped, remove it; otherwise, apply the BG
		if (dollImage.style.backgroundImage === 'url("' + backdropImage + '")') {
			dollImage.style.backgroundImage = '';
		} else {
			dollImage.style.backgroundImage = 'url("' + backdropImage + '")';
		}
	}

// scale items with doll size functionality
const dollImage = document.getElementById('doll');
	let dollWidth, dollHeight;


//code to replace the Equid image with the user uploaded image
// get the equid upload button
const equidUpload = document.getElementById('upload-button');
// get the user input url from the rat upload button
const newEquid = document.getElementById('equid-url-input');
//get the rat image spot
const dollSpot = document.getElementById('doll');
// Replace the rat image with the new rat image when the upload button is clicked
equidUpload.onclick = function() {
	// Get the URL entered by the user
	const newEquidURL = newEquid.value;

	// Check if the URL is valid
	if (newEquidURL) {
		// Set the rat image's src to the new URL
		dollSpot.src = newEquidURL;
	} else {
		alert("Please enter a valid URL for the rat image.");
	}
};
