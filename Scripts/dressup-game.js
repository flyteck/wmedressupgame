// Code logic time okay so. Drag and drop, must be positioned absolute
// When you click on a draggable item and move it out of the div, it adds a class that positions it absolute
// this should be the IMAGE I think? not the div. The div with the title can stay
// todo: add docstrings to explain the functions for reference later
// change to object oriented approach

// god this is a nightmare

document.addEventListener("DOMContentLoaded", () => {
	// Get references to the items and stage
	const items = document.querySelectorAll('.item');
	const stage = document.getElementById('stage');

	// main game logic
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

	// item size functionality
// add event listener for slider html element
// 	todo: edit this to work with the new size buttons (Removed the slider for scale)
	const scaleSlider = document.getElementById('scale-slider');
	scaleSlider.addEventListener('input', () => {
		// select items by red glow
		const selectedItems = document.querySelectorAll('.redGlow');
		// iterate these items and scale them
		selectedItems.forEach(item => {
			// const scaleValue = scaleSlider.value / 100;
			item.style.transform = `scale(${scaleSlider.value})`;
		});
	});

// 	item rotate functionality
// 	add event listener for rotation slider
	const rotateSlider = document.getElementById('rotate-slider');
	rotateSlider.addEventListener('input', () => {
		// select items by red glow
		const selectedItems = document.querySelectorAll('.redGlow');
		// iterate these items and rotate them
		selectedItems.forEach(item => {
			item.style.transform = `rotate(${rotateSlider.value}deg)`;
		});
	});

});

	// Function to handle dragging and repositioning of items on the stage
	function makeItemDraggable(item) {
		let offsetX = 0;
		let offsetY = 0;

		// adds glow effect to hover over item
		item.addEventListener('mouseenter', () => {
			item.classList.add('glow');
		})
		// removes glow when stop hover
		item.addEventListener('mouseleave', () => {
			item.classList.remove('glow');
		})

		item.addEventListener('click', () => {
			item.classList.toggle('redGlow');
		})

		item.addEventListener('dragstart', (e) => {
			// Add glow effect when dragging starts
			item.classList.add('glow');

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
			// remove glow effect on drag end
			item.classList.remove('glow');
			// Reset the position after the drag ends
			item.style.position = 'absolute'; // Keeps the item in its new position
		});
	}


	// delete items functionality
	// attach event listener to delete button
const deleteButton = document.getElementById('delete-button');
	//  if delete button is pressed then delete all selected items
	if(deleteButton) {
		deleteButton.addEventListener('click', () => deleteItem());
	}

// 	function to delete items from game window
function deleteItem() {
	//  get all items with red glow css property
	const selectedItems = document.querySelectorAll('.redGlow');
	// loop through all items and delete
	selectedItems.forEach(item => {
		item.remove();
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


// scale items with doll size functionality todo: finish this
const dollImage = document.getElementById('doll');
	let dollWidth, dollHeight;


// code to replace the Equid image with the user uploaded image
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


// help popup functionality
// Function to open the help popup
function openHelpPopup() {
	document.getElementById('help-popup').style.display = 'block';
}

// Function to close the help popup
function closeHelpPopup() {
	document.getElementById('help-popup').style.display = 'none';
}

// Attach event listener to the help button
const helpButton = document.getElementById('help-button'); // Ensure your help button has this ID
if (helpButton) {
	helpButton.addEventListener('click', openHelpPopup);
}


