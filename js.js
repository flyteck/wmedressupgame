// Code logic time okay so. Drag and drop, must be positioned absolute
// When you click on a draggable item and move it out of the div, it adds a class that positions it absolute
// this should be the IMAGE I think? not the div. The div with the title can stay

var items = document.querySelectorAll(".item"); 

for(var i = 0; i < items.length; i++) {
       items[i].addEventListener("dragstart", itemDrag(i));
       items[i].addEventListener("dragend", itemPosition(i));
 }

 function itemDrag(i) {
    return function() {
    	var item = event.target;
        console.log("dragged " + i);
        item.classList.add("dragged");
    };
 }

 function itemPosition(i) {
 	return function() {
	 	var item = event.target;
	 	var container = document.getElementById("dressup-wrapper");
	 	var itemWidthHalf = item.width / 2;
	 	var itemHeightHalf = item.height / 2;

	 	item.style.left = Number(event.clientX) - Number(itemWidthHalf) + "px";
	 	item.style.top = Number(event.clientY) - Number(itemHeightHalf) + "px";

	 	console.log("done");
	 };
 }