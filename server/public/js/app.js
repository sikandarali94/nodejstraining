const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    /* The json() method of the Body mixin takes a Response stream and reads it to completion. It returns a promise that
    resolves with the result of parsing the body text as JSON and returning it as a JS object. */
    response.json().then(({ error, forecast, location } = {}) => {
      if (error) {
        return console.log(error);
      }
      console.log('Location:', location);
      console.log('Forecast:', forecast);
    })
  });
});