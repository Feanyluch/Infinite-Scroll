const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

// Unsplash API
const count = 30;
const APIKey = "r-ZzHz6OnqIJqU0kQcnIO4Xcps636gLnvXL6AqDsijk";
const query = 'puppy';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${APIKey}&count=${count}&query=${query}&orientation=squarish;`

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set Attributes on DOm Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //Eventlistener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        // Put <img> inside <a>, then put both inside imagecontainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray  = await response.json();
        displayPhotos();
    } catch (error) {
        // Catch Error here
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// ON Load
getPhotos();