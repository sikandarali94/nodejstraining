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