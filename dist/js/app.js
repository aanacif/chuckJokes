import { Backend } from './backend.js'
import { startLoader, stopLoader } from './helpers.js'

const API = new Backend
API.setBaseUrl('https://api.icndb.com')
const form = document.querySelector('#pickNumber')
const jokeList = document.querySelector('#jokeList')
const entry = document.querySelector('#number')
const button = document.querySelector('#get-jokes')


form.addEventListener('submit', (event) => {
    event.preventDefault()
    startLoader(button)
    API.get(`/jokes/random/${entry.value}`).then(data => {
        let generateList = ''
        data.value.forEach(element => {
            generateList += `<li>${element.joke}</li>`
        });
        jokeList.innerHTML = generateList
    })
        .finally(() => {
            stopLoader(button, "GENERATE");
        })
})

































// document.querySelector('.get-jokes').addEventListener('click', getJokes);

// function catClean(checkboxElem) {
//   const nerdy = document.getElementById('nerdy').checked;
//   const explicit = document.getElementById('explicit').checked;
//   if (nerdy || explicit) {
//     document.getElementById('firstName').disabled = true;
//     document.getElementById('lastName').disabled = true;
//   }
//   if (!nerdy && !explicit) {
//     document.getElementById('firstName').disabled = false;
//     document.getElementById('lastName').disabled = false;
//   }
// }

// function getJokes(e) {
//   // get user input
//   const number = document.getElementById('number').value;
//   const firstName = document.getElementById('firstName').value;
//   const lastName = document.getElementById('lastName').value;
//   // create new request object
//   const api = new XMLHttpRequest();
//   // send request  
//   if (number > 0) {
//     if (firstName && lastName) {
//       api.open('GET', `http://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`, true);
//     }
//     else {
//       api.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
//     }
//   } else {
//     alert('Number must be greather than 0');
//   }
//   // handle request  
//   api.onload = function () {
//     // checking if response is successful (200)
//     if (api.status === 200) {
//       // turn raw data into object using JSON.parse
//       const result = JSON.parse(this.responseText);
//       let jokeList = '';
//       if (result.type == 'success') {
//         result.value.forEach(function (joke) {
//           jokeList += `<li>${joke.joke}</li>`;
//         });
//       } else {
//         jokeList += '<li>Error: Chuck too str0nk</li>';
//       }
//       document.querySelector('.jokeList').innerHTML = jokeList;
//     }
//   }
//   api.send();
//   e.preventDefault();
// }

// // Informational responses (100–199)
// // Successful responses (200–299)
// // Redirects (300–399)
// // Client errors (400–499)
// // Server errors (500–599)
