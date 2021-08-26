import debounsed from 'lodash.debounce';
import cards from "./templates/card.hbs";


const API_KEY = '23099415-b292849e49f5632c41c65f5ef';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

// const test_url = 'https://pixabay.com/api/?key=23099415-b292849e49f5632c41c65f5ef&q=yellow+flowers';
const input_text = document.querySelector("#search_img");
const gallery = document.querySelector(".gallery");

let pageNumber = 1;

function fetchFind (event) {
    
event.preventDefault();

pageNumber = 1;

fetch(`${BASE_URL}&q=${input_text.value}&page=${pageNumber}&per_page=5`)
.then(response =>{return response.json()})
.then(data => {data.hits.map(elem => createGallery(elem));console.log(data);})
.catch(error => console.log(error));

}


const createGallery = (elem) => {
    gallery.insertAdjacentHTML("afterbegin", cards(elem));
};


input_text.addEventListener ("input", debounsed(fetchFind, 500));
