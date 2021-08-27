import cards from "./templates/card.hbs";
import * as basicLightbox from './node_modules/basiclightbox';


const API_KEY = '23099415-b292849e49f5632c41c65f5ef';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
const input_text = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector("#load-more");
let pageNumber = 1;
const bigImage = basicLightbox.create();


const createGallery = (elem) => {
    gallery.insertAdjacentHTML("beforeend", cards(elem));
    loadMore.classList.replace("load-more-hide", "load-more-visible");
    loadMore.scrollIntoView({ behavior: 'smooth', block: 'end', });
};

const clearGallery = () => {
    gallery.innerHTML = "";
    loadMore.classList.replace("load-more-visible", "load-more-hide");
}

const fetchFind = (event) => {       
        event.preventDefault();
        let query = ''; 

        if (event.target.querySelector("input")){
            clearGallery();
            query = event.target.querySelector("input").value;
        }
        if (event.target.id === "load-more"){
            pageNumber++;
        }

        fetch(`${BASE_URL}&q=${query}&page=${pageNumber}&per_page=5`)
        .then(response =>{return response.json()})
        .then(data => {data.hits.map(elem => createGallery(elem))})
        .catch(error => console.log(error));
        
}

const imageViewer = (event) =>{

    console.log(event);
}


input_text.addEventListener("submit", fetchFind);

loadMore.addEventListener("click", fetchFind);


