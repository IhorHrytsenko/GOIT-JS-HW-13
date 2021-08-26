const API_KEY = '23099415-b292849e49f5632c41c65f5ef';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const test_url = 'https://pixabay.com/api/?key=23099415-b292849e49f5632c41c65f5ef&q=yellow+flowers';

fetch(`${BASE_URL}&q=yellow+flowers`)
.then(response =>{return response.json()})
.then(data => console.log(data))
.catch(error => console.log(error));

