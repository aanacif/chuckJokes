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
    if (entry.value > 0) {
        startLoader(button)
        let cats = document.querySelectorAll('input[type=checkbox]:checked')

        if (cats.length > 0) {
            let catArray = []
            cats.forEach(item => {
                catArray.push(item.name)
            })
            API.get(`/jokes/random/${entry.value}?limitTo=${catArray}`).then(data => {
                let generateList = ''
                data.value.forEach(element => {
                    generateList += `<li>${element.joke}</li>`
                });
                jokeList.innerHTML = generateList
            })
                .finally(() => {
                    stopLoader(button, "GENERATE");
                })
            return
        }

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
    }
})

// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)
