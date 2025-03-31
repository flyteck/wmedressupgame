// alternative script for functionality
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the items and stage
    const items = document.querySelectorAll('.item');
    const stage = document.getElementById('stage');

    // Function to handle dragstart event (for dragging items to stage)
    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            // Store the image source and title for the item being dragged
            e.dataTransfer.setData('image', item.querySelector('img').src);
            e.dataTransfer.setData('title', item.querySelector('.item-title').textContent);
        });
    });

    // Allow items to be dropped on the stage by preventing the default behavior
    stage.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    // Handle the drop event when an item is dropped onto the stage
    stage.addEventListener('drop', (e) => {
        e.preventDefault();

        // Get the image source and title from the dataTransfer
        const imageSrc = e.dataTransfer.getData('image');
        const itemTitle = e.dataTransfer.getData('title');

        // Create a new div to represent the item on the stage
        const newItem = document.createElement('div');
        newItem.classList.add('stage-item');
        newItem.setAttribute('draggable', 'true');
        newItem.innerHTML = `
            <img src="${imageSrc}" alt="${itemTitle}" class="stage-item-img">
            <span class="stage-item-title">${itemTitle}</span>
        `;

        // Append the new item to the stage
        stage.appendChild(newItem);

        // Allow the new item to be dragged and repositioned
        makeItemDraggable(newItem);
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
});

// background functionality
// get all backdrops
const backdrops = document.querySelectorAll('.backdrop');

// Loop through backdrops array to add event listeners
backdrops.forEach((backdrop, i) => {
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
