// Code logic time okay so. Drag and drop, must be positioned absolute
// When you click on a draggable item and move it out of the div, it adds a class that positions it absolute
// this should be the IMAGE I think? not the div. The div with the title can stay

var items = document.querySelectorAll('.item'); 

for(var i = 0; i < items.length; i++) {
       items[i].addEventListener('dragstart', itemDrag(i));
       items[i].addEventListener('dragend', itemPosition(i));


	 	var itemToggle = items[i].querySelector(".item-title");

       itemToggle.addEventListener('click', itemReturn(i));
 }

//add the dragged class when an item is dragged, positioning it absolutely
function itemDrag(i) {
    return function() {
    	var item = event.target;

        item.classList.add('dragged');
    };
}

//once the user stops dragging, place the image based on the x/y cord of the cursor, and center the image on the cursor instead of the top left
function itemPosition(i) {
 	return function() {
	 	var item = event.target;
	 	var container = document.getElementById('dressup-wrapper');
	 	var itemWidthHalf = item.width / 2;
	 	var itemHeightHalf = item.height / 2;

	 	item.classList.add('dragged');

	 	item.style.left = Number(event.clientX) - Number(itemWidthHalf) + 'px';
	 	item.style.top = Number(event.clientY) - Number(itemHeightHalf) + 'px';
	 };
}

// when the user clicks the title of the item (may make a button for this instead), return the item to its menu spot
function itemReturn(i) {
	return function() {
	 	var itemToggle = event.target;
	 	var container = itemToggle.parentNode
	 	var item = container.querySelector(".image");
        
        item.classList.remove('dragged');
        console.log("returned")
	 };
}

 // Aaand this is the code for the BGs
var backdrops = document.querySelectorAll('.backdrop'); 

 for(var i = 0; i < backdrops.length; i++) {
       backdrops[i].addEventListener('click', backdropSwitch(i));
 }

 function backdropSwitch() {
 	return function() {
	 	var backdropImage = event.target.src;
	 	var equidImage = document.getElementById('wme-image');

	 	// If the clicked BG is equipped, remove it; otherwise, apply the BG
	 	if(equidImage.style.backgroundImage == 'url("' + backdropImage + '")') {
	 		equidImage.style.backgroundImage = '';
	 	} else {
	 		equidImage.style.backgroundImage = 'url("' + backdropImage + '")';
	 	}


	 };
 }