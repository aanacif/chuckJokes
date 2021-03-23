document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  // get user input
  const number = document.getElementById('number').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  // create new request object
  const api = new XMLHttpRequest();
  // send request  
  if (number > 0) {
    if (firstName && lastName) {
      api.open('GET', `http://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`, true);
    } else {
      api.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);
    }
  } else {
    alert('Number must be greather than 0');
  }
  // handle request  
  api.onload = function () {
    // checking if response is successful (200)
    if (api.status === 200) {
      // turn raw data into object using JSON.parse
      const result = JSON.parse(this.responseText);
      let jokeList = '';
      if (result.type == 'success') {
        result.value.forEach(function (joke) {
          jokeList += `<li>${joke.joke}</li>`;
        });
      } else {
        jokeList += '<li>Error: Chuck too str0nk</li>';
      }
      document.querySelector('.jokeList').innerHTML = jokeList;
    }
  }
  api.send();
  e.preventDefault();
}

// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)