/* The fetch() method is a JS method used to fetch a resource. */
fetch('http://localhost:3000/weather?address=Boston').then(response => {
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