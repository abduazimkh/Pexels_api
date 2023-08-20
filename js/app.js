// bfXecNA0d7CUWCJLUYcKO1A39ucPOmr67v4EoAvl27n8hL9d5TEjXYJd
const auth = "bfXecNA0d7CUWCJLUYcKO1A39ucPOmr67v4EoAvl27n8hL9d5TEjXYJd";

// Selectors

const galery = document.querySelector(".galery");
const form = document.querySelector(".searc");
const searcInp = document.querySelector(".searc__inp");
const more = document.querySelector(".more")
let fetchLink;
let searchValue;
let page = 1;
let cSearc;

// Event listeners

searcInp.addEventListener("input", updateInp);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    cSearc = searchValue;
    searchPhotos(searchValue);

});
more.addEventListener('click', loadMore);

// Updater Input

function updateInp(e){
    searchValue = e.target.value;
}


// Fetch Api

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });
    const data = await dataFetch.json();
    return data;
}

// Generate Photos

function generatePictures(data){
    // console.log(data.photos)
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("galery-img");
        galleryImg.innerHTML = `
            <div class="galery-info">
                <p>${photo.photographer}</p>
                <a href="${photo.src.large}" target="_blank">Download</a>
            </div>
            <img src="${photo.src.large}"></img>
        `;
        galery.appendChild(galleryImg);
    });
}

// Created Photos

async function curatedPhotos(){
    fetchLink =  "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);

}

curatedPhotos();

// Clear

function clear(){
    galery.innerHTML = "";
    searcInp.innerHTML = "";
}


// Search Photos

async function searchPhotos(q){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${q}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);

}

// Load More

async function loadMore(){
    page++;
    if(cSearc){
        fetchLink = `https://api.pexels.com/v1/search?query=${cSearc}&per_page=15&page=${page}`;
    }else{
        fetchLink =  `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}