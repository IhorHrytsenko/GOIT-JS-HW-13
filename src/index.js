import cards from "./templates/card.hbs";
import * as basicLightbox from 'basiclightbox';
import { alert, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';


const API_KEY = '23099415-b292849e49f5632c41c65f5ef';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;
const input_text = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMore = document.querySelector("#load-more");
let pageNumber = 1;
let queryText = '';


const createGallery = (elem) => {
    gallery.insertAdjacentHTML("beforeend", cards(elem));
    loadMore.classList.replace("load-more-hide", "load-more-visible");
    loadMore.scrollIntoView({ behavior: 'smooth', block: 'end', });
};

const clearGallery = () => {
    gallery.innerHTML = "";
    loadMore.classList.replace("load-more-visible", "load-more-hide");
}

const bigImg = (event) => {

    if (event.target.nodeName === "IMG"){
        const bigImage = basicLightbox.create(`<img src="${event.target.alt}">`);
        bigImage.show();
    }
    else {
        return;
    }
}

const fetchFind = (event) => { 
        event.preventDefault();
         
        if (event.target.querySelector("input")){
            clearGallery();
            queryText = event.target.querySelector("input").value;
        }

        if (event.target.id === "load-more"){
            pageNumber++;
        }

        fetch(`${BASE_URL}&q=${queryText}&page=${pageNumber}&per_page=5`)
        .then(response =>{return response.json()})
        .then(data => {
            if (data.hits.length === 0){
                defaultModules.set(PNotifyMobile, {});
                alert({
                    text: 'К сожалению, ничего не удалось найти',
                    delay: 1500,
                });
            }
            data.hits.map(elem => createGallery(elem))
        })
        .catch(error => console.log(error));
}

input_text.addEventListener("submit", fetchFind);

loadMore.addEventListener("click", fetchFind);

gallery.addEventListener("click", bigImg);

