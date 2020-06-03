const express = require('express');

const app = express();

/* The get() method lets us configure what the server should do when someone tries to get the resource at a specific
URL. The callback method is called with two very important arguments. The first is an object containing information
about the incoming request to the server (it is usually written as 'req'). The second argument is the response: this
contains a bunch of methods allowing us to customize what we're going to send back to the requester (it is usually
written as 'res'). '' refers to the root URL e.g. app.com. If we do not have a route set URL set up for our server and
someone visits a route, they get the default error: 'Cannot GET /about'. */
app.get('', (req, res) => {
  /* send() method allows us to send something back to the requester. */
  res.send('Hello express!');
});

app.get('/help', (req, res) => {
  res.send('Help page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/weather', (req, res) => {
  res.send('Weather page');
});

/* The listen method is used to start the server. It takes in a port which the server listens to, and a callback
function (optional) which runs when the server is spun up. Spinning up the server is an asynchronous process. */
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});