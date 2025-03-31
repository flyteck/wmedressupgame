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

    // Function to handle dragging and repositioning of items on the stage
    function makeItemDraggable(item) {
        let offsetX = 0;
        let offsetY = 0;

        item.addEventListener('dragstart', (e) => {
            // Get the initial offset when the drag starts
            offsetX = e.clientX - item.getBoundingClientRect().left;
            offsetY = e.clientY - item.getBoundingClientRect().top();
            item.style.zIndex = 1000; // Bring item to front while dragging
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();

            // Reposition the item while it's being dragged
            item.style.position = 'absolute';
            item.style.left = `${e.clientX - offsetX}px`;
            item.style.top = `${e.clientY - offsetY}px`;
        });

        item.addEventListener('dragend', () => {
            item.style.zIndex = ''; // Reset z-index after drag
        });
    }
});
