const imageContainer = document.getElementById('image-container');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 30;

const apiKey = 'ovNxaBCDOse7djSEFMXYZwrJRqHnaXg3V89-SLCXqdY';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
       
    }

}

 function setAttributes (element,attributs){
    for (const key in attributs){
        element.setAttribute(key,attributs[key])
    }
}




function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target:' _blank'
        })
        //creat<image> for photo
        const img = document.createElement('img');
        //img.setAttribute('src', photo.url.regular);
        //img.setAttribute('alt', photo.alt_description);
        //img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });

        img.addEventListener('load',imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error)
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
