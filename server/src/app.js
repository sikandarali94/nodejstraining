/* Node has a core module called Path that provides us a ton of great utilities for working with paths. This is done in
a cross OS compatible way. */
const path = require('path');
const express = require('express');

/* __dirname contains a path to the directory the current script lives in e.g. D:\Coding\Practice\NodeJS\server\src. */
console.log(__dirname);
/* __filename contains a path to the file itself e.g. D:\Coding\Practice\NodeJS\server\src\app.js. The join() method is
used to join all the path segments together. For example, if __dirname is 'server/src', then joining this path with
'../public' will give us 'server/public'. */
console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');

/* In general, the use() method is used to customise our server. In our case, we are going to customise the server to
serve out the folder where our index.html page lives. express.static() method takes the path to the folder we want to
serve up. We removed the app.get() method for the root URL because Express goes through our code for each URL until it
satisfies what it needs; because, the root URL ('') is satisfied by app.use(express.static(publicDirectoryPath));, we
do not need app.get('', ...); */
app.use(express.static(publicDirectoryPath));

/* The get() method lets us configure what the server should do when someone tries to get the resource at a specific
URL. The callback method is called with two very important arguments. The first is an object containing information
about the incoming request to the server (it is usually written as 'req'). The second argument is the response: this
contains a bunch of methods allowing us to customize what we're going to send back to the requester (it is usually
written as 'res'). '' refers to the root URL e.g. app.com. If we do not have a route set URL set up for our server and
someone visits a route, they get the default error: 'Cannot GET /about'. */

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Overcast",
    location: "Sydney"
  });
});

/* The listen method is used to start the server. It takes in a port which the server listens to, and a callback
function (optional) which runs when the server is spun up. Spinning up the server is an asynchronous process. */
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});