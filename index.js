// ----- VARIABLES -----
const scrollRight = document.querySelector('.slideshow-container__right');
const scrollLeft = document.querySelector('.slideshow-container__left');
const imageContainer = document.querySelector('.slideshow-container__image');
const selectors = Array.from(document.querySelectorAll('.slideshow-selector')); 
const images = Array.from(document.querySelectorAll('.slideshow-container__image'))
let currentImageNumber = 1;

// ----- FUNCTIONS -----

// Update slideshow selectors
function updateSelected() {
    selectors.forEach(selector => selector.style["background-color"] = 'white')

    let toSelect = currentImageNumber -1;
    selectors[toSelect].style["background-color"] = '#ccc';
}

function timedScroll() {
    setTimeout(() => {
        console.log(currentImageNumber);
        let currentImage = images[currentImageNumber - 1];
        let nextImage = images[currentImageNumber];
        let currentSelector = selectors[currentImageNumber - 1];
        let nextSelector = selectors[currentImageNumber];

        if (currentImageNumber == 5) {
            nextImage = images[0];
            nextSelector = selectors[0]
            currentImageNumber = 0;
        }
        
        currentImage.style.flex = '0';
        nextImage.style.flex = '6';
        currentSelector.style["background-color"] = "white";
        nextSelector.style["background-color"] = "#ccc";

        currentImageNumber++;     

        timedScroll();
    }, 10000);
}

// ----- EVENT LISTENERS -----
scrollRight.addEventListener('click', () => {
    const currentImage = document.querySelector(`.image--${currentImageNumber}`);
    currentImage.style.flex = '0';

    currentImageNumber++;
    if (currentImageNumber == 6) { currentImageNumber = 1 }

    const nextImage = document.querySelector(`.image--${currentImageNumber}`);
    nextImage.style.flex = '6';

    updateSelected();
})

scrollLeft.addEventListener('click', () => {
    const currentImage = document.querySelector(`.image--${currentImageNumber}`);
    currentImage.style.flex = '0';

    currentImageNumber--;
    if (currentImageNumber == 0) { currentImageNumber = 5 }

    const nextImage = document.querySelector(`.image--${currentImageNumber}`);
    nextImage.style.flex = '6';

    updateSelected();
})

selectors.forEach(selector => selector.addEventListener('click', () => {
    const currentlySelectedimage = document.querySelector(`.image--${currentImageNumber}`);
    const imageSelected = images[selectors.indexOf(selector)];

    currentlySelectedimage.style.flex = '0';
    imageSelected.style.flex = '6';

    selectors[currentImageNumber - 1].style["background-color"] = 'white';
    selector.style["background-color"] = '#ccc';

    currentImageNumber = selectors.indexOf(selector) + 1; 
}));

// ----- INITIALISE -----
updateSelected();

timedScroll();  