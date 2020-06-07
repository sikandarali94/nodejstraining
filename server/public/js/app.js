/* We are running nodemon because it is a global module, however, we should have nodemon as a local dependency because
when we ship the app online or to another developer they will encounter an error when running the application. That is
why we should avoid global modules and instead include them as local dependencies (so they are able to install it using
npm install). In other words, in our case, we should uninstall nodemon globally and instead install in locally. However,
we will have to write a package.json npm script to get nodemon to run from a local dependency, because if we wrote
nodemon in the command terminal, the terminal will not recognise the nodemon command. Therefore write a script like
this: ["dev": "nodemon src/app.js -e js,hbs"] and then in the terminal write: npm run dev. */
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From JavaScript';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Fetching...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(({ error, forecast, location } = {}) => {
      if (error) {
        return messageOne.textContent = error;
      }

      messageOne.textContent = `Location: ${location}`;
      messageTwo.textContent = `Forecast: ${forecast}`;
    })
  });
});